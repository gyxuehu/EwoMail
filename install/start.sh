# +----------------------------------------------------------------------
# | EwoMail
# +----------------------------------------------------------------------
# | Copyright (c) 2016 http://ewomail.com All rights reserved.
# +----------------------------------------------------------------------
# | Licensed ( http://ewomail.com/license.html)
# +----------------------------------------------------------------------
# | Author: Jun <gyxuehu@163.com>
# +----------------------------------------------------------------------
#!/bin/bash
cur_dir=`pwd`
domain=$1
en=$2
#set -o pipefail
#stty erase ^h

# check root
if [ "$(id -u)" != "0" ]; then
    echo
    echo -e "Error: \033[31mPlease login root user to exec the install script.\033[0m" 1>&2
    echo
    exit 0;
else
    # Disable SELinux Permanently
	sed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config
    setenforce 0
fi

centosV=`cat /etc/redhat-release|sed -r 's/.* ([0-9]+)\..*/\1/'`

if [ $centosV != 7 ] ; then 
    if [ $centosV != 8 ] ; then 
        echo "unsigned version"
        exit
    fi
fi


if [ -f "/usr/lib/systemd/system/mysqld.service" ]; then
    echo "mysql installed, installation failed"
    exit
fi

if [ -f "/etc/rc.d/init.d/mysqld" ]; then
    echo "mysql installed, installation failed"
    exit
fi


postfix3_install(){
    pushd $cur_dir/soft/
    tar zxvf ewomail-npm-1.09-1-el7.tar.gz
    yum install -y \
        ./postfix3-3.6.1-5.el7.x86_64.rpm \
        ./postfix3-ldap-3.6.1-5.el7.x86_64.rpm \
        ./postfix3-mysql-3.6.1-5.el7.x86_64.rpm
    popd
}


dovecot_install(){
    if [ $centosV = 7 ] ; then 
        cd $cur_dir/soft/
        yum -y install \
            ./dovecot-2.3.15-2.el7.x86_64.rpm \
            ./dovecot-devel-2.3.15-2.el7.x86_64.rpm \
            ./dovecot-lua-2.3.15-2.el7.x86_64.rpm \
            ./dovecot-mysql-2.3.15-2.el7.x86_64.rpm \
            ./dovecot-pgsql-2.3.15-2.el7.x86_64.rpm \
            ./dovecot-pigeonhole-2.3.15-2.el7.x86_64.rpm
    else
        rpm -ivh $cur_dir/soft/dovecot-2.3.11.3-el8.x86_64.rpm
    fi
    
    if ! rpm -qa | grep dovecot > /dev/null;then
        echo "dovecot Installation failed"
        exit 1
    fi
}



amavis_install(){
    yum -y install amavisd-new clamav-server clamav-server-systemd
    
    if ! rpm -qa | grep amavis > /dev/null;then
        echo "amavisd Installation failed"
        exit 1
    fi
    
}

down_rpm(){
    if [ $centosV = 8 ] ; then
        cd $cur_dir/soft
        md5file="1aa30322e0fe8340655bdf7bbd1506b1"
        filename="ewomail-npm-1.09-el8.tar.gz"

        if [ "$en" != "en" ];then
            wget -c -t 20 -T 180 http://npm.ewomail.com/$filename
        else
            wget -c -t 20 -T 180 http://download.ewomail.org:8282/$filename
        fi

        if [ ! -f $filename ]; then
            echo "${filename} download failed";
            exit
        fi

        testmd5=`md5sum $filename|cut -d ' ' -f1`
        if [ $testmd5 != $md5file ];then
            echo "${filename} md5 verification failed";
            echo "Delete the ${cur_dir}/soft/${filename} file and reinstall EwoMail"
            echo "rm ${cur_dir}/soft/${filename}"
            exit
        fi

        tar xzvf $filename
        cd $cur_dir
    fi
}

config_file(){
    
    mv /etc/my.cnf /etc/my.cnf.backup
    ln -s /ewomail/mysql/etc/my.cnf /etc
    if [ $centosV = 8 ];then
        cp -rf $cur_dir/soft/dovecot.service /usr/lib/systemd/system
    fi
    
    cp -rf $cur_dir/config/dovecot /etc
    cp -rf $cur_dir/config/postfix /etc
    
    mkdir -p /etc/ssl/certs
    mkdir -p /etc/ssl/private
    
    cp -rf $cur_dir/config/nginx/* /ewomail/nginx/conf/
    cp -rf $cur_dir/soft/nginx.service /usr/lib/systemd/system
    
    cp -rf $cur_dir/soft/php-fpm.conf /ewomail/php72/etc
    cp -rf $cur_dir/soft/php.ini /ewomail/php72/etc
    cp -rf $cur_dir/soft/php-cli.ini /ewomail/php72/etc
    cp -rf $cur_dir/soft/php-fpm.service /usr/lib/systemd/system
    
    cp -rf $cur_dir/config/fail2ban/jail.local /etc/fail2ban
    cp -rf $cur_dir/config/fail2ban/postfix.ewomail.conf /etc/fail2ban/filter.d
    cp -rf $cur_dir/config/fail2ban/postfix.ewomail.user.conf /etc/fail2ban/filter.d
    
    if [ $centosV = 8 ];then
        cp -rf $cur_dir/soft/dovecot-openssl.cnf /usr/local/dovecot/share/doc/dovecot/dovecot-openssl.cnf
        cd /usr/local/dovecot/share/doc/dovecot
        sed -i "s/ewomail.cn/$domain/g" dovecot-openssl.cnf
        sh mkcert.sh
    else
        cat > /etc/dovecot/dovecot-openssl.cnf <<EOF
[ req ]
default_bits = 4096
encrypt_key = yes
distinguished_name = req_dn
x509_extensions = cert_type
prompt = no

[ req_dn ]
# country (2 letter code)
#C=FI

# State or Province Name (full name)
#ST=

# Locality Name (eg. city)
#L=Helsinki

# Organization (eg. company)
#O=Dovecot

# Organizational Unit Name (eg. section)
OU=IMAP server

# Common Name (*.example.com is also possible)
CN=*.$domain

# E-mail contact
emailAddress=admin$domain

[ cert_type ]
nsCertType = server

EOF
        CERTFILE=/etc/ssl/certs/dovecot.pem
        KEYFILE=/etc/ssl/private/dovecot.pem
        OPENSSLCONFIG=/etc/dovecot/dovecot-openssl.cnf
        openssl req -new -x509 -nodes -config $OPENSSLCONFIG -out $CERTFILE -keyout $KEYFILE -days 365
        chmod 0600 $KEYFILE
        openssl x509 -subject -fingerprint -noout -in $CERTFILE
    fi
}

epel_replace()
{
    sed -e 's!^metalink=!#metalink=!g' \
    -e 's!^#baseurl=!baseurl=!g' \
    -e 's!//download\.fedoraproject\.org/pub!//mirrors.bfsu.edu.cn!g' \
    -e 's!http://mirrors\.bfsu!https://mirrors.bfsu!g' \
    -i /etc/yum.repos.d/epel.repo /etc/yum.repos.d/epel-testing.repo
    yum clean packages
}

init(){
    if [ -z $domain ];then
        echo "Missing domain parameter"
        exit 1
    fi
    
    if rpm -qa | grep dovecot > /dev/null;then
        echo "installation failed,dovecot is installed"
        exit 1
    fi
    
    yum remove -y sendmail
    yum install -y epel-release
    
    if ! rpm -qa | grep epel-release > /dev/null;then
        echo "epel-release Installation failed"
        exit 1
    fi
    
    if [ "$en" != "en" ] ; then 
        epel_replace
    fi
    
    if [ $centosV = 8 ] ; then 
        dnf config-manager --set-enabled powertools
        if [ $? -ne 0 ]; then
            dnf config-manager --set-enabled PowerTools
        fi
        yum -y install postfix postfix-mysql mariadb-devel
        
    fi
    
    if [ $centosV = 7 ];then
        yum -y remove postfix
        yum install -y openssl11-libs
        postfix3_install
        yum -y install pypolicyd-spf perl-DBI oniguruma-devel libtool-ltdl freetype libpng libjpeg fail2ban unzip wget nscd
    else
        yum -y install postfix pypolicyd-spf perl-DBI oniguruma-devel libtool-ltdl freetype libpng libjpeg fail2ban unzip wget nscd
    fi
    amavis_install
    down_rpm
    
    if [ $centosV = 7 ] ; then 
        if [ -d "/ewomail" ];then # If the folder exists, move to ewomail.bak
            mv /ewomail /ewomail.bak
        fi
        rpm -ivh $cur_dir/soft/ewomail-lnmp-1.6-1.el7.x86_64.rpm
    else
        rpm -ivh $cur_dir/soft/ewomail-lnmp-1.6-el8.x86_64.rpm
    fi
    
    if ! rpm -qa | grep ewomail > /dev/null;then
        echo "ewomail-lnmp Installation failed"
        exit 1
    fi
    
    dovecot_install
    
    mkdir -p /ewomail/www/default
    cp -rf $cur_dir/../ewomail-admin /ewomail/www/
    cp -rf $cur_dir/../rainloop /ewomail/www/
    
    cd /ewomail/www
    unzip -o $cur_dir/soft/phpMyAdmin-5.0.2-all-languages.zip
    ln -s /ewomail/www/phpMyAdmin-5.0.2-all-languages /ewomail/www/phpMyAdmin
    cd $cur_dir
    
    
    config_file
    
    
    groupadd -g 5000 vmail
    useradd -M -u 5000 -g vmail -s /sbin/nologin vmail
    
    cp -rf $cur_dir/config/mail /ewomail
    
    chown -R vmail:vmail /ewomail/mail
    chmod -R 700 /ewomail/mail
    
    chmod -R 770 /ewomail/www
    mkdir -p /ewomail/www/session/ewomail-admin
    mkdir -p /ewomail/www/session/webmail
    mkdir -p /ewomail/www/session/phpmyadmin
    chown -R www:www /ewomail/www
    
    
    mkdir -p /ewomail/dkim
    chown -R amavis:amavis /ewomail/dkim
    amavisd genrsa /ewomail/dkim/mail.pem
    chown -R amavis:amavis /ewomail/dkim
    
    service mysqld start
    
    cd $cur_dir
    chmod -R 700 ./init.php
    ./init.php $domain > init_php.log
    
    chmod -R 440 /ewomail/config.ini
    
    systemctl start firewalld
    firewall-cmd --zone=public --add-port=8000/tcp --permanent 
    firewall-cmd --zone=public --add-port=8010/tcp --permanent 
    firewall-cmd --zone=public --add-port=8020/tcp --permanent 
    firewall-cmd --zone=public --add-port=993/tcp --permanent 
    firewall-cmd --zone=public --add-port=995/tcp --permanent 
    firewall-cmd --zone=public --add-port=587/tcp --permanent 
    firewall-cmd --zone=public --add-port=465/tcp --permanent 
    firewall-cmd --zone=public --add-port=143/tcp --permanent 
    firewall-cmd --zone=public --add-port=110/tcp --permanent 
    firewall-cmd --zone=public --add-port=25/tcp --permanent 
    firewall-cmd --zone=public --add-port=22/tcp --permanent
    firewall-cmd --zone=public --add-port=80/tcp --permanent 
    firewall-cmd --zone=public --add-port=443/tcp --permanent 
    firewall-cmd --reload
    
    systemctl daemon-reload
    systemctl enable postfix dovecot amavisd spamassassin fail2ban php-fpm nginx mysqld firewalld nscd
    
    systemctl restart mysqld php-fpm nginx postfix dovecot fail2ban spamassassin nscd
    
    if [ $centosV = 7 ] ; then 
        freshclam
    fi
    
    systemctl restart amavisd
        
    
    echo "Complete installation"
}

init

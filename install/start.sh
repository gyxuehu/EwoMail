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
setenforce 0

centosV=`cat /etc/redhat-release|sed -r 's/.* ([0-9]+)\..*/\1/'`

if [ $centosV != 7 ] ; then 
    if [ $centosV != 8 ] ; then 
        echo "unsigned version"
        exit
    fi
fi


dovecot_install(){
    if [ $centosV = 7 ] ; then 
        rpm -ivh $cur_dir/soft/dovecot-2.3.11.3-el7.x86_64.rpm
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
    cd $cur_dir/soft
    filename=""
    md5file=""
    if [ $centosV = 7 ] ; then 
        md5file="ebd320c8ca86a3b8c4430e350d14cff8"
        filename="ewomail-npm-1.09-el7.tar.gz"
    else
        md5file="1aa30322e0fe8340655bdf7bbd1506b1"
        filename="ewomail-npm-1.09-el8.tar.gz"
    fi
    
    if [ "$en" != "en" ] ; then 
        wget -c -t 20 -T 180 http://npm.ewomail.com/$filename
    else
        wget -c -t 20 -T 180 http://download.ewomail.org:8282/$filename
    fi
    
    if [ ! -f $filename ]; then
        echo "${filename} download failed";
        exit
    fi
    
    testmd5=`md5sum $filename|cut -d ' ' -f1`
    if [ $testmd5 != $md5file ] ; then 
        echo "${filename} md5 verification failed";
        echo "Delete the ${cur_dir}/soft/${filename} file and reinstall EwoMail"
        echo "rm ${cur_dir}/soft/${filename}"
        exit
    fi
    
    tar xzvf $filename
    cd $cur_dir
}

config_file(){
    
    mv /etc/my.cnf /etc/my.cnf.backup
    ln -s /ewomail/mysql/etc/my.cnf /etc
    cp -rf $cur_dir/soft/dovecot.service /usr/lib/systemd/system
    
    
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
    
    
    cp -rf $cur_dir/soft/dovecot-openssl.cnf /usr/local/dovecot/share/doc/dovecot/dovecot-openssl.cnf
    cd /usr/local/dovecot/share/doc/dovecot
    sed -i "s/ewomail.cn/$domain/g" dovecot-openssl.cnf
    sh mkcert.sh
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
    
    yum remove sendmail
    yum install epel-release
    
    if ! rpm -qa | grep epel-release > /dev/null;then
        echo "epel-release Installation failed"
        exit 1
    fi
    
    if [ "$en" != "en" ] ; then 
        epel_replace
    fi
    
    if [ $centosV = 8 ] ; then 
        dnf config-manager --set-enabled PowerTools
        yum -y install postfix postfix-mysql mariadb-devel
        
    fi
    
    yum -y install postfix pypolicyd-spf perl-DBI oniguruma-devel libtool-ltdl freetype libpng libjpeg fail2ban unzip wget nscd
    amavis_install
    down_rpm
    
    if [ $centosV = 7 ] ; then 
        rpm -ivh $cur_dir/soft/ewomail-lnmp-1.6-el7.x86_64.rpm
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

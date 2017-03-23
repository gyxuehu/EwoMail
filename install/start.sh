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
set -o pipefail
stty erase ^h
setenforce 0

dovecot_install(){
    rpm -ivh $cur_dir/soft/dovecot-2.2.24-el6.x86_64.rpm
}

spf_install(){
    cp -f $cur_dir/soft/postfix-policyd-spf-perl /usr/libexec/postfix/
    chmod -R 755 /usr/libexec/postfix/postfix-policyd-spf-perl
}

amavis_install(){
    yum install -y amavisd-new
    chmod -R 770 /var/spool/amavisd/tmp
    usermod -G amavis clam
}

epel_install(){
    cp -f $cur_dir/soft/epel-6.repo /etc/yum.repos.d/epel-6.repo
}

config_file(){
    cp -rf $cur_dir/config/dovecot /etc
    cp -rf $cur_dir/config/postfix /etc
    ln -s /etc/amavisd/amavisd.conf /etc
    mv /etc/clamd.conf /etc/clamd.conf.backup
    cp -rf /etc/clamd.d/amavisd.conf /etc/clamd.conf
    
    mv /etc/sysconfig/iptables /etc/sysconfig/iptables.backup
    cp -rf $cur_dir/soft/iptables /etc/sysconfig/iptables
    chmod -R 600 /etc/sysconfig/iptables
    
    mkdir -p /etc/ssl/certs
    mkdir -p /etc/ssl/private
    
    cp -rf $cur_dir/soft/httpd.init /etc/rc.d/init.d/httpd
    chmod -R 755 /etc/rc.d/init.d/httpd
    
    cp -rf $cur_dir/soft/php.ini /ewomail/php/etc
    cp -rf $cur_dir/soft/php-cli.ini /ewomail/php/etc
    
    cp -rf $cur_dir/soft/dovecot.init /etc/rc.d/init.d/dovecot
    chmod -R 755 /etc/rc.d/init.d/dovecot
    cd /usr/local/dovecot/share/doc/dovecot
    sh mkcert.sh
}

check_install(){
    if ! rpm -qa | grep ewomail > /dev/null;then
        echo "ewomail Installation failed"
        exit 1
    fi
    
    if ! rpm -qa | grep postfix > /dev/null;then
        echo "postfix Installation failed"
        exit 1
    fi
    
    if ! rpm -qa | grep dovecot > /dev/null;then
        echo "dovecot Installation failed"
        exit 1
    fi
    
    if ! rpm -qa | grep amavisd-new > /dev/null;then
        echo "amavisd Installation failed"
        exit 1
    fi
    
    if ! rpm -qa | grep clamav > /dev/null;then
        echo "clamav Installation failed"
        exit 1
    fi
    
    if ! rpm -qa | grep spamassassin > /dev/null;then
        echo "spamassassin Installation failed"
        exit 1
    fi
    
}


init(){
    if [ -z $domain ];then
        echo "Missing domain parameter"
        exit 1
    fi
    
    yum remove sendmail
    epel_install
    yum -y install postfix perl-DBI perl-JSON-XS perl-NetAddr-IP perl-Mail-SPF perl-Sys-Hostname-Long freetype* libpng* libjpeg* iptables
    rpm -ivh $cur_dir/soft/ewomail-lamp-1.0-el6.x86_64.rpm
    
    if [ $? != 0 ] ; then echo "ewomail-lamp install failed" >&2 ; exit 1 ; fi
    
    mkdir -p /ewomail/www/default
    cp -rf $cur_dir/../ewomail-admin /ewomail/www/
    cp -rf $cur_dir/../rainloop /ewomail/www/

    cd $cur_dir
    
    dovecot_install
    amavis_install
    spf_install
    config_file
    check_install
    
    groupadd -g 5000 vmail
    useradd -M -u 5000 -g vmail -s /sbin/nologin vmail
    
    cp -rf $cur_dir/config/mail/* /ewomail/mail/
    
    chown -R vmail:vmail /ewomail/mail
    chmod -R 700 /ewomail/mail
    
    chown -R www:www /ewomail/www
    chmod -R 770 /ewomail/www
    
    mkdir -p /ewomail/dkim
    chown -R amavis:amavis /ewomail/dkim
    amavisd genrsa /ewomail/dkim/mail.pem
    chown -R amavis:amavis /ewomail/dkim
    
    service mysqld start
    
    cd $cur_dir
    chmod -R 700 ./init.php
    ./init.php $domain > init_php.log
    
    chmod -R 440 /ewomail/config.ini
    
    rm -rf /ewomail/www/tz.php
    
    
    chkconfig mysqld on
    chkconfig clamd on
    chkconfig spamassassin on
    chkconfig amavisd on
    chkconfig postfix on
    chkconfig dovecot on
    chkconfig httpd on
    
    service iptables restart
    service clamd start
    service spamassassin start
    service amavisd start
    service dovecot start
    service httpd start
    service postfix restart
    
    echo "Complete installation"
}

init

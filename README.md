### 1.05更新内容 


1、兼容centos7

    将部分主要的组件重新打包，测试，并且兼容centos6和centos7。

2、新加nginx

    默认绑定80端口，需手动启动。

3、新加php-fpm

    可以利用nginx配置php-fpm或apache，php-fpm默认端口9000，需手动启动。

4、apache
    
    取消apache绑定的80端口，邮箱管理后台与webmail保留端口，保持原来的apache运行。

### EwoMail开源邮件服务器软件  


EwoMail是基于Linux的开源邮件服务器软件，集成了众多优秀稳定的组件，是一个快速部署、简单高效、多语言、安全稳定的邮件解决方案，帮助你提升运维效率，降低 IT 成本，兼容主流的邮件客户端，同时支持电脑和手机邮件客户端。

### 集成组件


Postfix：邮件服务器

Dovecot：IMAP/POP3/邮件存储

Amavisd：反垃圾和反病毒

fail2ban：监控策略

LNAMP：apache2.2，nginx1.8，mysql5.5，php5.4

EwoMail-Admin：WEB邮箱管理后台

Rainloop：webmail

### 安装环境

centos6/7系统，服务器需要干净环境，最好是全新安装的系统。

最低配置要求

CPU：1核

内存：1G

硬盘：40G

### 检查swap

安装前需要swap缓存，请务必先检查swap是否已经启动。

### 手动安装

下载并重新命名为ewomail.zip


```
解压安装
unzip -o ewomail.zip
cd EwoMail/install
#需要输入一个邮箱域名，不需要前缀，列如下面的ewomail.cn
sh ./start.sh ewomail.cn
```

### 文档教程

在线安装、配置等等的更多详细教程请查看

[EwoMail在线文档](http://doc.ewomail.com/ewomail)

### EwoMail-Admin

EwoMail-Admin是一个多语言邮箱管理后台，用PHP语言开发，开源免费。

自主原生开发，没有采用第三方框架，简单高效、易二次开发。

需要搭配EwoMail邮件服务器软件使用。

环境要求：PHP5.4+，MYSQL5.5+

EwoMail-Admin集成了前端框架、后台敏捷开发框架，利用这些框架可以很容易的进行二次开发，定制化功能来满足你的邮件服务器更多需求。

 **主要功能** 

1、权限管理（管理员权限分配）
2、邮箱管理
3、邮箱域名管理
4、多语言

[EwoMail-Admin开发教程](http://doc.ewomail.com/ewomail-admin)

![ewomail-admin](https://box.kancloud.cn/c362878ba731559b09eae36b7236bde5_1366x609.png "ewomail-admin")

### webmail

![webmail](https://box.kancloud.cn/3de1da2809f14048fb4cb3b32d0408d1_1183x476.png "webmail")

官方群：458861632
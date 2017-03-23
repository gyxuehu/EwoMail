### EwoMail开源邮件服务器软件  


EwoMail是基于Linux的开源邮件服务器软件，集成了众多优秀稳定的组件，是一个快速部署、简单高效、多语言、安全稳定的邮件解决方案，帮助你提升运维效率，降低 IT 成本，兼容主流的邮件客户端，同时支持电脑和手机邮件客户端。

### 集成组件


Postfix：邮件服务器

Dovecot：IMAP/POP3/邮件存储

Amavisd：反垃圾和反病毒

LAMP：apache2.2，mysql5.5，php5.4

EwoMail-Admin：WEB邮箱管理后台

Rainloop：webmail

### 安装环境

centos6系列，需要服务器的全新软环境。

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

![ewomail-admin](https://git.kancloud.cn/repos/ewomail/development/raw/master/image/screenshot_1489929530658.png?access-token=cc8ae4f653eccac798c91fe4fab1ef7a "ewomail-admin")

### webmail

![webmail](https://git.kancloud.cn/repos/gyxuehu/ewomail/raw/master/image/screenshot_1489239369209.png?access-token=099401ed7b3834be2f279e1972038ca9 "webmail")

官方群：458861632
<?php
//配置文件
return [
    'dbhost' => 'localhost',//数据库连接地址
    'dbuser' => 'ewomail',//数据库账号
    'dbpw' => 'ewomail',//数据库密码
    'dbname' => 'ewomail',//数据库名称
    'dbcharset' => 'utf8',//数据库编码
    'dbprefix'=> 'i_',//数据库表的前缀
    'code_key'=>'',//加密钥匙
    'url'=>'',//网站链接，后面不要加/线
    'webmail_url'=>'',//邮件系统链接，后面不要加/线
    'maildir'=>'/ewomail/mail',//邮件存放目录，邮件安装后请不要修改
    'home_default' =>'Center',//默认项目
    'home_allow' => ['Center','Api'],//允许项目
    'module_default' =>'Index',//默认模块
    'action_default' =>'index',//默认控制器
    'prefix'=>'ewomail_',//网站通用前缀，包括session,cookie
    
];

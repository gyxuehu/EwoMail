<?php
// +----------------------------------------------------------------------
// | EwoMail
// +----------------------------------------------------------------------
// | Copyright (c) 2016 http://ewomail.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://ewomail.com/license.html)
// +----------------------------------------------------------------------
// | Author: Jun <gyxuehu@163.com>
// +----------------------------------------------------------------------
/**
 * 系统设置
 */
if(!defined("PATH")) exit;

Rout::get('index',function(){
    Admin::setMenu(0,L(3053));
    $os = explode(" ", php_uname());
    //mysql版本
    $mysql_version = App::$db->getOne("select VERSION()");
    $domain_count = App::$db->count("select count(*) from ".table("domains"));
    $users_count = App::$db->count("select count(*) from ".table("users"));
    $bytes_count = App::$db->count("select sum(bytes) from ".table("quota"));
    $bytes_count = byteFormat($bytes_count,'GB');

    $default_password = false;
    if(Admin::$info['username']=='admin' && Admin::$info['password']==md5('ewomail123')){
        $default_password = true;
    }
    

    $arr = [
        'php'=>PHP_VERSION,
        'web'=>$_SERVER['SERVER_SOFTWARE'],
        'ip'=>$_SERVER['SERVER_ADDR'],
        'upload_max_filesize'=>get_cfg_var('upload_max_filesize'),
        'post_max_size'=>get_cfg_var('post_max_size'),
        'uname'=>$os[0],
        'hostname'=>$os[2],
        'mysql'=>$mysql_version['version()'],
        'version'=>App::$version,
        'users_count'=>$users_count,
        'domain_count'=>$domain_count,
        'bytes_count'=>$bytes_count
    ];
    
    
    //操作日志
    $log_list = App::$db->select("select * from ".table("admin_log")." order by ctime desc limit 0,10");

    $newArr = [
        'data'=>$arr,
        'log_list'=>$log_list,
        'default_password'=>$default_password
    ];
    Tp::assign($newArr);
    Tp::display();
});

//退出
Rout::get('out',function(){
    Session::clear();
    header("Location:".U('/Index/login'));
    exit;
});

//系统配置
Rout::get('config',function(){
    Admin::setMenu(205);
    $systemConfig = new SystemConfig();
    $data = $systemConfig->getAll();
    
    $arr = [
        'langData'=>SystemConfig::getLang(),
        'data'=>$data
    ];
    
    Tp::assign($arr);
    Tp::display();
});

Rout::put('config',function(){
    Admin::setMenu(205);
    $data = ipost('data');
    $systemConfig = new SystemConfig();
    $systemConfig->save($data);
    E::success(1001);
});




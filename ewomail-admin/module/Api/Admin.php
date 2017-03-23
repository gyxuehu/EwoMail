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
if(!defined("PATH")) exit;

/**
 * 检查管理员是否有登陆web控制面板权限
 */
Rout::get('is_webmail',function(){
    $username = iany('username');
    $password = iany('password');

    if(!$username){
        E::error('username parameter');
    }
    if(!$password){
        E::error('password domain parameter');
    }
    
    $row = App::$db->getOne("select * from ".table("admin")." where username='$username' and is_webmail=1");
    if(!$row){
        E::error('Data does not exist');
    }

    if($row['password']!=md5($password)){
        E::error('The original password is not correct');
    }
    
    E::success('yes');
});
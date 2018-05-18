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
 * 首页、登陆部分
 */
if(!defined("PATH")) exit;

Rout::get('index',function(){
    $user = Session::get('user');

    if($user){
        header("Location:".U('/System/index'));
    }else{
        header("Location:".U('/Center/Index/login'));
    }
    exit;
    
});

Rout::get('login',function(){
    $lofinInfo = Session::get('loginInfo');
    if($lofinInfo){
        header("Location:".U('/System/index'));
        exit;
    }
    Tp::display();
});

Rout::put('login',function(){
    $admin = new Admin();
    $admin->login();
    E::success(2026);
});

//退出
Rout::get('out',function(){
    Session::set('loginInfo',null);
    header("Location:".U('/Index/login'));
    exit;
    
});

//切换语言
Rout::get('lang',function(){
    $lang = iget('lang');
    $langData = SystemConfig::getLang();
    if(!$langData[$lang]){
        E::error(2032);
    }
    Cookie::set('lang',$lang,3600*24*90);
    header("Location:".$_SERVER['HTTP_REFERER']);
    exit;
});

//验证码
Rout::get('captcha',function(){
    $captcha = new SimpleCaptcha();
    $captcha->CreateImage();
});
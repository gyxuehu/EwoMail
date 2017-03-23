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
 * 操作日志
 */
if(!defined("PATH")) exit;

Rout::get('index',function(){
    Admin::setMenu(206);
    $count = App::$db->count("select count(*) from ".table("admin_log"));
    $page = new Page($count,20);
    $list = App::$db->select("select * from ".table("admin_log")." order by ctime desc {$page->limit}");
    $arr = [
        'list'=>$list,
        'page'=>$page->show()
    ];
    Tp::assign($arr);
    Tp::display();
});

Rout::delete('index',function(){
    Admin::setMenu(206);
    App::$db->delete("admin_log",1);
    E::success(1003);
});


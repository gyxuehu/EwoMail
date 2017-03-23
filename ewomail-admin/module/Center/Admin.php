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
 * 管理员运行程序
 */
if(!defined("PATH")) exit;
//管理员列表
Rout::get('index',function(){
    Admin::setMenu(201);
    
    $count = App::$db->count("select count(*) from ".table("admin"));
    $page = new Page($count,20);
    $list = App::$db->select("select a.*,b.title from ".table("admin")." as a left join ".table("admin_group")." as b on a.gid=b.gid {$page->limit}");
    $arr = [
        'list'=>$list,
        'page'=>$page->show()
    ];
    Tp::assign($arr);
    
    Tp::display();
});

//管理员删除
Rout::delete('index',function(){
    Admin::setMenu(201);
    $aid = iget('aid');
    $admin = new Admin();
    $admin->delete($aid);
    E::success(1003);
});


//管理员编辑页面
Rout::get('edit',function(){
    $aid = intval(iget('aid'));
    $title = $aid?L(2008).L(1103):'';
    Admin::setMenu(202,$title);
    
    if($aid){
        $admin = new Admin();
        $row = $admin->getOne($aid);
    }
    $group = App::$db->select("select * from ".table("admin_group"));
    $arr = [
        'group'=>$group,
        'row'=>$row
    ];
    
    Tp::assign($arr);
    Tp::display();
});

//管理员编辑数据保存
Rout::put('edit',function(){
    Admin::setMenu(202);
    
    $aid = intval(iget('aid'));
    $admin = new Admin();
    $admin->save([],$aid);
    E::success(1001);
});

//个人资料
Rout::get('user',function(){
    Admin::setMenu(0,L(3054));
    $gid = Admin::$info['gid'];
    $group_title = L(1109);
    if($gid){
        $row = App::$db->getOne("select title from ".table("admin_group")." where gid=$gid");
        if($row){
            $group_title = $row['title'];
        }
    }
    
    $arr = [
        'group_title'=>$group_title
    ];
    Tp::assign($arr);
    Tp::display();
});

//个人资料保存
Rout::put('user',function(){
    $admin = new Admin();
    $admin->updateInfo();
    E::success(1001);
});


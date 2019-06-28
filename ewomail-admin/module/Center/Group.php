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
 * 管理员权限
 */
if(!defined("PATH")) exit;

//角色列表
Rout::get('index',function(){
    Admin::setMenu(203);
    
    $count = App::$db->count("select count(gid) from ".table("admin_group"));
    $page = new Page($count,20);
    $list = App::$db->select("select gid,title from ".table("admin_group")." order by gid asc {$page->limit}");
    $arr = [
        'list'=>$list,
        'page'=>$page->show()
    ];
    Tp::assign($arr);
    
    Tp::display();
});

//角色删除
Rout::delete('index',function(){
    Admin::setMenu(203);
    $gid = intval(iget('gid'));
    $row = App::$db->getOne("select * from ".table("admin_group")." where gid=$gid");
    $where = "gid=$gid";
    App::$db->delete("admin_group",$where);
    $logData = [
        'ac'=>'del',
        'c'=>'角色名称：'.$row['title']
    ];
    AdminLog::save($logData);
    E::success(1003);
});

//角色编辑
Rout::get('edit',function(){
    $gid = intval(iget('gid'));
    $title = $gid?L(2001).L(1103):'';
    Admin::setMenu(204,$title);
    
    $auth = [];
    if($gid){
        $row = App::$db->getOne("select * from ".table("admin_group")." where gid=$gid");
        if(!$row){
            E::error(1005);
        }
        $auth = unserialize($row['auth']);
    }
    $menu = App::$db->select("select * from ".table("admin_menu")." where top_id=0 order by menu_id asc,sort desc");
    foreach($menu as $k=>$v){
        $data = App::$db->select("select * from ".table("admin_menu")." where top_id=$v[menu_id] and edit_id=0 order by menu_id asc,sort desc");
        foreach($data as $kk=>$d){
            if($auth){
                $authRow = $auth[$d['menu_id']];
                if($authRow['view']){
                    $data[$kk]['view_sd'] = 1;
                }
                if($d['edit'] && $authRow['edit']){
                    $data[$kk]['edit_sd'] = 1;
                }
                if($d['del'] && $authRow['del']){
                    $data[$kk]['del_sd'] = 1;
                }
            }
            $data[$kk]['title'] = L($d['lang']);
        }
        $menu[$k]['title'] = L($v['lang']);
        $menu[$k]['child'] = $data;
    }
    
    $arr = [
        'row'=>$row,
        'menu'=>$menu
    ];
    Tp::assign($arr);
    Tp::display();
});

//角色编辑数据保存
Rout::put('edit',function(){
    Admin::setMenu(204);
    $gid = intval(iget('gid'));
    $admin = new Admin();
    $auth = ipost('auth');
    foreach($auth as $k=>$v){
        if(!$v['view']){
            if($v['edit'] || $v['del']){
                $auth[$k]['view'] = 1;
            }
        }
    }
    
    $newData = [
        'title'=>ipost('title'),
        'auth'=>serialize($auth),
    ];
    
    if($gid){
        App::$db->update("admin_group",$newData,"gid=$gid");
    }else{
        App::$db->insert('admin_group',$newData);
    }
    $logData = [
        'ac'=>$gid?'edit':'add',
        'c'=>'角色名称：'.$newData['title']
    ];
    AdminLog::save($logData);
    E::success(1001);
});

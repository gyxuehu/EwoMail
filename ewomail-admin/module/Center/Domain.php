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
 * 域名管理程序
 */
if(!defined("PATH")) exit;

//邮件域名列表
Rout::get('index',function(){
    Admin::setMenu(103);
    $count = App::$db->count("select count(*) from ".table("domains"));
    $page = new Page($count,20);
    $list = App::$db->select("select * from ".table("domains")." {$page->limit}");
    $arr = [
        'list'=>$list,
        'page'=>$page->show()
    ];
    
    Tp::assign($arr);
    Tp::display();
});

//邮件域名删除
Rout::delete('index',function(){
    Admin::setMenu(103);
    $id = iget('id');
    $domains = new Domains();
    $domains->delete($id);
    E::success(1003);
});


//邮件域名编辑页面
Rout::get('edit',function(){
    $id = intval(iget('id'));
    
    Admin::setMenu(103);
    $domains = new Domains();
    if($id){
        $row = $domains->getOne($id);
    }
    
    $arr = [
        'row'=>$row
    ];
    
    Tp::assign($arr);
    Tp::display();
});

//邮件域名编辑数据保存
Rout::put('edit',function(){
    Admin::setMenu(103);
    $id = intval(iget('id'));
    $domains = new Domains();
    $domains->save([],$id);
    E::success(1001);
});

Rout::get('dkim',function(){
    $id = intval(iget('id'));
    Admin::setMenu(103);
    
    if($id){
        $domains = new Domains();
        $row = $domains->getOne($id);
    }
    
    $server = new Server();
    $sendData = [
        'domain'=>$row['name'],
        'op'=>'getkey'
    ];
    $data = $server->send("root","dkim",$sendData);
    if(preg_match('/pass/',$data['data']['testkeys'])){
        $keysok = true;
    }else{
        $keysok = false;
    }

    $arr = [
        'data'=>$data['data'],
        'keysok'=>$keysok
    ];
    Tp::assign($arr);
    Tp::display();
});

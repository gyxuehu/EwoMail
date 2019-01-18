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
 * 邮件用户
 */
if(!defined("PATH")) exit;

//邮件列表
Rout::get('index',function(){
    Admin::setMenu(101);
    $sort = iget('sort');
    $active = iget('active');
    $email = iget('email');
    $domain = iget('domain');
    
    $where = '1';
    $order = 'a.ctime desc';
    
    if($sort){
        $sortArr = explode(':',$sort);
        $s_a = $sortArr[0];
        $s_b = $sortArr[1];
        if($s_a=='gb'){
            $order = "c.bytes $s_b";
        }
    }
    
    if($active!==''){
        $active = intval($active);
        $where .= " and a.active=$active";
    }
    
    if($email){
        $where .= " and a.email='$email'";
    }
    
    if($domain){
        $where .= " and b.name='$domain'";
    }
    
    
    
    $count = App::$db->count("select count(a.id) from ".table("users")." as a 
        left join ".table("domains")." as b on a.domain_id=b.id 
        left join ".table("quota")." as c on a.email=c.email 
        where $where");
    $page = new Page($count,20);
    $list = App::$db->select("select a.*,c.bytes from ".table("users")." as a 
        left join ".table("domains")." as b on a.domain_id=b.id 
        left join ".table("quota")." as c on a.email=c.email 
        where $where order by $order {$page->limit}");
    $arr = [
        'list'=>$list,
        'page'=>$page->show()
    ];

    Tp::assign($arr);
    Tp::display();
});

//邮件删除
Rout::delete('index',function(){
    Admin::setMenu(101);
    $id = iget('id');
    $users = new User();
    $users->delete($id);
    E::success(1003);
});


//邮件编辑页面
Rout::get('edit',function(){
    $id = intval(iget('id'));
    $title = $gid?L(2001).L(1103):'';
    Admin::setMenu(102,$title);
    
    if($id){
        $users = new User();
        $row = $users->getOne($id);
    }
    
    $arr = [
        'row'=>$row
    ];
    
    Tp::assign($arr);
    Tp::display();
});

//邮件编辑数据保存
Rout::put('edit',function(){
    Admin::setMenu(101);
    $id = intval(iget('id'));
    $users = new User();
    $users->save([],$id);
    E::success(1001);
});


//邮件系统设置
Rout::get('config',function(){
    Admin::setMenu(105);
    $mailConfig = new MailConfig();
    $row = $mailConfig->getAll();
    $arr = [
        'row'=>$row
    ];
    Tp::assign($arr);
    Tp::display();
});

Rout::put('config',function(){
    Admin::setMenu(105);
    $data = ipost('data');
    $type = ipost('type');
    $mailConfig = new MailConfig();
    $mailConfig->save($data);
    if($type=='senior'){
        $sendData = [
            'myhostname'=>$data['myhostname'],
            'mydomain'=>$data['mydomain']
        ];
        $server = new Server();
        $server->send("root","update_mail_config",$sendData);
        $logData = [
            'ac'=>'edit',
            'c'=>'邮件系统设置'
        ];
        AdminLog::save($logData);
    }
    E::success(1001);
});

//收发数量页面
Rout::get('rec',function(){
    Admin::setMenu(101);
    $id = intval(iget('id'));
    $start_day = iget('start_day');
    $end_day = iget('end_day');
    
    $users = new User();
    $row = $users->getOne($id);
    
    $date = new Date();
    $d = $date->format("%Y-%m-%d");
    $where = "email='$row[email]'";
    
    if($start_day){
        $where .= " and day>='$start_day'";
    }
    
    if($end_day){
        $where .= " and day<='$end_day'";
    }
    
    $count = App::$db->count("select count(day_id) from ".table("day_record")." where $where");
    $page = new Page($count,10);
    $list = App::$db->select("select * from ".table("day_record")." where $where order by day desc {$page->limit}");
    $arr = [
        'list'=>$list,
        'page'=>$page->show()
    ];
    
    Tp::assign($arr);
    Tp::display();
});


//收发数量页面
Rout::put('rec',function(){
    Admin::setMenu(101);
    $day_id = intval(iget('day_id'));
    $clean = iget('clean');
    $row = App::$db->getOne("select * from ".table("day_record")." where day_id=$day_id");
    if(!$row) E::error(1005);
    if($clean=='s'){
        $newData = [
            's_num'=>0
        ];
        App::$db->update("day_record",$newData,"day_id=$day_id");
    }else if($clean=='c'){
        $newData = [
            'c_num'=>0
        ];
        App::$db->update("day_record",$newData,"day_id=$day_id");
    }else{
        E::error(1002);
    }
    E::success(1001);
    
});
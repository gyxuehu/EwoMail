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
 * 管理员日志操作类
 * */
class AdminLog extends App
{
    
    private static $ac = [
        'login'=>'登陆',
        'add'=>'添加',
        'edit'=>'修改',
        'del'=>'删除'
    ];
    
    public static function save($data)
    {

        $ac = $data['ac'];//操作
        $c = $data['c'];//内容
        $ac_str = "";
        if($ac){
            $ac_str = "[操作：".self::$ac[$ac]."]";
        }
        
        $explain = $ac_str.$c;
        
        $newData = [
            'ip'=>get_client_ip(),
            'username'=>Admin::$info['username'],
            'explain'=>$explain,
            'ctime'=>self::$format,
        ];
        
        $id = App::$db->insert("admin_log",$newData);
    }
}
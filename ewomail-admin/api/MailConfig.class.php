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
 * 邮件配置类
 * Class MailConfig
 */
class MailConfig extends App
{
    /**
     * 获取一条配置数据
     * @param $name
     * @return mixed
     */
    public static function get($name)
    {
        $row = App::$db->getOne("select value from ".table("mail_config")." where name='$name'");
        return $row['value'];
    }

    /**
     * 保存数据
     * @param $data
     */
    public function save($data)
    {
        foreach($data as $k=>$v){
            $newData = [
                'value'=>$v
            ];
            App::$db->update('mail_config',$newData,"name='$k'");
        }
    }

    /**
     * 获取全部数据
     * @return array
     */
    public function getAll()
    {
        $data = App::$db->select("select * from ".table("mail_config"));
        $newData = [];
        foreach($data as $v){
            $newData[$v['name']] = $v['value'];
        }
        return $newData;
    }
    
}
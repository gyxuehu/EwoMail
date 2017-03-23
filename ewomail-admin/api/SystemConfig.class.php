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
 * 系统配置类
 * Class SystemConfig
 */
class SystemConfig extends App
{
    /**
     * 获取一条数据
     * @param $name
     * @return mixed
     */
    public static function get($name)
    {
        $row = App::$db->getOne("select value from ".table("system_config")." where name='$name'");
        return $row['value'];
    }

    /**
     * 获取当前配置语言
     * @return array|mixed
     */
    public static function getLang()
    {
        static $r = [];
        if(!$r){
            $r = include PATH.'/lang/config.php';
        }
        return $r;
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
            App::$db->update('system_config',$newData,"name='$k'");
        }
        $logData = [
            'ac'=>'edit',
            'c'=>'系统设置'
        ];
        AdminLog::save($logData);
    }

    /**
     * 获取全部数据
     * @return array
     */
    public function getAll()
    {
        $data = App::$db->select("select * from ".table("system_config"));
        $newData = [];
        foreach($data as $v){
            $newData[$v['name']] = $v['value'];
        }
        return $newData;
    }
    
}
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
 * cookie类
 * */
class Cookie{

    /**
     * 设置cookie值
     * @param $key
     * @param string $value
     * @param int $expire 过期时间，秒为单位
     */
    public static function set($key,$value='',$expire=0)
    {
        $key = C('prefix').$key;
        if(!$value){
            setcookie($key,'',time()-3600,'/');
        }else{
            $value = json_encode($value);
            $value = authcode($value,'ENCODE');
            setcookie($key,$value,time()+$expire,'/');
        }
        
    }

    /**
     * 获取cookie值
     * @param $key
     * @return mixed
     */
    public static function get($key)
    {
        $key = C('prefix').$key;
        $value = $_COOKIE[$key];
        if($value){
            $value = json_decode(authcode($value),true);
        }
        return $value;
    }

    /**
     * 清除所有cookie
     */
    public static function clear()
    {
        $_COOKIE = null;
    }
    
    
}
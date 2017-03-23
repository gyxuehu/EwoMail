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
 * session类
 * */
class Session{

    /**
     * 输入
     * @param $key
     * @param $value
     */
    public static function set($key,$value)
    {
        $key = C('prefix').$key;
        $_SESSION[$key] = $value;
    }

    /**
     * 读取
     * @param $key
     * @return mixed
     */
    public static function get($key)
    {
        $key = C('prefix').$key;
        return $_SESSION[$key];
    }

    /**
     * 清除所有
     */
    public static function clear()
    {
        $_SESSION = null;
        session_destroy();
    }
    
    
}
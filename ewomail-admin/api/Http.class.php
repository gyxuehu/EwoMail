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
 * http远程操作类
 * Class Http
 */
class Http
{
    
    //超时秒
    public static $out_time = 5;
    
    public function __construct($m)
    {
       
    }

    /**
     * post
     * @param $url
     * @param array $data
     * @return mixed
     */
    public static function post($url,$data=[])
    {
        $con = curl_init();
        curl_setopt($con, CURLOPT_URL,$url);
        curl_setopt($con, CURLOPT_HEADER, false);
        curl_setopt($con, CURLOPT_POST,true);
        curl_setopt($con, CURLOPT_RETURNTRANSFER,true);
        curl_setopt($con, CURLOPT_TIMEOUT,self::$out_time);
        curl_setopt($con, CURLOPT_POSTFIELDS, $data);
        $r = curl_exec($con);
        return $r;
    }
    
}
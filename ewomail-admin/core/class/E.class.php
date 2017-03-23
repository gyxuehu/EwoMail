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
 * 异常/跳转类
 * */
class E extends Exception
{
    public $data;
    //跳转的URL
    public $url;

    public function __construct($message, $code = 0,$data=null,$url='') {  
        $this->data = $data;
        $this->url = $url;
        parent::__construct($message, $code);
    }

    /**
     * 系统级异常，通常用于程序初始化阶段的致命错误
     * @param $message
     * @throws E
     */
    public static function sys($message)
    {
        $message = self::getMsg($message);
        throw new E($message,-100);
    }

    /**
     * 成功跳转，若是ajax请求将会输出json数据
     * @param $message 信息，也可以是语言包的key(例如是1001)
     * @param string $url 跳转链接
     * @param null $data 数据，ajax专用
     * @throws E
     */
    public static function success($message,$url='',$data=null)
    {
        $message = self::getMsg($message);
        if(!$url){
            $url = iget('_forward')?iget('_forward'):ipost('_forward');
            $url = urldecode($url);
        }
        throw new E($message,1,$data,$url);
    }

    /**
     * 错误跳转，若是ajax请求将会输出json数据
     * @param $message 信息，也可以是语言包的key(例如是1001)
     * @param string $url 跳转链接
     * @param null $data 数据，ajax专用
     * @throws E
     */
    public static function error($message,$url='',$data=null)
    {
        $message = self::getMsg($message);
        throw new E($message,0,$data,$url);
    }

    /**
     * 获取信息
     * @param $msg 如果是数字则从语言包提取
     * @return array|mixed
     */
    public static function getMsg($msg)
    {
        if(is_int($msg)){
            return L($msg);
        }else{
            return $msg;
        }
        
    }
    
}
?>
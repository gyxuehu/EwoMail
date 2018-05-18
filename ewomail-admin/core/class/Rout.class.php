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
 * 路由操作类
 * */
class Rout
{
    private static $core = [];
    
    private static $action = [];
    
    private static $init = [];
    
    public static $method = '';
    
    /**
     * 核心运行
     * */
	public static function core(callable $fun)
    {
        self::$core[] = $fun;
    }
    
    private static function key()
    {
        return HOME.'_'.MODULE;
    }
    
    /**
     * 运行action init
     * */
    public static function init(callable $fun)
    {
        self::$init[self::key()][] = $fun;
    }
    
    private static function add($act,callable $fun,$method)
    {
        self::$action[self::key()][$act][$method] = $fun;
    }
    
    
    /**
     * 运行action get
     * */
    public static function get($act,callable $fun)
    {
        self::add($act,$fun,'get');
    }
    
    /**
     * 运行action put
     * */
    public static function put($act,callable $fun)
    {
        self::add($act,$fun,'put');
    }
    
    /**
     * 运行action delete
     * */
    public static function delete($act,callable $fun)
    {
        self::add($act,$fun,'delete');
    }

    /**
     * 运行路由
     */
    public static function run()
    {
        try
        {
            foreach(self::$core as $fun){
                $fun();
            }
            $init = self::$init[self::key()];         
            foreach($init as $fun){
                $fun();
            }
            $method = ipost('_method');
            if(!$method){
                $method = 'get';
            }
            self::$method = $method;
            $action = self::$action[self::key()];
            $actFun = $action[ACTION][$method];
            
            if($actFun){
                $actFun();
            }else{
                E::sys(ACTION."--action不存在");
            }
        }
        catch(E $e)
        {
            $code = $e->getCode();
            if(App::$db && App::$db->trans){
                App::$db->rollback();
            }
            if($code==-100){
                //系统错误
                header('Content-Type:application/json; charset=utf-8');
                $arr = [
                    'status'=>-100,
                    'msg'=>'系统错误：'.$e->getMessage()
                ];
                if(IS_AJAX || defined("IS_API")){
                    echo json_encode($arr);
                }else{
                    echo $arr['msg'];
                }
                
            }else{
                $arr = [
                    'status'=>$code,
                    'msg'=>$e->getMessage(),
                    'url'=>$e->url,
                    'data'=>$e->data
                ];
                if(IS_AJAX || defined("IS_API")){
                    header('Content-Type:application/json; charset=utf-8');
                    echo json_encode($arr);
                    exit;
                }
                Tp::assign($arr);
                Tp::jump();
            }
            exit;
        }
        
    }
}
?>
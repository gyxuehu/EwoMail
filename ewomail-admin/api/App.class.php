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
 * 基础类
 * Class App
 */
class App
{
    /**
     * 数据库变量
     * @var Db
     */
    public static $db;
    
    //当前的格式化时间
    public static $format;
    
    
    //指定管理员id,只用在类的继承
    public $admin_id = 0;

    //版本号
    public static $version = '';
    
    
    public function __construct()
    {
        
    }

    /**
     * 程序初始化（包含语言包加载、数据库链接、常用变量初始化定义）
     */
    public static function init()
    {
        //数据库链接
        self::$db = new Db();
        self::$db->connect(C('dbhost'),C('dbuser'),C('dbpw'),C('dbname'),C('dbcharset'));

        //设置当前时间变量
        $date = new Date();
        self::$format = $date->format();

        //当前语言
        $lang = Cookie::get('lang');
        if(!$lang){
            $lang = SystemConfig::get('lang');
        }

        //语言包路径
        $langPath = PATH."/lang/$lang.php";
        //加载语言包
        if(!file_exists($langPath)){
            Cookie::set('lang','');
            E::sys('语言包不存在，'.$langPath);
        }
        $L = L('',$langPath);
        $langData = SystemConfig::getLang();

        //版本号
        self::$version = @file_get_contents(PATH.'/core/version');

        //将一些常用变量注入到模板变量
        $arr = [
            'L'=>$L,//当前加载的语言包变量
            'L_ALL'=>SystemConfig::getLang(),//语言包配置的国家语言种类
            'LANG'=>$lang,//当前国家语言编号
            'LANG_NAME'=>$langData[$lang],//当前国家语言名称
            'WEB_TITLE'=>SystemConfig::get('title'),//网站标题
            'WEB_COPYRIGHT'=>SystemConfig::get('copyright'),//网站授权信息
            'WEB_ICP'=>SystemConfig::get('icp'),//网站icp信息
        ];
        
        Tp::assign($arr);
    }
    
    /**
     * 检查是否已登陆
     * */
    public static function checkLogin()
    {
        $loginInfo = Session::get('loginInfo');
        //跳过Index控制器的登陆检查
        if(MODULE!='Index' && !$loginInfo){
            header("Location:/Index/login");
            exit;
        }
        Admin::$aid = $loginInfo['aid'];
    }
    
    /**
     * 设置登陆信息
     * */
    public static function setLoginInfo()
    {
        if(Admin::$aid){
            $admin = new Admin();
            $adminData = $admin->getOne(Admin::$aid);
            if($adminData['super']){
                $adminData['type_title'] = L(2013);
            }else{
                $adminData['type_title'] = L(2012);
            }
            Admin::$info = $adminData;
            $arr = [
                'adminData'=>$adminData
            ];
            Tp::assign($arr);
        }
    }
    
}
?>
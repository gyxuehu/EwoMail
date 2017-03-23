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
 * 模板操作类
 * */
class Tp
{
    //smarty模板引擎对象
    public static $smarty;
    //当前目录
    public static $curDir;

    /**
     * 初始化
     */
    public static function init()
    {
        $template = "/templates";
        self::$smarty = new Smarty();
        self::$smarty->setTemplateDir(PATH.$template);
        self::$smarty->setCompileDir(PATH."/cache/templates/c");
        self::$smarty->setCaching(false);
        
        self::$curDir = HOME.'/'.MODULE;
        $arr = [
            'HOME'=>HOME,
            'PUBLIC'=>$template.'/'.HOME.'/public'
        ];
        
        self::assign($arr);
    }

    /**
     * 输出模板
     * @param string $file 指定模板文件，为空则是当前动作模板
     */
    public static function display($file='')
    {
        $path = self::getPath($file);
        self::isFile($path);
        self::$smarty->display($path);
    }

    /**
     * 读取模板
     * @param string $file
     */
    public static function fetch($file='')
    {
        $path = self::getPath($file);
        self::isFile($path);
        self::$smarty->fetch($path);
    }
    
    /**
     * 注入变量
     * $array 数组
     * */
    public static function assign($array)
    {
        foreach($array as $key=>$value){
            self::$smarty->assign($key,$value);
        }
    }

    /**
     * 获取模板变量
     * @param string $key
     * @return mixed
     */
    public static function get($key='')
    {
        return self::$smarty->getTemplateVars($key);
    }

    /**
     * 获取模板路径
     * @param string $file 指定模板文件
     * @return string
     */
    public static function getPath($file='')
    {
        if(!$file){
            $path = self::$curDir.'/'.ACTION.'.html';
        }else{
            if($file[0]=='/'){
                $path = $file.'.html';
            }else{
                $path = self::$curDir.'/'.$file.'.html';
            }
        }
        return $path;
    }

    /**
     * 检查模板文件是否存在
     * @param $file
     */
    public static function isFile($file)
    {
        $file = self::$smarty->getTemplateDir()[0].$file;
        if(!file_exists($file)){
            E::sys('模板文件不存在：'.$file);
        }
    }
    
    /**
     * 跳转输出模板
     * */
    public static function jump()
    {
        $path = HOME.'/jump.html';
        self::isFile($path);
        self::$smarty->display($path);
    }
    
}

?>
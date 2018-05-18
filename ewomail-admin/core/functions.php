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
 * 全局函数库，自动加载
 */

/**
 * 获取系统文件配置
 * */
function C($key){
    static $config;
    if($config){
        return $config[$key];
    }
    $config = include(PATH.'/core/config.php');
    return $config[$key];
}

/**
 * 设置或获取一个get/post静态参数，设置参数后将会覆盖get/post传递的参数
 * 一般应用在数据保存
 * @param null $arr 空为获取，存值设置
 * @return array|null
 */
function istatic($arr=null)
{
    static $newArr = [];
    
    if(is_array($arr)){
        $newArr = $arr;
    }
    
    return $newArr;
}

/**
 * 获取post/get参数
 * @param $key
 * @return array|mixed|string
 */
function iany($key)
{
    if(!$key){
        return '';
    }
    $data = iget($key);
    if(!$data){
        $data = ipost($key);
    }
    return $data;
}

/**
 * 获取get参数
 * @param string $key
 * @return array|mixed|string
 */
function iget($key=''){
    if($key){
        $static = istatic();
        if(isset($static[$key])){
            $data = $static[$key];
        }else{
            $data = $_GET[$key];
        }
    }else{
        $data = $_GET;
    }
    return iFilter($data);
}

/**
 * 获取post参数
 * @param string $key
 * @return array|mixed|string
 */
function ipost($key=''){
    if($key){
        $static = istatic();
        if(isset($static[$key])){
            $data = $static[$key];
        }else{
            $data = $_POST[$key];
        }
        
    }else{
        $data = $_POST;
    }
    return iFilter($data);
}

/**
 * 参数过滤
 * */
function iFilter($var)
{
    if(is_array($var)){
        foreach($var as $key=>$v){
            $var[$key] = iFilter($v);
        }
    }else{
        $var = trim(htmlspecialchars($var));
        $var = str_replace(array('\n', '\r'), array(chr(10), chr(13)), addslashes($var));
    }
    return $var;
    
}

/**
 * 设置/获取语言包
 * @param $value
 * @param string $file 留空获取，存值设置
 * @return array|mixed
 */
function L($value,$file=''){
    static $lang = [];
    if($file){
        $r = include $file;
        foreach($r as $key=>$v){
            $lang[$key] = $v;
        }
        return $lang;
    }
    
    if(!$lang[$value]){
        return $value;
    }
    return $lang[$value];
    
}

/**
 * 获取字符串长度（包含中文）
 * @param $str
 * @return int
 */
function str_len($str){
    $length = strlen(preg_replace('/[\x00-\x7F]/', '', $str));
    if ($length){
        return strlen($str) - $length + intval($length / 3);
    }else{
        return strlen($str);
    }
}

/**
 * 获取数据表的前缀
 * @param $tablename 表名
 * @return string 返回表的前缀和表明
 */
function table($tablename)
{
    return C('dbprefix').$tablename;
}

/**
 * 设置url
 * @param $path  定义 模块/控制器/动作 (如不填写模块，函数自动加入当前模块)
 * @param null $p ?后面的参数(数组或字符串)
 * @return string
 */
function U($path,$p=null)
{
    $path = trim($path,'/');
    $paths = explode('/',$path,3);
    if(count($paths)<3){
        if(HOME!=C('home_default')){
            array_unshift($paths,HOME);
        }
        $path = implode("/",$paths);
    }
    
    if($path){
        $path = '/'.$path;
    }else{
        $path = '/';
    }
    
    if($p){
        if(is_array($p)){
            $var = http_build_query($p);
            $path .= '?'.$var;
        }else{
            $path .= '?'.$p;
        } 
    }
    
    return $path;
    
}

/**
 * 开启事务
 * */
function trans(callable $fun)
{
    App::$db->startTrans();
    $r = $fun();
    App::$db->commit();
    return $r;
}

/**
 * 捕获异常
 * @param callable $fun 执行流程的函数
 * @param null $e 需要传递引用变量，出现异常后将会把异常对象变量赋值到该变量
 * @return bool 如果出现异常将会返回false
 */
function E(callable $fun,&$e=null)
{
    try{
        $r = $fun();
        return $r;
    }catch(E $_e){
        $e = $_e;
        return false;
    }
}

/**
 * 邮箱格式验证
 * inAddress  邮箱
 * return 0 格式错误 1 格式正确
 */
function check_email($inAddress){
    return preg_match("/^[a-zA-Z0-9_\\.-]+@[a-zA-Z0-9_-]+\\..+$/",$inAddress);
    
}

/**
 * 域名格式验证
 * $str  邮箱
 * return 0 格式错误 1 格式正确
 */
function check_domain($str)
{
    return preg_match("/^[_a-zA-Z0-9-]+(\.[a-zA-Z0-9]+)+$/",$str);
}


/**
 * 格式化数字，以标准MONEY格式输出
 * @param $money
 * @return string
 */
function money($money)
{
    $money = number_format($money, 2);
    $money = floatval($money);
    return $money;
}

/**
 * 指定或获取上一页地址
 * @param $bool true获取上一页地址，false将用U函数获取$path地址
 * @param $path
 * @param string $p
 * @return string
 */
function asForward($bool,$path,$p='')
{  
    if($bool){
        $url = $_SERVER['HTTP_REFERER'];
    }else{
        $url = U($path,$p);
    }
    return urlencode($url);
}


/**
 * 获取客户端IP地址
 * @param integer $type 返回类型 0 返回IP地址 1 返回IPV4地址数字
 * @param boolean $adv 是否进行高级模式获取（有可能被伪装） 
 * @return mixed
 */
function get_client_ip($type = 0,$adv=true) {
    $type       =  $type ? 1 : 0;
    static $ip  =   NULL;
    if ($ip !== NULL) return $ip[$type];
    if($adv){
        if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $arr    =   explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            $pos    =   array_search('unknown',$arr);
            if(false !== $pos) unset($arr[$pos]);
            $ip     =   trim($arr[0]);
        }elseif (isset($_SERVER['HTTP_CLIENT_IP'])) {
            $ip     =   $_SERVER['HTTP_CLIENT_IP'];
        }elseif (isset($_SERVER['REMOTE_ADDR'])) {
            $ip     =   $_SERVER['REMOTE_ADDR'];
        }
    }elseif (isset($_SERVER['REMOTE_ADDR'])) {
        $ip     =   $_SERVER['REMOTE_ADDR'];
    }
    // IP地址合法验证
    $long = sprintf("%u",ip2long($ip));
    $ip   = $long ? array($ip, $long) : array('0.0.0.0', 0);
    return $ip[$type];
}


/**
 * 字符串加密以及解密函数
 *
 * @param string $string	原文或者密文
 * @param string $operation	操作(ENCODE | DECODE), 默认为 DECODE
 * @param string $key		密钥
 * @param int $expiry		密文有效期, 加密时候有效， 单位 秒，0 为永久有效
 * @return string		处理后的 原文或者 经过 base64_encode 处理后的密文
 *
 * @example
 *
 * 	$a = authcode('abc', 'ENCODE', 'key');
 * 	$b = authcode($a, 'DECODE', 'key');  // $b(abc)
 *
 * 	$a = authcode('abc', 'ENCODE', 'key', 3600);
 * 	$b = authcode('abc', 'DECODE', 'key'); // 在一个小时内，$b(abc)，否则 $b 为空
 */
function authcode($string, $operation = 'DECODE', $key = '', $expiry = 0) {

	$ckey_length = 4;	//note 随机密钥长度 取值 0-32;
				//note 加入随机密钥，可以令密文无任何规律，即便是原文和密钥完全相同，加密结果也会每次不同，增大破解难度。
				//note 取值越大，密文变动规律越大，密文变化 = 16 的 $ckey_length 次方
				//note 当此值为 0 时，则不产生随机密钥

	$key = md5($key ? $key : C('code_key'));
	$keya = md5(substr($key, 0, 16));
	$keyb = md5(substr($key, 16, 16));
	$keyc = $ckey_length ? ($operation == 'DECODE' ? substr($string, 0, $ckey_length): substr(md5(microtime()), -$ckey_length)) : '';

	$cryptkey = $keya.md5($keya.$keyc);
	$key_length = strlen($cryptkey);

	$string = $operation == 'DECODE' ? base64_decode(substr($string, $ckey_length)) : sprintf('%010d', $expiry ? $expiry + time() : 0).substr(md5($string.$keyb), 0, 16).$string;
	$string_length = strlen($string);

	$result = '';
	$box = range(0, 255);

	$rndkey = array();
	for($i = 0; $i <= 255; $i++) {
		$rndkey[$i] = ord($cryptkey[$i % $key_length]);
	}

	for($j = $i = 0; $i < 256; $i++) {
		$j = ($j + $box[$i] + $rndkey[$i]) % 256;
		$tmp = $box[$i];
		$box[$i] = $box[$j];
		$box[$j] = $tmp;
	}

	for($a = $j = $i = 0; $i < $string_length; $i++) {
		$a = ($a + 1) % 256;
		$j = ($j + $box[$a]) % 256;
		$tmp = $box[$a];
		$box[$a] = $box[$j];
		$box[$j] = $tmp;
		$result .= chr(ord($string[$i]) ^ ($box[($box[$a] + $box[$j]) % 256]));
	}

	if($operation == 'DECODE') {
		if((substr($result, 0, 10) == 0 || substr($result, 0, 10) - time() > 0) && substr($result, 10, 16) == substr(md5(substr($result, 26).$keyb), 0, 16)) {
			return substr($result, 26);
		} else {
			return '';
		}
	} else {
		return $keyc.str_replace('=', '', base64_encode($result));
	}
}

/**
 * 类似于var_dump，以HTML形式输出
 * @param $var
 * @param bool $echo
 * @param null $label
 * @param bool $strict
 * @return mixed|null|string
 */
function dump($var, $echo=true, $label=null, $strict=true) {
    $label = ($label === null) ? '' : rtrim($label) . ' ';
    if (!$strict) {
        if (ini_get('html_errors')) {
            $output = print_r($var, true);
            $output = '<pre>' . $label . htmlspecialchars($output, ENT_QUOTES) . '</pre>';
        } else {
            $output = $label . print_r($var, true);
        }
    } else {
        ob_start();
        var_dump($var);
        $output = ob_get_clean();
        if (!extension_loaded('xdebug')) {
            $output = preg_replace('/\]\=\>\n(\s+)/m', '] => ', $output);
            $output = '<pre>' . $label . htmlspecialchars($output, ENT_QUOTES) . '</pre>';
        }
    }
    if ($echo) {
        echo($output);
        return null;
    }else
        return $output;
}

function getMailUrl()
{
    $url = C('webmail_url');
    if(substr($url,0,1)=='*'){
        $arr = explode(":",$url);
        if($arr[1]){
            $url = 'http://'.$_SERVER['SERVER_ADDR'].':'.$arr[1];
        }else{
            $url = 'http://'.$_SERVER['SERVER_ADDR'];
        }
        return $url;
    }
    return $url;
}

/**
 * 字节转换
 * @param $bytes 字节
 * @param string $unit 转换成MB/GB
 * @param int $decimals 小数点后保留几位，默认2位
 * @return string
 */
function byteFormat($bytes, $unit = "", $decimals = 2) {
	$units = array('B' => 0, 'KB' => 1, 'MB' => 2, 'GB' => 3, 'TB' => 4, 'PB' => 5, 'EB' => 6, 'ZB' => 7, 'YB' => 8);

	$value = 0;
	if ($bytes > 0) {
		// Generate automatic prefix by bytes 
		// If wrong prefix given
		if (!array_key_exists($unit, $units)) {
			$pow = floor(log($bytes)/log(1024));
			$unit = array_search($pow, $units);
		}

		// Calculate byte value by prefix
		$value = ($bytes/pow(1024,floor($units[$unit])));
	}

	// If decimals is not numeric or decimals is less than 0 
	// then set default value
	if (!is_numeric($decimals) || $decimals < 0) {
		$decimals = 2;
	}

	// Format output
	return sprintf('%.' . $decimals . 'f', $value);
}

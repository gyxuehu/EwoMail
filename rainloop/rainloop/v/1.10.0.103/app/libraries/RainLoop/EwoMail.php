<?php

namespace RainLoop;

class EwoMail
{

    private static $config = [];

    private static $ewomail_path = '/ewomail/www/ewomail-admin';
    
	/**
	 * @return void
	 */
	public function __construct()
	{
	    if(!self::$config){
            self::$config = include(self::$ewomail_path.'/core/config.php');
        }
	}

	public function getKey()
    {
        return self::$config['code_key'];
    }

    public function getUrl()
    {
        $url = self::$config['url'];
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

    public function getApiUrl()
    {
        return $this->getUrl().'/Api/';
    }

    /**
     * 修改密码
     * @param $email
     * @param $password
     * @param $new_password
     * @return mixed|null
     */
    public function updatePassword($email,$password,$new_password)
    {
        $newData = [
            'email'=>$email,
            'password'=>$password,
            'new_password'=>$new_password
        ];
        $r = $this->send('User/update_password',$newData);
        return $r;
    }
	
	public function getDomain($domain)
	{
	    if(!isset($_SESSION['ewomail_domain'])){
            $_SESSION['ewomail_domain'] = [];
        }
        if(!isset($_SESSION['ewomail_domain'][$domain])){
            $row = $this->send('Domain/get',['domain'=>$domain]);
            if($row['status']){
                $data = $row['data'];
                $_SESSION['ewomail_domain'][$domain] = $data;
            }
        }else{
            $data = $_SESSION['ewomail_domain'][$domain];
        }

        return $data;
	}

    /**
     * 检查是否有控制面板登陆权限
     * @param $username
     * @param $password
     */
	public function is_login_panel($username,$password)
    {
        $newData = [
            'username'=>$username,
            'password'=>$password,
        ];
        $r = $this->send('Admin/is_webmail',$newData);
        return $r['status'];
    }

	public function send($action,$data=[])
	{
	    $data['_key'] = $this->getKey();
	    $timeout = 5;
        $url = $this->getApiUrl().$action;
        $con = curl_init();
        curl_setopt($con, CURLOPT_URL,$url);
        curl_setopt($con, CURLOPT_HEADER, false);
        curl_setopt($con, CURLOPT_POST,true);
        curl_setopt($con, CURLOPT_RETURNTRANSFER,true);
        curl_setopt($con, CURLOPT_TIMEOUT,$timeout);
        curl_setopt($con, CURLOPT_POSTFIELDS, $data);
        $r = curl_exec($con);
        $json = @json_decode($r,true);
        if(!isset($json['status'])){
            return null;
        }

        return $json;
	}
}

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
 * 邮件用户操作类
 * Class User
 */
class User extends App
{
    /**
     * 获取一条数据
     * @param $id
     * @return mixed
     */
    public function getOne($id)
    {
        $id = intval($id);
        $data = App::$db->getOne("select * from ".table('users')." where id=".$id);
        if(!$data){
            E::error(1005);
        }
        return $data;
    }

    /**
     * 添加/修改数据
     * @param array $data
     * @param int $id
     */
    public function save($data=[],$id=0)
    {
        istatic($data);
        $email = strtolower(ipost('email'));
        $password = ipost('password');
        $password2 = ipost('password2');
        $is_password = intval(ipost('is_password'));
        $active = intval(ipost('active'));
        $limits = intval(ipost('limits'));
        $limitg = intval(ipost('limitg'));
        $uname = ipost('uname');
        $tel = ipost('tel');
        istatic([]);
        
        //修改资料时检查是否修改密码
        if(!$id || ($id && $is_password)){
            self::checkPassword($password,$password2);
        }
        
        if($id){
            $row = $this->getOne($id);
            if(!$row) E::error(1005);
            $email = $row['email'];
            $newData = [
                'active'=>$active,
                'limits'=>$limits,
                'limitg'=>$limitg,
                'uname'=>$uname,
                'tel'=>$tel
            ];
            
            if($is_password){
                $newData['password'] = md5($password);
            }
            App::$db->update("users",$newData,"id=$id");
        }else{
            
            if(!check_email($email)){
                E::error(L(1107).L(90103));
            }
            
            $arr = explode('@',$email);
            $name = $arr[0];
            $domain = $arr[1];
            
            if(strlen($name)<2){
                E::error(3074);
            }
            
            
            $domainRow = App::$db->getOne("select * from ".table("domains")." where name='$domain'");
            if(!$domainRow){
                E::error(3016);
            }
            
            if(App::$db->count("select count(id) from ".table("users")." where email='$email'")){
                E::error(3017);
            }
            
            $newData = [
                'email'=>$email,
                'active'=>$active,
                'domain_id'=>$domainRow['id'],
                'password'=>md5($password),
                'limits'=>$limits,
                'limitg'=>$limitg,
                'uname'=>$uname,
                'tel'=>$tel,
                'maildir'=>$this->createMailDir($name,$domain),
                'ctime'=>App::$format,
            ];
            App::$db->insert('users',$newData);
        }
        
        $logData = [
            'ac'=>$id?'edit':'add',
            'c'=>'邮件地址：'.$email
        ];
        AdminLog::save($logData);
    }
    
    /**
     * 创建邮件地址路径
     * */
    public function createMailDir($name,$domain)
    {
        $str1 = substr($name,0,1);
        $str2 = substr($name,1,1);
        $str3 = substr($name,2,1);
        if(!$str3){
            $str3 = $str2;
        }
        $date = new Date();
        $format = $date->format("%Y%m%d");
        $dir = C('maildir')."/vmail/$domain/$str1/$str2/$str3/$name.$format";
        return $dir;
    }

    /**
     * 删除数据
     * @param $id
     */
    public function delete($id)
    {
        $row = $this->getOne($id);
        $where = "id=$id";
        App::$db->delete("users",$where);
        $logData = [
            'ac'=>'del',
            'c'=>'邮件地址：'.$row['email']
        ];
        AdminLog::save($logData);
    }

    /**
     * 检查密码
     * @param $password
     * @param $password2
     */
    public static function checkPassword($password,$password2)
    {
        if(strlen($password)<8 || strlen($password)>20){
            //密码字符数错误
            E::error(2020);
        }
        /*
        if(!preg_match("/[a-z]+[0-9]+/i",$password)){
            //密码必须包含字母和数字
            E::error(2040);
        }
        */
        if($password!=$password2){
            //2个密码不一致
            E::error(2021);
        }
    }
    
}
?>
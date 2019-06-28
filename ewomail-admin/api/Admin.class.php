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
 * 管理员操作类
 * Class Admin
 */
class Admin extends App
{
    //管理员登陆ID
    public static $aid;
    
    //管理员登陆信息
    public static $info;

    /**
     * 获取管理员一条信息
     * @param $id
     * @return mixed
     */
    public function getOne($id)
    {
        $id = intval($id);
        $data = App::$db->getOne("select * from ".table('admin')." where aid=".$id);
        if(!$data){
            E::error(1005);
        }
        return $data;
    }
  
    /**
     * 设置导航菜单和权限
     * $menu_id 菜单id
     * $title 替换当前标题
     * */
    public static function setMenu($menu_id,$title='')
    {
        $auth = [];
        $admin = new Admin();
        $adminData = $admin->getOne(self::$aid);
        if($adminData['gid'] && !$adminData['super']){
            //获取管理员数据
            $groupData = App::$db->getOne("select * from ".table('admin_group')." where gid=".$adminData['gid']);
            $auth = unserialize($groupData['auth']);
        }
        
        //访问权限检查
        if($menu_id && !$adminData['super']){
            $menuRow = App::$db->getOne("select * from ".table('admin_menu')." where menu_id=$menu_id");
            if(!$menuRow){
                //菜单栏目数据不存在
                E::sys(1112);
            }
            
            $m_id = $menuRow['edit_id']?$menuRow['edit_id']:$menu_id;
            if(Rout::$method=='get'){
                if(!$auth[$m_id]['view']){
                    E::error(1004);
                }
            }else if(Rout::$method=='put'){
                if(!$auth[$m_id]['edit']){
                    E::error(1004);
                }
            }else if(Rout::$method=='delete'){
                if(!$auth[$m_id]['del']){
                    E::error(1004);
                }
            }else{
                E::error(1004);
            }
        }
        
        
        $bar = '';
        $menu = App::$db->select("select * from ".table("admin_menu")." where top_id=0 order by menu_id asc,sort desc");
        foreach($menu as $k=>$v){
            $v['title'] = L($v['lang']);
            $data = App::$db->select("select * from ".table("admin_menu")." where top_id=$v[menu_id] order by menu_id asc,sort desc");
            foreach($data as $kk=>$d){
                //菜单按照权限显示
                if(!$adminData['super']){
                    if($d['edit_id']){
                        if(!$auth[$d['edit_id']]['edit']){
                            unset($data[$kk]);
                            continue;
                        }
                    }else if(!$auth[$d['menu_id']]['view']){
                        unset($data[$kk]);
                        continue;
                    }
                }
                $d['title'] = L($d['lang']);
                if($d['menu_id']==$menu_id){
                    //当前匹配的菜单
                    $title = $title?$title:$d['title'];
                    $bar = '<i class="icon-home"></i><span>'.$v['title'].'</span><i class="icon-angle-right"></i><span>'.$title.'</span>';
                    $data[$kk]['sd'] = true;
                    $menu[$k]['sd'] = true;
                }
                $data[$kk]['title'] = $d['title'];
                
            }
            $menu[$k]['title'] = $v['title'];
            $menu[$k]['child'] = $data;
            
        }
        
        if(!$bar){
            $bar = '<i class="icon-home"></i><span>'.$title.'</span>';
        }
        
        $arr = [
            'admin_menu'=>$menu,
            'admin_bar'=>$bar,
        ];
        Tp::assign($arr);
         
    }

    /**
     * 管理员添加/修改
     * @param array $data
     * @param int $id
     * @return int
     */
    public function save($data=[],$id=0)
    {
        istatic($data);
        $username = strtolower(ipost('username'));
        $name = ipost('name');
        $gid = intval(ipost('gid'));
        $super = intval(ipost('super'));
        $active = intval(ipost('active'));
        $password = ipost('password');
        $password2 = ipost('password2');
        $is_password = intval(ipost('is_password'));
        $is_webmail = intval(ipost('is_webmail'));
        istatic([]);
        
        if(!$id){
            if(strlen($username)<3 || strlen($username)>15){
                //账号格式错误
                E::error(2019);
            }
            if(!preg_match("/[a-z0-9_]+$/i",$username)) {
                E::error(2019);
            }
        }
        
        
        //修改资料时检查是否修改密码
        if(!$id || ($id && $is_password)){
            User::checkPassword($password,$password2);
        }
        
        if($id){
            $row = $this->getOne($id);
            $username = $row['username'];
            //更新数据
            $newData = [
                'name'=>$name,
                'gid'=>$gid,
                'super'=>$super,
                'is_webmail'=>$is_webmail,
                'active'=>$active
            ];
            if($is_password){
                $newData['password'] = md5($password);
            }
            App::$db->update("admin",$newData,"aid=$id");
        }else{
            //新加数据
            $date = new Date();
            if(App::$db->getOne("select aid from ".table("admin")." where username='$username'")){
                E::error(2022);
            }
            $newData = [
                'username'=>$username,
                'name'=>$name,
                'password'=>md5($password),
                'gid'=>$gid,
                'super'=>$super,
                'is_webmail'=>$is_webmail,
                'active'=>$active,
                'ctime'=>$date->format()
            ];
            $id = App::$db->insert("admin",$newData);
        }
        
        $logData = [
            'ac'=>$id?'edit':'add',
            'c'=>'管理员账号：'.$username
        ];
        AdminLog::save($logData);
        
        return $id;
    }
    
    /**
     * 更新管理员资料
     * */
    public function updateInfo($data=[])
    {
        istatic($data);
        $name = ipost('name');
        $password = ipost('password');
        $new_password = ipost('new_password');
        $new_password2 = ipost('new_password2');
        $is_password = ipost('is_password');
        istatic([]);
        
        if(md5($password)!=self::$info['password']){
            E::error(2030);
        }
        
        if($is_password){
            User::checkPassword($new_password,$new_password2);
        }
        
        $newData = [
            'name'=>$name,
            'password'=>md5($new_password)
        ];
        App::$db->update("admin",$newData,"aid=".self::$aid);
    }

    /**
     * 删除管理员
     * @param $id
     */
    public function delete($id)
    {
        $row = $this->getOne($id);
        if($row['username']=='admin'){
            E::error(2036);
        }
        $where = "aid=$id";
        App::$db->delete("admin",$where);
        $logData = [
            'ac'=>'del',
            'c'=>'管理员账号：'.$row['username']
        ];
        AdminLog::save($logData);
    }

    /**
     * 管理员登录
     */
    public function login()
    {
        $username = strtolower(ipost('username'));
        $password = ipost('password');
        $captcha = ipost('captcha');

        if(!$username){
            E::error(L(1107).L(2008));
        }
        if(!$password){
            E::error(L(1107).L(2016));
        }
        if(!$captcha){
            E::error(L(1107).L(1211));
        }

        $simpleCaptcha = new SimpleCaptcha();
        if(!$simpleCaptcha->isCode($captcha)){
            //验证码错误
            E::error(L(1211).L(1207));
        }

        $row = App::$db->getOne("select * from ".table("admin")." where username='$username'");
        if(!$row){
            E::error(2024);
        }

        if(!$row['active']){
            E::error(2041);
        }

        $this->checkLoginIp($username,0);

        if($row['password']!=md5($password)){
            $this->checkLoginIp($username,1);
            E::error(2025);
        }
        $this->checkLoginIp($username,2);

        $arr = [
            'username'=>$row['username'],
            'aid'=>$row['aid']
        ];
        Session::set("loginInfo",$arr);

        $logData = [
            'ac'=>'login',
            'c'=>'登录账号：'.$username
        ];
        AdminLog::save($logData);
    }

    /**
     * 检查登录IP，密码错误次数超出5次并禁止在一个小时内登录
     * @param $username
     * @param int $level 0：检查IP登录 1：写入登录失败次数 2：登录成功后删除缓存文件
     */
    public function checkLoginIp($username,$level=0)
    {
        $cache_dir = PATH.'/cache/login';
        $username_dir = $cache_dir.'/'.$username;
        $ip = get_client_ip();
        $file = $username_dir.'/'.$ip.'.log';

        static $data = [];
        if(!$data){
            //读取与创建缓存文件
            if(!file_exists($username_dir)){
                mkdir($username_dir);
            }
            if(!file_exists($file)){
                $data = [
                    'ip'=>$ip,
                    'num'=>0,//失败次数
                    'time'=>App::$format,//时间
                ];
            }else{
                $data = file_get_contents($file);
                $data = unserialize($data);
            }
        }


        if($level==0){
            //检查是否禁止登录，失败次数超过5次，一个小时内不能登录
            if($data['num']>=5){
                $cur_time = time();
                $date = new Date();
                $dtime = $date->parse($data['time'])-3600;
                if($dtime<$cur_time){
                    $logData = [
                        'ac'=>'login',
                        'c'=>'登录失败次数超过5次，禁止该IP一个小时内登录该账号：'.$username
                    ];
                    AdminLog::save($logData);
                    E::error(2042);
                }
            }
        }elseif($level==1){
            //统计登录失败次数
            $data['num']++;
            $data['time'] = App::$format;
            $data = serialize($data);
            file_put_contents($file,$data);
        }elseif($level==2){
            //登录成功，删除文件
            @unlink($file);
        }
    }
}
?>
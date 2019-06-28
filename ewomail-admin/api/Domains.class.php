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
 * 邮件域名操作类
 * Class Domains
 */
class Domains extends App
{
    /**
     * 获取一条数据
     * @param $id
     * @return mixed
     */
    public function getOne($id)
    {
        $id = intval($id);
        $data = App::$db->getOne("select * from ".table('domains')." where id=".$id);
        if(!$data){
            E::error(1005);
        }
        return $data;
    }

    /**
     * 添加/修改
     * @param array $data
     * @param int $id
     */
    public function save($data=[],$id=0)
    {
        istatic($data);
        $name = strtolower(ipost('name'));
        $active = intval(ipost('active'));
        $s_num = intval(ipost('s_num'));
        $c_num = intval(ipost('c_num'));
        $c_ip = intval(ipost('c_ip'));
        $g = intval(ipost('g'));
        $g_boundary = intval(ipost('g_boundary'));
        istatic([]);
        
        if($id){
            $row = App::$db->getOne("select * from ".table("domains")." where id=$id");
            if(!$row) E::error(1005);
            $name = $row['name'];
            $newData = [
                'active'=>$active,
                's_num'=>$s_num,
                'c_num'=>$c_num,
                'c_ip'=>$c_ip,
                'g_boundary'=>$g_boundary,
                'g'=>$g
            ];
            App::$db->update("domains",$newData,"id=$id");
        }else{
            
            if(!check_domain($name)){
                E::error(3010);
            }
            
            if(App::$db->count("select count(id) from ".table("domains")." where name='$name'")){
                E::error(3011);
            }
            
            $newData = [
                'name'=>$name,
                'active'=>$active,
                's_num'=>$s_num,
                'c_num'=>$c_num,
                'c_ip'=>$c_ip,
                'g'=>$g,
                'g_boundary'=>$g_boundary,
                'ctime'=>App::$format
            ];
            
            $r = App::$db->insert('domains',$newData);
        }
        
        $logData = [
            'ac'=>$id?'edit':'add',
            'c'=>'邮件域名：'.$name
        ];
        AdminLog::save($logData);
        
    }

    /**
     * 删除
     * @param $id
     */
    public function delete($id)
    {
        $row = $this->getOne($id);
        $where = "id=$id";
        App::$db->delete("domains",$where);

        $logData = [
            'ac'=>'del',
            'c'=>'邮件域名：'.$row['name']
        ];
        AdminLog::save($logData);
    }
    
}
?>
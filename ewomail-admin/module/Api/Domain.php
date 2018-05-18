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
if(!defined("PATH")) exit;

/**
 * 获取域名数据
 */
Rout::get('get',function(){
    $domain = iany('domain');
    if(!$domain){
        E::error('Missing domain parameter');
    }
    $row = App::$db->getOne("select * from ".table("domains")." where name='$domain' and active=1");
    if(!$row){
        E::error('Data does not exist');
    }
    
    $row['imap'] = MailConfig::get('imap');
    $row['smtp'] = MailConfig::get('smtp');
    
    E::success('','',$row);
});

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
 * Api运行中心
 */
if(!defined("PATH")) exit;
//必须需要的标识
define('IS_API',true);

Rout::init(function(){
    App::init();
    $key = iany('_key');
    if($key!=C('code_key')){
        E::error('Communication key error');
    }
});


// +----------------------------------------------------------------------
// | EwoMail
// +----------------------------------------------------------------------
// | Copyright (c) 2016 http://ewomail.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://ewomail.com/license.html)
// +----------------------------------------------------------------------
// | Author: Jun <gyxuehu@163.com>
// +----------------------------------------------------------------------

//ajax全局配置
$.ajaxSetup({
  timeout : 5000, //超时,
  complete :function(XMLHttpRequest,status){
        if(status=='timeout'){
            layer.closeAll();
            msg($L[1001]);
        }
  },
  cache:false
});


$(function(){
    
    layer.config({
      title: $L[1011]
    });
	
	if(!$(".main-left-list > li").hasClass("active")){
		$(".main-left-list > li:first").addClass("active")
	}
    
    $(".main-left-list > li").each(function(){
        var active = $(this).hasClass("active");
        var icon = '';
        if(active){
            //已选中的的对象
            icon = '<span class="selected"></span><span class="icon icon-angle-down"></span>';
            $(this).find(" > a").append(icon);
            $(this).find(" > a").attr("status","open");
            $(this).find(".main-left-menu").show();
        }else{
            icon = '<span class="icon icon-angle-left"></span>';
            $(this).find(" > a").append(icon);
            $(this).find(" > a").attr("status","close");
        }
    })
    
    $(".main-left-list > li > a").click(function(){
        var status = $(this).attr("status");
        if(status=='open'){
            return false;
        }
        
        //关闭的对象
        var openObj = $(".main-left-list > li > a[status='open']");
        openObj.find(".icon").removeClass('icon-angle-down').addClass('icon-angle-left');
        openObj.parent().find(".main-left-menu").hide();
        openObj.attr("status","close");
        openObj.removeClass("hover");
        
        //打开的对象
        $(this).find(".icon").removeClass('icon-angle-left').addClass('icon-angle-down');
        $(this).attr("status","open");
        $(this).parent().find(".main-left-menu").show();
        $(this).addClass("hover");
        
        return false;
    });
})

function read(obj)
{
    if(typeof(obj)=="object"){
		return obj.msg;
	}else{
	   return obj;
	}
}

/**
 * 弹窗信息
 * @param content
 */
function msg(content)
{
    layer.msg(content);
}

//确认是否继续操作
function doConfirm(msg,fun){
	layer.confirm(msg, {btn: [$L[1010],$L[1012]]},function(index){
	  fun();
	  layer.close(index);
	});
}

//checkbox表单全选或反选
function checkboxAll(curid,toid)
{
    if($(curid).prop("checked")){
		$(toid).prop("checked","checked");
	}else{
		$(toid).prop("checked","");
	}
}

/**
 * 检查是否选中
 * @param boxid
 * @returns {boolean}
 */
function checkSd(boxid)
{
    if(!$(boxid).is(":checked")){
        msg($L[1002]);
        return false;
    }
    return true;
}

//批量删除数据
function delData(id,boxid)
{
    doConfirm($L[1003],function(){
        if(!$(boxid).is(":checked")){
            msg($L[1004]);
            return false;
        }
        var method = $(id).find("input[name='_method']");
        if(method.length==0){
            $(id).append('<input type="hidden" name="_method" />');
            method = $(id).find("input[name='_method']");
        }
        method.val('delete');
        ajaxPost($(id).attr("action"), $(id).serialize());
    })
    
    return false;
}


//删除单条数据
function delOne(url)
{
    doConfirm($L[1005],function(){
        var data = [{
            name:'_method',
            value:'delete'
        }]
        ajaxPost(url, data);
    })
    
    return false;
}

//ajax提交数据
function ajaxPost(url,data,fun)
{
    var ii = layer.load();
    $.post(url,data,function(d){
        layer.close(ii);
		json = d;
        var html;
        var time = 0;
		if(json.status==undefined){
            html = '<div style="text-align:center;padding:20px;min-width:300px;"><font color="#FF0000">'+$L[1006]+'</font></div>';
		}else if(json.status==0){
            html = '<div style="text-align:center;padding:20px;min-width:300px;">'+$L[1007]+json.msg+'<br><font color="#FF0000">('+$L[1008]+')</font></div>';
            time = 5000;
        }else if(json.status==-100){
            html = '<div style="text-align:center;padding:20px;min-width:300px;">'+json.msg+'</div>';
        }else{
            html = '<div style="text-align:center;padding:20px;min-width:300px;">'+json.msg+'<br><font color="#FF0000">('+$L[1009]+')</font></div>';
			
            time = 2000;
        }
        
        layer.open({
            type: 1,
            id:"_tishi",
            area: ['auto'],
            shadeClose: true,
            time:time,
            btn: [$L[1010]],
            yes:function(index){
                layer.close(index);
            }, 
            end:function(){
                if(fun){
                    fun(json);
                    return ;
                } 
                if(json.status==undefined) return ;
                if(json.status==-100) return ;
    			if(json.url!=''){
    				//获取服务器返回的url并且跳转
    				window.location.href=json.url;
    			}else{
    				//跳转url不存在就检查是否成功状态，如果成功就刷新当前页面
    				if(json.status==1){
    					window.location.reload();
    				}
    			}
            },
            content:html
        });
		
	});
}

//提交数据，自动从form获取数据和url提交
$.fn.putData = function(fun){
    var $this = this;
    $($this).ajaxSubmit(function() {
		if(typeof fun == 'function'){
	       if(fun()==false){
	           return false;
	       }
	    }
		ajaxPost($($this).attr("action"), $($this).serialize());
	});
}

//弹窗层分页加载
$.fn.ajaxPage = function(){
    var $this = this;
    $(this).find(".page a").click(function(){
        var url = $(this).attr("href");
        var ii = layer.load();
        $.get(url,function(html){
            var html = read(html);
			var main = $($this).curLayer();
            main.html(html);
            layer.close(ii);
		})
        return false;
    })
    
}

//弹窗层表单查询
$.fn.ajaxQuery = function(){
    $(this).submit(function(){
        var $this = this;
        var ii = layer.load();
        var url = $(this).attr("action");
        $.get(url,$(this).serialize(),function(html){
            var html = read(html);
            var main = $($this).curLayer();
            main.html(html);
            layer.close(ii); 
        });
        return false;
    })
}

//获取当前弹出层的对象
$.fn.curLayer = function(){
    return $(this).closest(".layui-layer-content");
}
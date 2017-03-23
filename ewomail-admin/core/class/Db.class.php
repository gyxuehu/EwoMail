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
 * 数据库操作类
 * Class Db
 */
class Db
{
	protected $pdo;

    // PDO操作实例
    protected $PDOStatement = null;
    // 当前SQL指令
    protected $queryStr   = '';

    // 返回或者影响记录数
    protected $numRows    = 0;

    // 错误信息
    protected $error      = '';

    // 查询次数
    protected $queryTimes   =   0;
    
    //事务检查
    public $trans = false;


    // PDO连接参数
    protected $options = array(
        PDO::ATTR_CASE              =>  PDO::CASE_LOWER,
        PDO::ATTR_ERRMODE           =>  PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_ORACLE_NULLS      =>  PDO::NULL_NATURAL,
        PDO::ATTR_STRINGIFY_FETCHES =>  false,
    );

	/**
	 * 数据库链接
	 * @param $dbhost 链接地址
	 * @param $dbuser 用户账号
	 * @param $dbpw 用户名
	 * @param $dbname 密码
	 * @param $charset 编码
	 */
	public function connect($dbhost, $dbuser, $dbpw, $dbname = '', $charset = '')
	{
        $dsn = "mysql:dbname=$dbname;host=$dbhost";
        
        try {
            $this->pdo = new PDO($dsn, $dbuser, $dbpw,$this->options);
            $this->execute('SET NAMES '.$charset);
        } catch (PDOException $e) {
            $this->error = 'Connection failed: ' . $e->getMessage();
            E::sys($this->error);
            return false;
        }
		return $this->pdo;
	}

    /**
     * INSERT\UPDATE\DELETE
     * @param $sql
     * @return mixed
     */
    public function execute($sql )
    {
        try {
            return $this->pdo->exec($sql);
        } catch (PDOException $e) {
            $this->error = 'Connection failed: ' . $e->getMessage();
            $this->error .= "($sql)";
            E::sys($this->error);
            return false;
        }
    }

    /**
     * 释放查询结果
     * @access public
     */
    public function free() {
        $this->PDOStatement = null;
    }

    /**
     * 查询方式
     * @param $sql
     * @param $type 0：单条数据，1：多条数据，2：上次影响的行数
     * @return array
     */
    protected function _fetch($sql, $type) {
        $result = array ();
        $query = $this->query($sql);
        if(!$query){
            return $result;
        }
        $this->PDOStatement->setFetchMode(PDO::FETCH_ASSOC);
        switch ($type) {
            case '0' :
                $result = $this->PDOStatement->fetch();
                break;
            case '1' :
                $result = $this->PDOStatement->fetchAll ();
                break;
            case '2' :
                $result = $this->PDOStatement->rowCount();
                break;
            case '3' :
                $result = $this->PDOStatement->fetchColumn();
                break;
        }
        $this->free();
        return $result;
    }

    /**
     * 查询记录
     * @param $str
     * @return bool
     */
	public function query($str)
	{
        $this->queryStr     =   $str;
        //释放前次的查询结果
        if ( !empty($this->PDOStatement) ) $this->free();
        $this->queryTimes++;
        $this->PDOStatement = $this->pdo->prepare($str);
        try {
            $result = $this->PDOStatement->execute();
            return $result;
        } catch (PDOException $e) {
            $this->error = 'Connection failed: ' . $e->getMessage();
            $this->error .= "($str)";
            E::sys($this->error);
            return false;
        }
	}

    /**
     * 获取单条数据
     * @param $sql
     * @param bool $lock 启用事务后可以用该参数设为事务锁
     * @return array
     */
    public function getOne($sql,$lock=false)
    {
        if($lock){
            $sql .= ' for update';
        }
        return $this->_fetch($sql,0);
    }

    /**
     * 获取多条数据
     * @param $sql
     * @return array
     */
	function select($sql)
	{
        return $this->_fetch($sql,1);
	}

    /**
     * 获取统计数据
     * @param $sql
     * @return array
     */
    function count($sql)
    {
        return $this->_fetch($sql,3);
    }

    /**
     * 插入数据
     * @param $tablename
     * @param $array
     * @return int
     */
	function insert($tablename, $array)
	{
	    $tablename = table($tablename);
        $r = $this->execute("INSERT INTO `$tablename`(`".implode('`,`', array_keys($array))."`) VALUES('".implode("','", $array)."')");
		if($r){
            return $this->pdo->lastInsertId();
        }else{
            return false;
        }
	}

    /**
     * 更新数据
     * @param $tablename
     * @param $array
     * @param string $where
     * @return mixed
     */
	function update($tablename, $array, $where = '')
	{
	    $tablename = table($tablename);
	    //$array = $this->escape($array);
        $sql = '';
		foreach($array as $k=>$v)
		{
			$sql .= ", `$k`='$v'";
		}
		$sql = substr($sql, 1);
        if($where){
            $sql = "UPDATE `$tablename` SET $sql WHERE $where";
        }else{
            $sql = "UPDATE `$tablename` SET $sql";
        }
		
        /*
		if($where)
		{
			$sql = '';
			foreach($array as $k=>$v)
			{
				$sql .= ", `$k`='$v'";
			}
			$sql = substr($sql, 1);
			$sql = "UPDATE `$tablename` SET $sql WHERE $where";
		}*/
        /*
		else
		{
			$sql = "REPLACE INTO `$tablename`(`".implode('`,`', array_keys($array))."`) VALUES('".implode("','", $array)."')";
		}
        */
		return $this->execute($sql);
	}

    /**
     * 删除数据
     * @param $tablename
     * @param $where
     * @return mixed
     */
    public function delete($tablename,$where){
        $tablename = table($tablename);
        $sql = "DELETE FROM $tablename WHERE $where";
        return $this->execute($sql);
    }

    /**
     * 启动事务
     */
    public function startTrans() {
        $this->pdo->beginTransaction();
        $this->trans = true;
    }

    /**
     * 用于非自动提交状态下面的查询提交
     */
    public function commit() {
       $this->pdo->commit();
       $this->trans = false;
    }

    /**
     * 事务回滚
     */
    public function rollback() {
        $this->pdo->rollback();
        $this->trans = false;
    }
    
    /**
     * 检查事务是否开启
     * */
    public function isTrans()
    {
        if(!$this->trans){
            E::sys("请开启事务");
        }
    }

    /**
     * 关闭数据库
     */
	function close()
	{
		$this->pdo = null;
	}
}
?>
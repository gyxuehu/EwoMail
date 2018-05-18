/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50540
Source Host           : 127.0.0.1:3306
Source Database       : ewomail

Target Server Type    : MYSQL
Target Server Version : 50540
File Encoding         : 65001

Date: 2017-03-03 16:04:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for i_admin
-- ----------------------------
DROP TABLE IF EXISTS `i_admin`;
CREATE TABLE `i_admin` (
  `aid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL COMMENT '账号',
  `password` varchar(32) NOT NULL COMMENT '密码',
  `name` varchar(30) NOT NULL COMMENT '真实名称',
  `super` int(1) NOT NULL DEFAULT '0' COMMENT '是否为超级管理员',
  `gid` int(11) NOT NULL DEFAULT '0' COMMENT '管理组id',
  `active` int(1) NOT NULL DEFAULT '1' COMMENT '是否正常：1是，0否',
  `is_webmail` int(1) NOT NULL DEFAULT '0' COMMENT '是否有web控制面板权限：0否：1是',
  `ctime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`aid`),
  UNIQUE KEY `username` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='管理员账号';

-- ----------------------------
-- Records of i_admin
-- ----------------------------
INSERT INTO `i_admin` VALUES ('1', 'admin', '3bb3733de472b226208307ec1e689347', 'admin', '1', '0', '1', '1', '2016-03-25 21:45:46');

-- ----------------------------
-- Table structure for i_admin_group
-- ----------------------------
DROP TABLE IF EXISTS `i_admin_group`;
CREATE TABLE `i_admin_group` (
  `gid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL COMMENT '标题',
  `auth` text,
  PRIMARY KEY (`gid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='管理组';

-- ----------------------------
-- Records of i_admin_group
-- ----------------------------
INSERT INTO `i_admin_group` VALUES ('8', '客服', 'a:7:{i:101;a:3:{s:4:\"view\";s:1:\"1\";s:4:\"edit\";s:1:\"1\";s:7:\"menu_id\";s:3:\"101\";}i:103;a:2:{s:4:\"view\";s:1:\"1\";s:7:\"menu_id\";s:3:\"103\";}i:105;a:2:{s:4:\"view\";s:1:\"1\";s:7:\"menu_id\";s:3:\"105\";}i:201;a:2:{s:4:\"view\";s:1:\"1\";s:7:\"menu_id\";s:3:\"201\";}i:203;a:2:{s:4:\"view\";s:1:\"1\";s:7:\"menu_id\";s:3:\"203\";}i:205;a:2:{s:4:\"view\";s:1:\"1\";s:7:\"menu_id\";s:3:\"205\";}i:206;a:2:{s:4:\"view\";s:1:\"1\";s:7:\"menu_id\";s:3:\"206\";}}');

-- ----------------------------
-- Table structure for i_admin_log
-- ----------------------------
DROP TABLE IF EXISTS `i_admin_log`;
CREATE TABLE `i_admin_log` (
  `log_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL COMMENT '管理员账号',
  `ip` varchar(255) NOT NULL,
  `explain` text COMMENT '说明',
  `ctime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`log_id`),
  KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=207 DEFAULT CHARSET=utf8 COMMENT='管理员操作日志';

-- ----------------------------
-- Records of i_admin_log
-- ----------------------------

-- ----------------------------
-- Table structure for i_admin_menu
-- ----------------------------
DROP TABLE IF EXISTS `i_admin_menu`;
CREATE TABLE `i_admin_menu` (
  `menu_id` int(11) NOT NULL,
  `mark` varchar(30) NOT NULL DEFAULT '' COMMENT '备注',
  `lang` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL DEFAULT '',
  `top_id` int(11) NOT NULL DEFAULT '0' COMMENT '上级id',
  `edit` int(1) NOT NULL DEFAULT '0' COMMENT '添加和编辑权限',
  `del` int(1) NOT NULL DEFAULT '0' COMMENT '删除权限',
  `edit_id` int(11) NOT NULL DEFAULT '0' COMMENT '关联编辑id',
  `sort` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  PRIMARY KEY (`menu_id`),
  KEY `top_id` (`top_id`) USING BTREE,
  KEY `edit_id` (`edit_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='后台菜单栏目';

-- ----------------------------
-- Records of i_admin_menu
-- ----------------------------
INSERT INTO `i_admin_menu` VALUES ('100', '邮件管理', '90100', '', '0', '0', '0', '0', '0');
INSERT INTO `i_admin_menu` VALUES ('101', '邮件列表', '90101', '/Users', '100', '1', '1', '0', '0');
INSERT INTO `i_admin_menu` VALUES ('102', '邮件添加', '90102', '/Users/edit', '100', '0', '0', '101', '0');
INSERT INTO `i_admin_menu` VALUES ('103', '邮件域名', '90103', '/Domain', '100', '1', '1', '0', '0');
INSERT INTO `i_admin_menu` VALUES ('105', '邮件系统设置', '90105', '/Users/config', '100', '1', '0', '0', '0');
INSERT INTO `i_admin_menu` VALUES ('200', '系统管理', '90200', '', '0', '0', '0', '0', '0');
INSERT INTO `i_admin_menu` VALUES ('201', '管理员列表', '90201', '/Admin', '200', '1', '1', '0', '0');
INSERT INTO `i_admin_menu` VALUES ('202', '管理员添加', '90202', '/Admin/edit', '200', '0', '0', '201', '0');
INSERT INTO `i_admin_menu` VALUES ('203', '角色列表', '90203', '/Group', '200', '1', '1', '0', '0');
INSERT INTO `i_admin_menu` VALUES ('204', '角色添加', '90204', '/Group/edit', '200', '0', '0', '203', '0');
INSERT INTO `i_admin_menu` VALUES ('205', '系统设置', '90205', '/System/config', '200', '1', '0', '0', '0');
INSERT INTO `i_admin_menu` VALUES ('206', '操作日志', '90206', '/Log', '200', '0', '1', '0', '0');

-- ----------------------------
-- Table structure for i_aliases
-- ----------------------------
DROP TABLE IF EXISTS `i_aliases`;
CREATE TABLE `i_aliases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source` varchar(100) NOT NULL,
  `destination` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `source` (`source`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='邮箱别名转发';

-- ----------------------------
-- Records of i_aliases
-- ----------------------------

-- ----------------------------
-- Table structure for i_bcc_user
-- ----------------------------
DROP TABLE IF EXISTS `i_bcc_user`;
CREATE TABLE `i_bcc_user` (
  `source` varchar(255) NOT NULL COMMENT '接收邮件的email',
  `to_email` varchar(255) NOT NULL COMMENT '目标用户的邮件',
  KEY `source` (`source`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='邮件转发';

-- ----------------------------
-- Records of i_bcc_user
-- ----------------------------

-- ----------------------------
-- Table structure for i_domains
-- ----------------------------
DROP TABLE IF EXISTS `i_domains`;
CREATE TABLE `i_domains` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `active` int(1) NOT NULL DEFAULT '0',
  `s_num` int(11) NOT NULL DEFAULT '0' COMMENT '邮件每天的发送量，0不受限制',
  `c_num` int(11) NOT NULL DEFAULT '0' COMMENT '邮件每天的接收量，0不受限制',
  `c_ip` int(11) NOT NULL DEFAULT '0' COMMENT '限制IP每天发送到邮件的数量，0不受限制',
  `g` int(11) NOT NULL DEFAULT '0' COMMENT '容量限制，单位G',
  `g_boundary` int(11) NOT NULL DEFAULT '0' COMMENT '容量达到边界发送通知(百分比)',
  `ctime` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`) USING BTREE,
  KEY `active` (`active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of i_domains
-- ----------------------------

-- ----------------------------
-- Table structure for i_mail_config
-- ----------------------------
DROP TABLE IF EXISTS `i_mail_config`;
CREATE TABLE `i_mail_config` (
  `name` varchar(255) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  UNIQUE KEY `key` (`name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of i_mail_config
-- ----------------------------
INSERT INTO `i_mail_config` VALUES ('imap', 'imap.ewomail.cn');
INSERT INTO `i_mail_config` VALUES ('mydomain', 'ewomail.cn');
INSERT INTO `i_mail_config` VALUES ('myhostname', 'mail.ewomail.cn');
INSERT INTO `i_mail_config` VALUES ('smtp', 'smtp.ewomail.cn');

-- ----------------------------
-- Table structure for i_quota
-- ----------------------------
DROP TABLE IF EXISTS `i_quota`;
CREATE TABLE `i_quota` (
  `email` varchar(100) NOT NULL,
  `bytes` bigint(20) NOT NULL DEFAULT '0',
  `messages` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`email`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of i_quota
-- ----------------------------

-- ----------------------------
-- Table structure for i_system_config
-- ----------------------------
DROP TABLE IF EXISTS `i_system_config`;
CREATE TABLE `i_system_config` (
  `name` varchar(255) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统配置表';

-- ----------------------------
-- Records of i_system_config
-- ----------------------------
INSERT INTO `i_system_config` VALUES ('copyright', 'Copyright © 2016-2017 | ewomail.com 版权所有');
INSERT INTO `i_system_config` VALUES ('icp', 'ICP证：粤ICP备**********号');
INSERT INTO `i_system_config` VALUES ('lang', 'zh-cn');
INSERT INTO `i_system_config` VALUES ('title', 'ewomail.com');

-- ----------------------------
-- Table structure for i_users
-- ----------------------------
DROP TABLE IF EXISTS `i_users`;
CREATE TABLE `i_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `domain_id` int(11) NOT NULL,
  `password` varchar(106) NOT NULL,
  `email` varchar(100) NOT NULL,
  `maildir` varchar(255) NOT NULL,
  `uname` varchar(255) DEFAULT NULL COMMENT '姓名',
  `tel` varchar(255) DEFAULT NULL COMMENT '联系电话',
  `active` int(1) NOT NULL DEFAULT '1' COMMENT '是否正常：1是，0否',
  `limits` int(1) NOT NULL DEFAULT '1' COMMENT '收发限制',
  `limitg` int(1) NOT NULL DEFAULT '1' COMMENT '容量限制',
  `ctime` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`) USING BTREE,
  KEY `domain_id` (`domain_id`) USING BTREE,
  KEY `active` (`active`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='邮箱用户表';

-- ----------------------------
-- Records of i_users
-- ----------------------------

/*
 Navicat Premium Data Transfer

 Source Server         : git-config
 Source Server Type    : MySQL
 Source Server Version : 80019
 Source Host           : localhost:3306
 Source Schema         : koa2

 Target Server Type    : MySQL
 Target Server Version : 80019
 File Encoding         : 65001

 Date: 08/05/2022 14:34:34
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `zh` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `mm` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '123456', '123456', '用户1');
INSERT INTO `user` VALUES (2, '123', '456', '用户2');
INSERT INTO `user` VALUES (3, '1111', '111', '用户11');
INSERT INTO `user` VALUES (4, '110011', '110011', '用户A');
INSERT INTO `user` VALUES (5, '110011', '110011', '用户A');
INSERT INTO `user` VALUES (6, '666', '666', '用户6');
INSERT INTO `user` VALUES (7, 'add', 'add', 'add');
INSERT INTO `user` VALUES (179, '核酸', '核酸', '核酸');

SET FOREIGN_KEY_CHECKS = 1;

import bcrypt from "bcryptjs";
import db from "../models/index";

var salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPasswords(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        // image: data.image,
        roleId: data.roleId,
        // positionID: DataTypes.STRING,
      });
      resolve("ok create new user success!!");
    } catch (e) {
      reject(e);
    }
  });
};
let hashUserPasswords = (password) => {
  return new Promise(async (resolve, reject) => {
    // var bcrypt = require("bcryptjs");
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({
        raw: true,//show data chuẩn
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
};

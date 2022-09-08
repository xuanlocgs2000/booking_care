import db from "../models/index";
import CRUDService from "../services/CRUDSevice";
let getHomePage = async (req, res) => {
  // return res.send("Hello linh from controller");
  try {
    let data = await db.User.findAll();
    // console.log("----------------------------------------------------");
    // console.log(data);
    // console.log("----------------------------------------------------");
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};
let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};
let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};
let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  console.log(message);
  return res.send("POST");
};
module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
};

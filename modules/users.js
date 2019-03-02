// load user model
const User = require("../models/user");

module.exports.loadUser = async function loadUser(userId) {
  try {
    const foundUser = await User.findById(userId).exec();
    return {
      success: true,
      user: foundUser,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error loading user",
    };
  }
};

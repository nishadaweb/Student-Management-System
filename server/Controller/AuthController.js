const User = require("../Model/userModel");
const bcrypt = require("bcrypt");
//Register a new user
const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  console.log(req.body, "register");
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPassword;
  const newUser = new User(req.body);

  const { name, email } = req.body;
  try {
    // addition new
    const oldUser = await User.findOne({ name, email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    //saving newuser
    const user = await newUser.save();
    console.log(user, "registerd user");

    res.status(200).json({
      user,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    console.log(user, "userrrrrr");
    if (user) {
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        res.status(400).json("Invalid credential");
      } else {
        req.session.user = user;
        res.status(200).json({
          user,
          status: true,
        });
      }
    } else {
      console.log("user does not exist");
      res.status(404).json("User doesnot exist");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { registerUser, loginUser };

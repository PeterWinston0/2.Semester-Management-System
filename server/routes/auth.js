const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { registerValidation, loginValidation } = require("../validation");
const { application } = require("express");

// /registration
router.post("/register", async (req, res) => {
  //validate the user input (name, email, password)
  const { error } = registerValidation(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  //check if the email is already registered
  const emailExist = await User.findOne({ email: req.body.email });

  if (emailExist) {
    return res.status(400).json({ error: "Email already exists" });
  }

  //hash the password
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  //create a user object and in the db
  const userObject = new User({
    name: req.body.name,
    email: req.body.email,
    password,
  });

  try {
    const savedUser = await userObject.save();
    res.json({ error: null, data: savedUser._id });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// /login
router.post("/login", async (req, res) => {
  // validate user login info
  const { error } = loginValidation(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    // find the user by email
    const user = await User.findOne({ email: req.body.email });

    // throw an error if the email is wrong
    if (!user) {
      return res.status(400).json({ error: "Email is wrong" });
    }

    // check for password correctness
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // throw an error if the password is wrong
    if (!validPassword) {
      return res.status(400).json({ error: "Password is wrong" });
    }

    // create authentication token with username and id
    const token = jwt.sign(
      {
        name: user.name,
        id: user._id,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // send the authentication token as a response header
    res.header("auth-token", token).json({
      error: null,
      data: { token },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to fetch all user names
router.get("/find", async (req, res) => {
  try {
    const users = await User.find({}, "name"); // Fetch only the "name" field
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user names" });
  }
});

module.exports = router;

const router = require("express").Router();
const User = require("../models/User.js");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { wordList } = require("../utils/wordlist");
const { generateMnemonic } = require("bip39");
const { check, validationResult } = require('express-validator');
const generateEntropy = require("../utils/helpers.js")
const createWallet = require("../utils/wallet.js");


const sanitizeInputs = [
  check('email', 'Your email is not valid').isEmail().trim().escape().normalizeEmail(),
  check('firstName').isLength({ min: 2 }).trim().escape().withMessage('First name must have more than 2 characters'),
  check('lastName').isLength({ min: 2 }).trim().escape().withMessage('Last name must have more than 2 characters'),
  check('username').isLength({ min: 2 }).trim().escape().withMessage('Username must have more than 2 characters'),
  check('password').isLength({ min: 6 }).trim().escape().withMessage('Last name must have more than 6 characters'),
];

// REGISTER
router.post("/register", sanitizeInputs, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400);
  }
  let entropy = generateEntropy(16);
  const secureEntropy = CryptoJS.AES.encrypt(entropy, process.env.ENTROPY_SEC).toString();

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    wallet: createWallet(
      generateMnemonic(undefined, undefined, wordList),
      secureEntropy,
    ),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    entropy: secureEntropy,
  });

    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch(err) {
      console.log(err);
      res.status(500).json(err);
    }
})

const sanitizeLogin = [
  check('username').isLength({ min: 2 }).trim().escape(),
  check('password').isLength({ min: 6 }).trim().escape(),
];

// LOGIN
router.post("/login", sanitizeLogin, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400);
  }

  try {
    const user = await User.findOne({ username: req.body.username.toLowerCase() });
    if (!user) {
      return res.status(401).json("No user by that name found.");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password, 
      process.env.PASS_SEC
    )

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (originalPassword != req.body.password) {
      return res.status(401).json("Incorrect password.")
    }

    const accessToken = jwt.sign({
      id: user._id, 
      isAdmin: user.roles.isAdmin
    }, 
    process.env.JWT_SEC, 
    { expiresIn: "3d" }
    );

    // Removes password and other sensitive data from client response
    const { password, entropy, ...others } = user._doc; // Mongo stores docs (user) in _doc
    res.status(200).json({ ...others, accessToken });

  } catch(err) {
    res.status(500).send(err);
  }
})

// VERIFY
router.post("/verify", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.user.toLowerCase() });
    if (!user) {
      return res.status(401).json("No user by that name found.");
    }
    
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password, 
      process.env.PASS_SEC
    )

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (originalPassword != req.body.password) {
      return res.status(401).json("Incorrect password.")
    }

    const { entropy } = user._doc;
    res.status(200).json(entropy);

  } catch(err) {
    res.status(500).send(err);
  }
})
module.exports = router;
const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password,  phoneNumber, firstName, lastName, streetAddress, streetAddress2, city, state, zipcode, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({  email, password,  phoneNumber, firstName, lastName, streetAddress, streetAddress2, city, state, zipcode, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
    res.status(501).json({ message: "Server error" });
  }
};  
module.exports.EditAccount = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "User not found" });
        }
        res.status(200).json({ message: "User information retrieved successfully", user });
        next();
    } catch (error) {
      res.status(501).json({ message: "Server error" });
    }
};

module.exports.UpdateAccount = async (req, res, next) => {
    try {
        const { email, firstName, lastName, phoneNumber, streetAddress, streetAddress2, city, state, zipcode, userId, password } = req.body;
        
        console.log("Update account userID" + userId);
        console.log("EMailLLL: " + email);
        const id = new mongoose.Types.ObjectId(userId);
        const user = await User.findById(id);
  
      if (!user) {
        return res.json({ message: "User not found" });
      }
  
      user.firstName = firstName;
      user.lastName = lastName;
      user.phoneNumber = phoneNumber;
      user.streetAddress = streetAddress;
      user.streetAddress2 = streetAddress2;
      user.city = city;
      user.state = state;
      user.zipcode = zipcode;  
      user.email = email;
  
      await user.save();

      const userData = user.toObject();
      delete userData.password;
      res.status(200).json({ message: "User information updated successfully", success: true, user: userData });
      next();
    } catch (error) {
      res.status(501).json({ message: "Server error" });
    }
  };

  module.exports.GetCurrentUser = async (req, res) => {
    try {
      const user = await User.findById(req.userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ user: user.toObject() });
    } catch (error) {
      console.error(error);
      res.status(501).json({ message: "Server error" });
    }
  };

module.exports.Login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if(!email || !password ){
        return res.json({message:'All fields are required'})
      }
      const user = await User.findOne({ email });
      if(!user){
        return res.json({message:'Incorrect password or email' }) 
      }
      const auth = await bcrypt.compare(password,user.password)
      if (!auth) {
        return res.json({message:'Incorrect password or email' }) 
      }
       const token = createSecretToken(user._id);
       res.cookie("token", token, {
         withCredentials: true,
         httpOnly: false,
       });
       
       res.status(201).json({ message: "User logged in successfully", success: true, user});
       next()
    } catch (error) {
      res.status(501).json({ message: "Server error" });
    }
  }
const User = require('../models/user.models.js')
const bcryptjs=require('bcryptjs');
const generateTokenAndSetCookie = require('../utils/generateToken.js');
async function signup(req,res) {
   try {
     const {username,email,password}=req.body;
     if (!username || !password || !email) {
        return res.status(400).json({ message:"all fields are required"})
     }
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(email)) {
         return res.status(400).json({ message:"invalid"})
     }
     if (password.length < 6) {
        return res.status(400).json({ message:"password most be at least 6 charecters"})
     }
     const existingUserByEmail = await User.findOne({ email: email });
     if (existingUserByEmail) {
        return res.status(400).json({message:"email already exists"})
    }
    const existingUserByUsername = await User.findOne({ username: username });
    if (existingUserByUsername) {
        return res.status(400).json({message:"username already exists"})
    }
    const salt = await bcryptjs.genSalt(10)
    const hashpassword=await bcryptjs.hash(password,salt)

    
    const PROFILE_PICS=["/avatar1.png","/avatar2.png","/avatar3.png"];
 
    const image= PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

  const newuser= new User({
    username,
    email,
    password:hashpassword,
    image,
  })
 
    generateTokenAndSetCookie(newuser._id,res);
    await newuser.save()
     
    res.status(200).json({user:{
        ...newuser._doc,
        password:""
       }})
  

      
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"internal server error"})
   }
}

async function login(req,res) {
    try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ success: false, message: "All fields are required" });
		}
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.status(404).json({ success: false, message: "Invalid credentials" });
		}
		const isPasswordCorrect = await bcryptjs.compare(password, user.password);
		if (!isPasswordCorrect) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}
		generateTokenAndSetCookie(user._id, res);
		res.status(200).json({
			success: true,
			user: {
				...user._doc,
				password: "",
			},
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}
async function logout(req,res) {
    try {
		res.clearCookie("jwt-netflix");
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ message: "Internal server error" });
	}
}

module.exports={
    signup,
    login,
    logout
}
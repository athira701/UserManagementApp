import { Request, Response } from "express";
import User from "../model/userSchema";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await argon2.hash(password);

    const newUser = new User({ name, email, password: hashedPassword });
    console.log("New User:",newUser);
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

   const token = jwt.sign(
  { id: user._id, email: user.email },
  process.env.JWT_SECRET!, 
  { expiresIn: "1h" }
);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const uploadProfileImage = async (req: Request, res: Response) => {
  try {
    console.log("=== UPLOAD STARTED ===");
    console.log("Request body:", JSON.stringify(req.body));
    console.log("Request file:", JSON.stringify(req.file));
    
    const { email } = req.body;

    if (!email) {
      console.log("No email provided");
      return res.status(400).json({ message: "Email is required" });
    }

    if (!req.file) {
      console.log("No file uploaded");
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("File uploaded to Cloudinary:", req.file.path);
    const imageUrl = req.file.path;

    console.log("Finding user with email:", email);
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { profileImage: imageUrl },
      { new: true }
    );

    if (!updatedUser) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User updated successfully");

    res.status(200).json({
      message: "Profile image uploaded successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("ERROR uploading profile image:", error);
    res.status(500).json({ 
      message: "Failed to upload profile image",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};



  const updateProfile=async(req:Request,res: Response)=>{
  try {
    console.log("entered")

    const {name,email}=req.body
    console.log("Req.body:",req.body)
    const user=await User.findOneAndUpdate({email},{name},{ new: true })

    if(!user){
      return res.status(404).json({message:"user not found"})
    }
    
    console.log("sdvsvwd")

    res.status(200).json({ message: 'User updated', user });
  } catch (error) {
    console.error("Update failed:", error);
    res.status(500).json({ message: 'Server error' });
  }
}

export { registerUser, loginUser, uploadProfileImage, updateProfile };

// import Post from "../models/Posts.js";
import Post from '../models/posts.js';
import 'dotenv/config';
import { createError } from "../error.js";
import { v2 as cloudinary} from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
export const getAllPosts =async(req,res,next)=>{
try {
    const posts=await Post.find({});
    return res.status(200).json({
        status:"success",
        success:true,
        data:posts

    })
} catch (error) {
    next(createError(error.status,error?.response?.data?.error.message||error.message));
}
}

export const createPost=async(req,res,next)=>{
    try {
        const {name,prompt,photo}=req.body;
        const photoUrl=await cloudinary.uploader.upload(photo);
        const newPost=await Post.create({
            name,prompt,photo:photoUrl?.secure_url
        });
        return res.status(201).json({success:true,data:newPost})
    } catch (error) {
        next(createError(error.status,error?.response?.data?.error.message||error.message));  
    }
}
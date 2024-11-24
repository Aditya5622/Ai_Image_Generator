import express from "express";
// import { createPost, getAllPosts } from "../controllers/Posts.js";
import { generateImage } from "../controllers/GenerateImage.js";
const router = express.Router();
router.post("/", generateImage);
// router.post("/", createPost);

export default router;
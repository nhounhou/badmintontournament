import express from 'express';
import mongoose from 'mongoose';

import PostPlayer from '../models/postPlayer.js';

const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
        const postPlayers = await PostPlayer.find();
                
        res.status(200).json(postPlayers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPostsMS = async (req, res) => { 
    try {
        const postPlayers = await PostPlayer.find({"gender":"M","single":true});
                
        res.status(200).json(postPlayers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPostsWS = async (req, res) => { 
    try {
        const postPlayers = await PostPlayer.find({"gender":"W","single":true});
                
        res.status(200).json(postPlayers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPostsMD = async (req, res) => { 
    try {
        const postPlayers = await PostPlayer.find({"gender":"M","doubles":true});
                
        res.status(200).json(postPlayers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPostsWD = async (req, res) => { 
    try {
        const postPlayers = await PostPlayer.find({"gender":"W","doubles":true});
                
        res.status(200).json(postPlayers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPostsXD = async (req, res) => { 
    try {
        const postPlayers = await PostPlayer.find({"mixed":true});
                
        res.status(200).json(postPlayers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostPlayer.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const { firstName,lastName,gender,single,doubles,mFirst,mLast,mixed,xFirst,xLast,amount,createdAt } = req.body;

    const newPostPlayer = new PostPlayer({ firstName,lastName,gender,single,doubles,mFirst,mLast,mixed,xFirst,xLast,amount,createdAt })

    try {
        await newPostPlayer.save();

        res.status(201).json(newPostPlayer );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { firstName,lastName,gender,single,doubles,mFirst,mLast,mixed,xFirst,xLast,amount,createdAt } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No player with id: ${id}`);

    const updatedPost = { firstName,lastName,gender,single,doubles,mFirst,mLast,mixed,xFirst,xLast,amount,createdAt, _id: id };

    await PostPlayer.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostPlayer.findByIdAndRemove(id);

    res.json({ message: "Player deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No player with id: ${id}`);
    
    const post = await PostPlayer.findById(id);

    const updatedPost = await PostPlayer.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
}


export default router;
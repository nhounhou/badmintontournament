import express from 'express';

import { getPosts, getPostsMS, getPostsWS, getPostsMD, getPostsWD, getPostsXD, getPost, createPost, updatePost, likePost, deletePost } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/MS', getPostsMS);
router.get('/WS', getPostsMD);
router.get('/MD', getPostsMD);
router.get('/WD', getPostsMD);
router.get('/XD', getPostsMD);
router.post('/', createPost);
router.get('/:id', getPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);

export default router;
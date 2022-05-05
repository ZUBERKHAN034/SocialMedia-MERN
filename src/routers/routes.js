const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/authController');
const UserController = require('../controllers/userController');
const PostController = require('../controllers/postController');


router.post('/api/auth/register', AuthController.register);
router.post('/api/auth/login', AuthController.login);

router.put('/api/users/:id', UserController.updateUser);
router.delete('/api/users/:id', UserController.deleteUser);
router.get('/api/users/:id', UserController.getUser);
router.put('/api/users/:id/follow', UserController.followUser);
router.put('/api/users/:id/unfollow', UserController.unfollowUser);

router.post('/api/posts', PostController.createPost);
router.put('/api/posts/:id', PostController.updatePost);
router.delete('/api/posts/:id', PostController.deletePost);
router.put('/api/posts/:id/like', PostController.likeOrDislikePost);
router.get('/api/posts/:id', PostController.getPost);
router.get('/api/posts/timeline/all', PostController.timelinePosts);


// if api is invalid OR wrong URL
router.all("/**", (req, res) => {
    res.status(404).send({ status: false, msg: "404 PAGE NOT FOUND!" })
})

module.exports = router;
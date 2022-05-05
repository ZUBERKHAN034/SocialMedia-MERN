const PostModel = require('../models/postModel');
const UserModel = require('../models/userModel');

//CREATE A POST
const createPost = async (req, res) => {

    const newPost = new PostModel(req.body);

    try {

        const savePost = await newPost.save();
        res.status(200).json(savePost);

    } catch (err) {
        return res.status(500).json(err.message);
    }



}

//UPDATE A POST
const updatePost = async (req, res) => {

    try {

        const post = await PostModel.findById(req.params.id);

        if (post.userId === req.body.userId) {

            await post.updateOne({ $set: req.body });
            res.status(200).json('The post has been updated')

        } else {
            res.status(403).json('You can update only your post')
        }

    } catch (err) {
        return res.status(500).json(err.message);
    }



}

//DELETE A POST
const deletePost = async (req, res) => {

    try {

        const post = await PostModel.findById(req.params.id);

        if (post.userId === req.body.userId) {

            await post.deleteOne();
            res.status(200).json('The post has been deleted')

        } else {
            res.status(403).json('You can delete only your post')
        }

    } catch (err) {
        return res.status(500).json(err.message);
    }



}

//LIKE OR DISLIKE A POST 
const likeOrDislikePost = async (req, res) => {

    try {

        const post = await PostModel.findById(req.params.id);

        if (!post.likes.includes(req.body.userId)) {

            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json('The post has been liked')

        } else {

            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json('The post has been disliked')

        }

    } catch (err) {
        return res.status(500).json(err.message);
    }



}

//GET A POST
const getPost = async (req, res) => {

    try {

        const post = await PostModel.findById(req.params.id);
        res.status(200).json(post);


    } catch (err) {
        return res.status(500).json(err.message);
    }



}



//GET TIMELINE POSTS
const timelinePosts = async (req, res) => {

    try {

        const currentUser = await UserModel.findById(req.body.userId);
        const userPosts = await PostModel.find({ userId: currentUser._id });

        const friendPosts = await Promise.all(
            currentUser.followings.map(friendId => {
                return PostModel.find({ userId: friendId });
            })
        );
        res.json(userPosts.concat(...friendPosts));


    } catch (err) {
        return res.status(500).json(err.message);
    }



}


module.exports.createPost = createPost;
module.exports.updatePost = updatePost;
module.exports.deletePost = deletePost;
module.exports.likeOrDislikePost = likeOrDislikePost;
module.exports.getPost = getPost;
module.exports.timelinePosts = timelinePosts;
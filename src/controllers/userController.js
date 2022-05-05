const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');


//UPDATE USER
const updateUser = async (req, res) => {

    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {

            try {

                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);

            } catch (err) {
                return res.status(500).json(err.message);
            }
        }

        try {

            const user = await UserModel.findByIdAndUpdate(req.params.id, { $set: req, body });
            res.status(200).json('Account has been updated');

        } catch (err) {
            return res.status(500).json(err.message);
        }

    } else {
        return res.status(403).json('You can update only your account');
    }



}

//DELETE USER
const deleteUser = async (req, res) => {

    if (req.body.userId === req.params.id || req.body.isAdmin) {

        try {

            const user = await UserModel.findByIdAndDelete(req.params.id);
            res.status(200).json('Account has been deleted');

        } catch (err) {
            return res.status(500).json(err.message);
        }

    } else {
        return res.status(403).json('You can delete only your account');
    }



}

//GET A USER
const getUser = async (req, res) => {

    try {

        const user = await UserModel.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);




    } catch (err) {
        res.status(500).json(err.message)
    }



}

//FOLLOW A USER
const followUser = async (req, res) => {

    if (req.body.userId !== req.params.id) {

        try {

            const user = await UserModel.findById(req.params.id);
            const currentUser = await UserModel.findById(req.body.userId);

            if (!user.followers.includes(req.body.userId)) {

                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json('User has been followed')

            } else {
                res.status(403).json('You already follow this user')
            }

        } catch (err) {
            res.status(500).json(err.message)
        }

    } else {
        res.status(403).json('You cant follow yourself!')
    }



}

//UNFOLLOW A USER
const unfollowUser = async (req, res) => {

    if (req.body.userId !== req.params.id) {

        try {

            const user = await UserModel.findById(req.params.id);
            const currentUser = await UserModel.findById(req.body.userId);

            if (user.followers.includes(req.body.userId)) {

                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json('User has been unfollowed')

            } else {
                res.status(403).json('You dont follow this user')
            }

        } catch (err) {
            res.status(500).json(err.message)
        }

    } else {
        res.status(403).json('You cant unfollow yourself!')
    }



}


module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.getUser = getUser;
module.exports.followUser = followUser;
module.exports.unfollowUser = unfollowUser;
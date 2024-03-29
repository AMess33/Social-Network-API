const Thought = require("../models/Thought");
const User = require("../models/User");

module.exports = {
  // get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get one user by id
  async getOneUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );
      // if user not found throw error message
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  // create new user
  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      res.status(500);
    }
  },
  // update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: false }
      );
      const thought = await Thought.updateMany(
        { username: user.username },
        { $set: { username: req.body.username } },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: "No user found" });
      }
      res.json(user);
    } catch (err) {
      res.status(500);
    }
  },

  // delete a user
  async deleteUser(req, res) {
    try {
      const userData = await User.findOneAndRemove({ _id: req.params.userId });
      if (!userData) {
        return res.status(404).json({ message: "No User exists" });
      }
      await Thought.deleteMany({ _id: { $in: userData.thoughts } });

      const user = await User.findOneAndUpdate(
        { friends: req.params.userId },
        { $pull: { friends: req.params.userId } },
        { new: true }
      );

      res.json({ message: "User and their Thoughts Deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // add friend POST
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      const friend = await User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $addToSet: { friends: req.params.userId } },
        { new: true }
      );
      if (!user | !friend) {
        return res.status(404).json({ message: "No User found with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // remove friend DELETE
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      const friend = await User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $pull: { friends: req.params.userId } },
        { new: true }
      );

      if (!user | !friend) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

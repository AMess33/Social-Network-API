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
      const user = await User.findOne({ _id: req.params.userId });
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
      const userData = await User.update({ _id: req.params.userId });
      res.json(userData);
    } catch (err) {
      res.status(500);
    }
  },

  // delete a user
  async deleteUser(req, res) {
    try {
      const userData = await User.findOneAndRemove({ _id: req.params.userId });
      return res.json({ message: "User Deleted" });
    } catch (err) {
      res.status(500);
    }
  },
};

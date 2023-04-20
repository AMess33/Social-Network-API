const Thought = require("../models/Thought");
const User = require("../models/User");

module.exports = {
  // get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get thought by id
  async getOneThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // update a thought
  async updateThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate({
        _id: req.params.userId,
      });
      res.json(thoughtData);
    } catch (err) {
      res.status(500);
    }
  },

  // delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        return res.status(404).json({ message: "No thought exists" });
      }
      const user = await User.findOneAndUpdate(
        { users: req.params.userId },
        { $pull: { users: req.params.userId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "Thought deleted, no User Found",
        });
      }

      return res.json({ message: "Thought Deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create reaction POST
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } }
        // { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought found" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete reaction DELETE
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought found" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

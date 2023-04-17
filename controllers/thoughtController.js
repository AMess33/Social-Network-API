const Thought = require("../models/Thought");

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
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

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
      const thoughtData = await Thought.create(req.body);
      res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

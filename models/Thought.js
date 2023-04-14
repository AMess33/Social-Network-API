const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      // set default value of current timestamp
      // use getter to format timestamp
    },
    //   user that creates the thought
    username: {
      type: String,
      required: true,
    },
    //   reactions are replies to the posted thoughts
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// create virtual reactionCount reactions.length

const Thought = model("thoughts", thoughtSchema);

module.exports = Thought;

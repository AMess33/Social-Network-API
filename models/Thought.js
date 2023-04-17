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
      default: Date.now,
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
      virtuals: true,
      getters: true,
    },
  }
);

// create virtual reactionCount reactions.length
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

thoughtSchema.virtual("formatDate").get(function () {
  return this.createdAt.toDateString();
});

// function dateFormat() {
//   const today = Date.now();
//   return today.toDateString();
// }
const Thought = model("thoughts", thoughtSchema);

module.exports = Thought;

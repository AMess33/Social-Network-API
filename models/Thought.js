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
      get: dateFormat,
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
    timestamps: true,
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

function dateFormat(date) {
  const today = Date.now();
  return today.toDateString();
}
const Thought = model("thoughts", thoughtSchema);

module.exports = Thought;

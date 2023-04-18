const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // set default value to current timestamp
      // get: dateFormat,
      // use getter to format timstamp
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

reactionSchema.virtual("formatDate").get(function () {
  return this.createdAt.toDateString();
});

// function dateFormat() {
//   const today = Date.now();
//   return today.toDateString();
// }

module.exports = reactionSchema;

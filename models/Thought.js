const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        if (date) return date.toISOString().split("T") [0];
      },
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
      getters:true
    },
    id: false,
  }
);

thoughtSchema
.virtual('reactionCount')
// Getter
.get(function () {
return this.reactions.length;
});

// Initialize our Video model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
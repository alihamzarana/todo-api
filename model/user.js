const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    userTodos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Todo",
      },
    ],
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  // console.log("user about to be created", this);
  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;

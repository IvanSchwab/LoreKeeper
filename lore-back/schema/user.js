const Mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../auth/generateToken");
const getUserInfo = require("../lib/getUserInfo.js");
const Token = require("../schema/token.js");

const UserSchema = new Mongoose.Schema({
  id: { type: Object },
  mail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

UserSchema.pre("save", function (next) {
  if (this.isModified("password") || this.isNew) {
    const document = this;

    bcrypt.hash(document.password, 10, (err, hash) => {
      if (err) {
        next(err);
      } else {
        document.password = hash;
        next();
      }
    });
  } else {
    next();
  }
});

UserSchema.methods.userExist = async function (mail) {
  const result = await Mongoose.model("User").find({ mail });

  return result.length > 0;
};

UserSchema.methods.comparePassword = async function (password, hash) {
  const same = await bcrypt.compare(password, hash);
  return same;
};

UserSchema.methods.createAccessToken = function () {
  return generateAccessToken(getUserInfo(this));
};

UserSchema.methods.createRefreshToken = async function () {
  const refreshToken = generateRefreshToken(getUserInfo(this));
  try {
    await new Token({ token: refreshToken }).save();
  } catch (error) {
    console.log(error);
  }
};

module.exports = Mongoose.model("User", UserSchema);

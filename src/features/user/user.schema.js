import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/^.+@.+\..+$/, "Please provide a valid email"],
  },
  password: {
    type: String,
    validate: {
      validator: function (value) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        );
      },
      message:
        "Password should be between 8-12 characters and have a special character",
    },
  },
  type: { type: String, enum: ["Customer", "Seller"] },
});

export default userSchema;

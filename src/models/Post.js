import mongoose from "mongoose";
import roles from "../../constants/roles";
import validator from "validator";

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: validator.isURL,
        message: "Invalid image URL",
      },
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Comment",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;

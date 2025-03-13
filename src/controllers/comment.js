import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export default { addComment, deleteComment };

async function addComment(postId, comment) {
  console.log("postId: ", postId);
  console.log("comment: ", comment);
  const newComment = await Comment.create(comment);
  const updatedPost = await Post.findByIdAndUpdate(postId, {
    $push: { comments: newComment._id },
  });
  await newComment.populate("author");

  return newComment;
}

async function deleteComment(postId, commentId) {
  await Comment.deleteOne({ _id: commentId });
  await Post.findByIdAndUpdate(postId, {
    $pull: { comments: commentId },
  });
}

// edit comment

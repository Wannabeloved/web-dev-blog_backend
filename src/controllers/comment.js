import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export default { addComment, deleteComment, editComment };

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

async function editComment(commentId, content, userId) {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new Error("Комментарий не найден");
  }

  if (comment.author.toString() !== userId) {
    throw new Error("Нет прав на редактирование этого комментария");
  }

  comment.content = content;
  await comment.save();
  await comment.populate("author");

  return comment;
}

// edit comment

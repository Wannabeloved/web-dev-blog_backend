export default comment => {
  return {
    id: comment._id,
    content: comment.content,
    author: comment.author.email,
    publishedAt: comment.createdAt,
  };
};

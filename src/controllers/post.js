import Post from "../models/Post.js";

export default {
  addPost,
  editPost,
  getPosts,
  getOnePost,
  deletePost,
};

async function addPost(post) {
  return await Post.create(post).then(post =>
    post.populate({
      path: "comments",
      populate: "author",
    })
  );
}
async function editPost(id, post) {
  return await Post.findByIdAndUpdate(id, post, {
    returnDocument: "after",
  }).then(post =>
    post.populate({
      path: "comments",
      populate: "author",
    })
  );
}
async function getPosts(search = "", limit = 10, page = 1) {
  const [posts, count] = await Promise.all([
    Post.find({ title: { $regex: search, $options: "i" } })
      .limit(limit)
      .skip((page - 1) * limit),
    Post.countDocuments({ title: { $regex: search, $options: "i" } }),
  ]);

  return {
    posts,
    lastPage: Math.ceil(count / limit),
  };
}
async function getOnePost(id) {
  return await Post.findById(id).populate({
    path: "comments",
    populate: "author",
  });
}
async function deletePost(id) {
  return await Post.deleteOne({ _id: id });
}

// delete post

// get list of posts with search and pagination

import { Router } from "express";
import PostController from "../../controllers/post.js";
import mapPost from "../../helpers/mapPost.js";
import {
  POST_CREATE_PREFIX,
  POST_UPDATE_PREFIX,
  POST_DELETE_PREFIX,
} from "../../constants/routes.js";
import commentsRouter from "./comments/index.js";

const router = Router();

router.get("/", async (req, res) => {
  const { posts, lastPage } = await PostController.getPosts(
    req.query.search,
    req.query.limit,
    req.query.page
  );

  res.send({
    posts: posts.map(mapPost),
    lastPage,
  });
});

router.get("/:id", async (req, res) => {
  const post = await PostController.getOnePost(req.params.id);
  res.send({ data: mapPost(post) });
});

router.post(POST_CREATE_PREFIX, async (req, res) => {
  const post = await PostController.addPost({
    title: req.body.title,
    content: req.body.content,
    image: req.body.imageUrl,
  });
  res.send({ data: mapPost(post) });
});

router.patch(`${POST_UPDATE_PREFIX}/:id`, async (req, res) => {
  const post = await PostController.editPost(req.params.id, {
    title: req.body.title,
    content: req.body.content,
    image: req.body.imageUrl,
  });
  res.send({ data: mapPost(post) });
});

router.delete(`${POST_DELETE_PREFIX}/:id`, async (req, res) => {
  await PostController.deletePost(req.params.id);
  res.send({ status: "success" });
});

router.use(
  "/:id/comments",
  (req, res, next) => {
    req.postId = req.params.id;
    next();
  },
  commentsRouter
);
export default router;

import { Router } from "express";
import CommentController from "../../../controllers/comment.js";
import mapComment from "../../../helpers/mapComment.js";
const router = Router();

router.post("/", async (req, res) => {
  const comment = await CommentController.addComment(req.postId, {
    content: req.body.content,
    author: req.user.id,
  });
  res.send({ data: mapComment(comment) });
});

router.delete("/:commentId", async (req, res) => {
  console.log("DELETE comment", req.postId, req.params.commentId);
  await CommentController.deleteComment(req.postId, req.params.commentId);
  res.send({ data: "Comment deleted" });
});

router.patch("/:commentId", async (req, res) => {
  try {
    const comment = await CommentController.editComment(
      req.params.commentId,
      req.body.content,
      req.user.id
    );
    res.send({ data: mapComment(comment) });
  } catch (error) {
    res.status(403).send({
      status: "error",
      message: error.message,
    });
  }
});

export default router;

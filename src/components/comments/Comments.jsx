import React, { useEffect, useState } from "react";
import {
  getComments,
  createComment,
  deleteComment as deleteCommentApi,
  updateComment as updateCommentApi,
} from "../Api/Api";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

function Comments({ currentUserId }) {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );
  const getReplies = (commentId) => {
    return backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };
  const addComment = (text, commentId) => {
    createComment(text, commentId).then((comment) => {
      getComment();
      setActiveComment(null);
    });
  };

  const deleteComment = (commentId) => {
    if (window.confirm("are you sure that you want to remove comment?")) {
      deleteCommentApi(commentId)
        .then(() => getComment())
        .then(() => console.log("done"));
    }
  };
  const updateComment = (text, commentId) => {
    updateCommentApi(text, commentId).then(() => {
      getComment();
      setActiveComment(null);
    });
  };
  useEffect(() => {
    getComment();
  }, []);
  const getComment = () => {
    getComments().then((data) => {
      setBackendComments(data);
    });
  };
  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <div className="comment-form-title">Write comment</div>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            currentUserId={currentUserId}
            deleteComment={deleteComment}
            updateComment={updateComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
          />
        ))}
      </div>
    </div>
  );
}

export default Comments;

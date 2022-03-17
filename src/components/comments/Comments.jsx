import { keyboard } from "@testing-library/user-event/dist/keyboard";
import React, { useEffect, useState } from "react";
import { getComments, createComment, deleteComment } from "../Api/Api";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

function Comments({ currentUserId }) {
  console.log("currentUserIdfsdsfdbdfse:", currentUserId);
  const [backendComments, setBackendComments] = useState([]);
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
  const addComment = (text, parentId) => {
    createComment(text, parentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
    });
  };
  useEffect(() => {
    getComments().then((data) => {
      setBackendComments(data);
    });
  }, []);
  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <div className="comment-form-title">Write comment</div>
      <CommentForm submitLable="Write" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            currentUserId={currentUserId}
            deleteComment={deleteComment}
          />
        ))}
      </div>
    </div>
  );
}

export default Comments;

import React, { useState } from "react";

function CommentForm({
  handleSubmit,
  submitLable,
  hasCancelButton = false,
  initialText = "",
  handleCancel,
}) {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(text);
    setText("");
  };
  return (
    <form onSubmit={onSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="comment-form-textarea"
      />
      <button className="comment-form-button" disabled={isTextareaDisabled}>
        {submitLable}
      </button>
      {hasCancelButton && (
        <button
          className="comment-form-button comment-form-cancel-button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default CommentForm;

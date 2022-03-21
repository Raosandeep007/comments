const url = "https://shadow-glittery-bosworth.glitch.me/comments";
export const getComments = async () => {
  try {
    let res = await fetch(url);
    let data = await res.json();
    return data;
  } catch (error) {
    console.log("error:", error);
  }
};

export const createComment = async (text, parentId = null) => {
  console.log('parentId:', parentId)
  const payload = {
    body: text,
    parentId,
    userId: "7",
    username: "Sandeep",
    createdAt: new Date().toISOString(),
  };
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),

    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateComment = async (text, id) => {
  const payload = {
    body: text,
    userId: "7",
    username: "Sandeep",
    createdAt: new Date().toISOString(),
  };
  await fetch(`https://shadow-glittery-bosworth.glitch.me/comments/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),

    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteComment = async (id) => {
  await fetch(`https://shadow-glittery-bosworth.glitch.me/comments/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

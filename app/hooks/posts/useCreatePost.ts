function useCreatePost() {
  return async function createPostAsync(title: string, content: string) {
    const post = await fetch("/api/posts", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    return post.json();
  };
}

export default useCreatePost;

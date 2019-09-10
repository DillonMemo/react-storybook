import React, { useState, useEffect } from "react";

const Home = () => {
  const [response, setResponse] = useState<string>("");
  const [post, setPost] = useState<string>("");
  const [responseToPost, setResponseToPost] = useState<string>("");

  useEffect(() => {
    callApi()
      .then(res => setResponse(res.express))
      .catch(err => console.log(err));
  }, []);

  const callApi = async () => {
    const response = await fetch("/api/hello");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/world", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ post: post })
    });
    const body = await response.json();
    console.log(body);

    setResponseToPost(body.post);
  };
  return (
    <div>
      <h1>This is Home</h1>
      <p>{response}</p>
      <form onSubmit={event => handleSubmit(event)}>
        <p>
          <strong>Post to Server:</strong>
        </p>
        <input
          type="text"
          value={post}
          onChange={e => {
            console.log(e.target.value);
            setPost(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{responseToPost}</p>
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import "./CommunityFeed.css";

function CommunityFeed() {

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const [posts, setPosts] = useState([
    {
      id: 1,
      farmer: "Ramesh Reddy",
      location: "Warangal, Telangana",
      image:
        "https://thumbs.dreamstime.com/b/tomato-field-summer-day-tomato-field-summer-day-agriculture-gardening-concept-119964741.jpg",
      caption:
        "My tomato crop is growing very well this season using drip irrigation. The plants are healthy, and flowering has started. Farmers should monitor humidity levels regularly and apply fertilizers according to soil conditions for better yield.",
      likes: 24
    }
  ]);

  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImage(
        URL.createObjectURL(e.target.files[0])
      );
    }
  };

  const createPost = () => {

    if (!caption || !image) {
      alert("Please add image and caption");
      return;
    }

    const newPost = {
      id: Date.now(),
      farmer: "Smart Farmer User",
      location: "Telangana",
      image,
      caption,
      likes: 0
    };

    setPosts([newPost, ...posts]);

    setCaption("");
    setImage(null);
  };

  const likePost = (id) => {

    setPosts(
      posts.map((post) =>
        post.id === id
          ? {
              ...post,
              likes: post.likes + 1
            }
          : post
      )
    );
  };

  const aiAdvice = () => {
    alert(
      "🤖 AI Advice Feature can be connected to your AI backend."
    );
  };

  return (

    <div className="community-container">

      <div className="community-header">

        <h1>
          👨‍🌾 Farmer Community
        </h1>

        <p>
          Share your farming success,
          crop progress, and tips
          with other farmers.
        </p>

      </div>

      <div className="create-post">

        <h2>
          📸 Create New Post
        </h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
        />

        {image && (

          <img
            src={image}
            alt="preview"
            className="preview-image"
          />

        )}

        <textarea
          placeholder="Write about your crop, yield, farming tips..."
          value={caption}
          onChange={(e) =>
            setCaption(e.target.value)
          }
        />

        <button onClick={createPost}>
          🚀 Share Post
        </button>

      </div>

      <div className="posts-section">

        {posts.map((post) => (

          <div
            key={post.id}
            className="post-card"
          >

            <div className="post-header">

              <div>

                <h3>
                  {post.farmer}
                </h3>

                <p>
                  📍 {post.location}
                </p>

              </div>

            </div>

            <img
              src={post.image}
              alt="crop"
              className="post-image"
            />

            <div className="post-content">

              <p>
                {post.caption}
              </p>

              <div className="post-actions">

                <button
                  onClick={() =>
                    likePost(post.id)
                  }
                >
                  ❤️ {post.likes}
                </button>

                <button>
                  💬 Comment
                </button>

                <button
                  onClick={aiAdvice}
                >
                  🤖 AI Advice
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

export default CommunityFeed; 
import React from "react";
import { Helmet } from "react-helmet";

// So helmet is basically used for SEO related activities

function Home() {
  return (
    <>
      <Helmet>
        <title>Home : Articles</title>
        <meta name="description" content="Blogs web blogs website" />
      </Helmet>
      <div className="container" style={{ marginTop: 80 }}>
        <h2>Home</h2>
      </div>
    </>
  );
}

export default Home;

import React from "react";
import { Helmet } from "react-helmet";
function NotFound() {
  return (
    <div className="notfound">
      <Helmet>
        <title>404- Not Found</title>
        <meta name="description" content="Page not found." />
      </Helmet>
      <div className="notfoundContainer">
        <h1 className="heading">404</h1>
        <p className="para">Oops!! Page not found.</p>
      </div>
    </div>
  );
}

export default NotFound;

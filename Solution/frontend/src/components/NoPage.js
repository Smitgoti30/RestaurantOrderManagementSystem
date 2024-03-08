import React from "react";
import { Link } from "react-router-dom";

function NoPage() {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-12 text-center">
            <h1>Page Not Found...</h1>
            <Link to="/">
              <h3>Home</h3>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoPage;

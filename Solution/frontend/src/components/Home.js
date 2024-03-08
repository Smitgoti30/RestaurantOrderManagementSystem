import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="index">
        <section className="cls-home-links">
          <Link to="/menu_admin">Admin Menu</Link>
          <Link to="/add">ADD</Link>
        </section>
        {/* <section className="image">
					<picture>
						<img src="watch.jpg" alt="One watche" width={"100%"} />
					</picture>
					<p className="cls-desc">
						From vintage-inspired designs to modern smartwatches, there's a
						Fossil style for everyone.
					</p>
				</section> */}
      </div>
    </>
  );
}

export default Home;

import React from "react";
import { Link } from "react-router-dom";

function NoPage() {
	return (
		<>
			<div class="container">
				<div class="row justify-content-center mt-5">
					<div class="col-12 text-center">
						<h1>Page Not Found...</h1>
						<Link to="/">
							<h3>Home Page</h3>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}

export default NoPage;

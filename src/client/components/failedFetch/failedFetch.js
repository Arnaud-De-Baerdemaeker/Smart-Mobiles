/*
	Smart Mobiles
	Started on December 2022
	By Arnaud De Baerdemaeker
*/

import React from "react";

const FailedFetch = () => {
	return(
		<div className={"failedFetch"}>
			<h2>{"Something went wrong..."}</h2>
			<p>
				{"We were unable to respond to your request."}
				<br />
				{"Please try again later."}
			</p>
		</div>
	);
}

export default FailedFetch;

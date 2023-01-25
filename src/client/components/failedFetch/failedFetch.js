/*
	Smart Mobiles
	Started on December 2022
	By Arnaud De Baerdemaeker
*/

import React from "react";

const FailedFetch = () => {
	return(
		<p className={"failedFetch"}>
			{"We were unable to respond to your request."}
			<br />
			{"Please try again later."}
		</p>
	);
}

export default FailedFetch;

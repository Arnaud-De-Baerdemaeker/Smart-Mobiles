/*
	Smart Mobiles
	Started on December 2022
	By Arnaud De Baerdemaeker
*/

import React from "react";

const Warning = ({warningClass, children}) => {
	return(
		<p className={warningClass}>
			{children}
		</p>
	);
};

export default Warning;

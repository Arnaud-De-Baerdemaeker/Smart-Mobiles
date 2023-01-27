/*
	Smart Mobiles
	Started on December 2022
	By Arnaud De Baerdemaeker
*/

import React from "react";

const SVG = ({viewbox, svgClass, children}) => {
	return(
		<svg
			viewBox={viewbox}
			xmlns="http://www.w3.org/2000/svg"
			className={svgClass && svgClass}
		>
			{children}
		</svg>
	);
};

export default SVG;

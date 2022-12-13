import React from "react";

const SVG = ({width, height, viewbox, svgClass, children}) => {
	return(
		<svg
			width={width}
			height={height}
			viewBox={viewbox}
			xmlns="http://www.w3.org/2000/svg"
			className={svgClass && svgClass}
		>
			{children}
		</svg>
	);
};

export default SVG;

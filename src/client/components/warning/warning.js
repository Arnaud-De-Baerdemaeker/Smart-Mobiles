import React from "react";

const Warning = ({warningClass, children}) => {
	return(
		<p className={warningClass}>
			{children}
		</p>
	);
};

export default Warning;

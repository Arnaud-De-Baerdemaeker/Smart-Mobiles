import React from "react";

const UserInput = ({labelFor, labelName, children, buttonClick, buttonName}) => {
	return(
		<div>
			<label htmlFor={labelFor}>{labelName}</label>
			{children}
			<button onClick={buttonClick}>{buttonName}</button>
		</div>
	);
};

export default UserInput;

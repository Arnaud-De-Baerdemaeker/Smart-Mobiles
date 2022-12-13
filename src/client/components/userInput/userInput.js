import React from "react";

const UserInput = ({formName, children, buttonClick, formClass}) => {
	return(
		<form
			name={formName}
			onSubmit={buttonClick}
			className={formClass}
		>
			{children}
		</form>
	);
};

export default UserInput;

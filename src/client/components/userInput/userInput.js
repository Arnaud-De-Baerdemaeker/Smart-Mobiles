import React from "react";

const UserInput = ({formName, children, buttonClick, buttonName, formClass}) => {
	return(
		<form
			name={formName}
			onSubmit={buttonClick}
			className={formClass}
		>
			{children}
			<button type={"submit"}>{buttonName}</button>
		</form>
	);
};

export default UserInput;

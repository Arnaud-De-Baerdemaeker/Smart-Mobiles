import React from "react";

const Button = ({buttonType, buttonClick, buttonClass, children}) => {
	return(
		<button
			type={buttonType}
			onClick={buttonClick && buttonClick}
			className={buttonClass}
		>
			{children}
		</button>
	)
};

export default Button;

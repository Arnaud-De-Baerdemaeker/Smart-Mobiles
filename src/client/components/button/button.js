/*
	Smart Mobiles
	Started on December 2022
	By Arnaud De Baerdemaeker
*/

import React from "react";

const Button = ({buttonType, buttonClick, buttonTouchStart, buttonTouchEnd, buttonRef, buttonClass, children}) => {
	return(
		<button
			type={buttonType}
			onClick={buttonClick && buttonClick}
			onTouchStart={buttonTouchStart && buttonTouchStart}
			onTouchEnd={buttonTouchEnd && buttonTouchEnd}
			ref={buttonRef && buttonRef}
			className={buttonClass}
		>
			{children}
		</button>
	)
};

export default Button;

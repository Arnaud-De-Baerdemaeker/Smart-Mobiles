/*
	Smart Mobiles
	Started on December 2022
	By Arnaud De Baerdemaeker
*/

import React from "react";

const Modal = ({modalClass, children}) => {
	return(
		<div className={modalClass}>
			{children}
		</div>
	);
}

export default Modal;

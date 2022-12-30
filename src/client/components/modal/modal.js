import React from "react";

const Modal = ({galleryModalState, setGalleryModalState, modalClass, children}) => {
	if(galleryModalState === true) {
		document.querySelector("body").classList.add("scroll--blocked");
	}
	else {
		document.querySelector("body").classList.remove("scroll--blocked");
	}

	return(
		<div className={modalClass}>
			{children}
		</div>
	);
}

export default Modal;

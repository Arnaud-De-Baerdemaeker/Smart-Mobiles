import React from "react";

const Modal = ({modalState, images, name}) => {
	return(
		<div className={
			modalState
			? "modal"
			: "modal--closed"
		}>
			{images.map(image =>
				<img src={image} alt={name} key={image} />
			)}
		</div>
	);
}

export default Modal;

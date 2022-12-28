import React from "react";

import Button from "../button/button";

const Modal = ({modalState, images, name}) => {
	const previousImage = (click) => {
		click.preventDefault();
	};

	const closeModal = () => {};

	const nextImage = (click) => {
		click.preventDefault();

		// const 
	};

	return(
		<div className={
			modalState
			? "modal"
			: "modal--closed"
		}>
			<Button
				buttonType={"button"}
				buttonClick={previousImage}
				buttonClass={"button__previous"}
			></Button>
			{images.map((image, index) =>
				<img
					key={image}
					src={image}
					alt={name}
					className={`modal__image image${index}`}
				/>
			)}
			<Button
				buttonType={"button"}
				buttonClick={closeModal}
				buttonClass={"button__close"}
			></Button>
			<Button
				buttonType={"button"}
				buttonClick={nextImage}
				buttonClass={"button__next"}
			></Button>
		</div>
	);
}

export default Modal;

import React from "react";

import Button from "../button/button";
import SVG from "../svg/svg";

const Modal = ({modalState, setModalState, images, name}) => {
	const closeModal = () => {
		setModalState(false);
	}

	if(modalState === true) {
		document.querySelector("body").classList.add("scroll--blocked");
	}
	else {
		document.querySelector("body").classList.remove("scroll--blocked");
	}

	return(
		<div className={
			modalState
			? "modal"
			: "modal--closed"
		}>
			<div className={"modal__gallery"}>
				{images.map((image, index) =>
					<img
						key={image}
						src={image}
						alt={name}
						className={`modal__image image${index + 1}`}
					/>
				)}
			</div>
			<Button
				buttonType={"button"}
				buttonClick={closeModal}
				buttonClass={"button__close"}
			>
				<SVG
					viewbox={"-7 -7 50 50"}
					class={"svg__close"}
				>
					<path
						d="M7.5 6C6 4.49998 4.5 6 6 7.5L16.5 18L6.00004 28.5C4.50003 30 6.00007 31.5 7.50006 30L18 19.5L28.5 30C30 31.5 31.5 30 30 28.5L19.5 18L30 7.5C31.5 5.99997 30 4.49998 28.5 5.99998L18 16.5L7.5 6Z"
						className={"svg__close"}
					/>
				</SVG>
			</Button>
		</div>
	);
}

export default Modal;

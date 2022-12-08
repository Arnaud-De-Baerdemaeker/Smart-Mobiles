import React from "react";

const Modal = ({images, name}) => {
	return(
		<section>
			{images.map(image =>
				<img src={image} alt={name} key={image} />
			)}
		</section>
	);
}

export default Modal;

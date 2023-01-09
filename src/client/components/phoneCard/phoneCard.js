/*
	Smart Mobiles
	Started on December 2022
	By Arnaud De Baerdemaeker
*/

import React from "react";

const PhoneCard = ({imgSrc, imgAlt, title}) => {
	return(
		<section className={"phoneCard"}>
			<img
				src={imgSrc}
				alt={imgAlt}
				className={"phoneCard__image"}
			/>
			<h3 className={"phoneCard__title"}>{title}</h3>
		</section>
	);
}

export default PhoneCard;

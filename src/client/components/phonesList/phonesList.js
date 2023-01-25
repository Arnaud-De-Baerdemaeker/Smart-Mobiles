/*
	Smart Mobiles
	Started on December 2022
	By Arnaud De Baerdemaeker
*/

import React from "react";

const PhonesList = ({title, paginationPrevious, paginationNext, children}) => {
	return(
		<section className={"phonesList"}>
			<h2 className={"phonesList__title"}>{title}</h2>
			{paginationPrevious}
			<div className={"phonesList__list"}>
				{children}
			</div>
			{paginationNext}
		</section>
	);
};

export default PhonesList;

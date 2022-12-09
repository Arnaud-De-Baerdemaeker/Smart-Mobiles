import React from "react";

const PhonesList = ({title, children}) => {
	return(
		<section className={"phonesList"}>
			<h2 className={"phonesList__title"}>{title}</h2>
			<div className={"phonesList__list"}>
				{children}
			</div>
		</section>
	);
};

export default PhonesList;

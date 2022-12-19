/*
	Smart Mobiles
	Started on December 2022
	By Arnaud De Baerdemaeker
*/

import React from "react";

import Title from "../title/title";

const Footer = () => {
	return(
		<footer>
			<Title titleClass={"footer__title"} />
			<p>
				{"A project made in ReactJS by"}
				<br />
				{"Arnaud De Baerdemaeker"}
			</p>
		</footer>
	);
}

export default Footer;
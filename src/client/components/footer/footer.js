/*
	Smart Mobiles
	Started on December 2022
	By Arnaud De Baerdemaeker
*/

import React from "react";
import {Link} from "react-router-dom";

import Title from "../title/title";

const Footer = () => {
	return(
		<footer>
			<Title titleClass={"footer__title"} />
			<p>
				{"A project made in ReactJS by"}
				<br />
				<a
					href={"https://arnaud-de-baerdemaeker.netlify.app/"}
					target={"_blank"}
				>
					{"Arnaud De Baerdemaeker"}
				</a>
			</p>
			<p>
				{"This project uses the "}
				<a
					href={"https://github.com/azharimm/phone-specs-api"}
					target={"_blank"}
				>
					{"Phone Specs API"}
				</a>
				{" made by "}
				<br />
				<a
					href={"https://www.azharimm.dev/"}
					target={"_blank"}
				>
					{"Azhari Muhammad M"}
				</a>
			</p>
		</footer>
	);
}

export default Footer;
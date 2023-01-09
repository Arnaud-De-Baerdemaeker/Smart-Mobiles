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
			<p className={"footer__projectOwner"}>
				{"A project made in ReactJS by"}
				<br />
				<a
					href={"https://arnaud-de-baerdemaeker.netlify.app/"}
					target={"_blank"}
				>
					{"Arnaud De Baerdemaeker"}
				</a>
			</p>
			<p className={"footer__apiProvider"}>
				{"This project uses the "}
				<br />
				<a
					href={"https://github.com/azharimm/phone-specs-api"}
					target={"_blank"}
					className={"apiProvider__link"}
				>
					{"Phone Specs API"}
				</a>
				<br />
				{" made by "}
				<br />
				<a
					href={"https://www.azharimm.dev/"}
					target={"_blank"}
					className={"apiProvider__website"}
				>
					{"Azhari Muhammad M"}
				</a>
			</p>
		</footer>
	);
}

export default Footer;
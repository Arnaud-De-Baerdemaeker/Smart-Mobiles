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
			<div className={"footer__credits"}>
				<p className={"credits__projectOwner"}>
					{"A project made in ReactJS by "}
					<a
						href={"https://arnaud-de-baerdemaeker.netlify.app/"}
						target={"_blank"}
						className={"projectOwner__website"}
					>
						{"Arnaud De Baerdemaeker"}
					</a>
				</p>
				<p className={"credits__apiProvider"}>
					{"This project uses the "}
					<a
						href={"https://github.com/azharimm/phone-specs-api"}
						target={"_blank"}
						className={"apiProvider__github"}
					>
						{"Phone Specs API"}
					</a>
					{" made by "}
					<a
						href={"https://www.azharimm.dev/"}
						target={"_blank"}
						className={"apiProvider__website"}
					>
						{"Azhari Muhammad M"}
					</a>
				</p>
			</div>
		</footer>
	);
}

export default Footer;
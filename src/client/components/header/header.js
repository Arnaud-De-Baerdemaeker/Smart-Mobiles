/*
	Smart Mobiles
	Started on December 2022
	By Arnaud De Baerdemaeker
*/

import React from "react";
import {Link} from "react-router-dom";

import Title from "../title/title";

const Header = () => {
	return(
		<header>
			<Link to={"/"} className={"header__link"}>
				<Title titleClass={"header__title"} />
			</Link>
		</header>
	);
}

export default Header;
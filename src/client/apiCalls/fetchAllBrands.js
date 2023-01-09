/*
	Smart Mobiles
	Started on December 2022
	By Arnaud De Baerdemaeker
*/

import axios from "axios";

import {baseURL} from "../App";

const getAllBrands = async () => {
	const request = await axios({
		method: "GET",
		url: `${baseURL}/brands`,
		headers: {
			"content-type": "application/json"
		}
	});

	return request;
}

export {getAllBrands};

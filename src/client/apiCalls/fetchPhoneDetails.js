/*
	Smart Mobiles
	Started on December 2022
	By Arnaud De Baerdemaeker
*/

import axios from "axios";

import {baseURL} from "../App";

const getPhoneDetails = async (slug) => {
	const request = await axios({
		method: "GET",
		url: `${baseURL}/${slug}`,
		headers: {
			"content-type": "application/json"
		}
	});

	return request;
}

export {getPhoneDetails};

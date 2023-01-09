/*
	Smart Mobiles
	Started on December 2022
	By Arnaud De Baerdemaeker
*/

import axios from "axios";

import {baseURL} from "../App";


const getPhonesFromBrand = async (brand, page) => {
	const params = {};
	if (page) {
		params.page = page;
	}

	const request = await axios({
		method: "GET",
		url: `${baseURL}/brands/${brand}`,
		headers: {
			"content-type": "application/json"
		},
		params: params
	});

	return request;
};

export {getPhonesFromBrand};

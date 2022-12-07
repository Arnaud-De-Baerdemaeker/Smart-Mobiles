import axios from "axios";

import {baseURL} from "../App";

const getPhonesFromBrand = async (brand) => {
	const request = await axios({
		method: "GET",
		url: `${baseURL}/v2/brands/${brand}`,
		headers: {
			"content-type": "application/json"
		}
	});

	return request;
}

export {getPhonesFromBrand}
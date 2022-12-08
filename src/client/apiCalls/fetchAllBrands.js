import axios from "axios";

import {baseURL} from "../App";

const getAllBrands = async () => {
	const request = await axios({
		method: "GET",
		url: `${baseURL}/v2/brands`,
		headers: {
			"content-type": "application/json"
		}
	});

	return request;
}

export {getAllBrands};

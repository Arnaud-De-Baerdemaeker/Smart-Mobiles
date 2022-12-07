import axios from "axios";

import { baseURL } from "../App";

const getLatestPhones = async () => {
	const request = await axios({
		method: "GET",
		url: `${baseURL}/v2/latest`,
		headers: {
			"content-type": "application/json"
		}
	});

	return request;
}

export {getLatestPhones}
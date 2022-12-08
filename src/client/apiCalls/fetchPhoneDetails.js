import axios from "axios";

const getPhoneDetails = async (url) => {
	const request = await axios({
		method: "GET",
		url: url,
		headers: {
			"content-type": "application/json"
		}
	});

	return request;
}

export {getPhoneDetails};

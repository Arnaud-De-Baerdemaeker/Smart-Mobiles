import axios from "axios";

const baseURL = "http://phone-specs-api.azharimm.dev";

const getAllBrands = async () => {
    const request = await axios({
        method: "GET",
        url: baseURL + "/v2/brands",
        headers: {
            "content-type": "application/json"
        }
    });

    return request;
}

export {getAllBrands};
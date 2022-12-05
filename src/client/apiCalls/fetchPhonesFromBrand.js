import axios from "axios";

const baseURL = "http://phone-specs-api.azharimm.dev";

const getPhonesFromBrand = async (brand) => {
    const request = await axios({
        method: "GET",
        url: baseURL + `/v2/brands/${brand}`,
        headers: {
            "content-type": "application/json"
        }
    });

    return request;
}

export {getPhonesFromBrand}
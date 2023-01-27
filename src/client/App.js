/*
	Smart Mobiles
	Started on December 2022
	By Arnaud De Baerdemaeker
*/

import React, {useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./components/home/home";
import PhoneDetails from "./components/phoneDetails/phoneDetails";

import {getPhoneDetails} from "./apiCalls/fetchPhoneDetails";

const baseURL = "https://phone-specs-api.azharimm.dev";

const App = () => {
	const [latestPhones, setLatestPhones] = useState(null);
	const [brands, setBrands] = useState([]);
	const [fetchError, setFetchError] = useState(false);
	const [phoneDetails, setPhoneDetails] = useState(null);

	const acquirePhoneDetails = (slug) => {
		if(phoneDetails !== null) {
			setPhoneDetails(null);
		}

		getPhoneDetails(slug)
		.then(result => setPhoneDetails(result.data.data))
		.catch(() => setFetchError(true));
	}

	return(
		<BrowserRouter>
			<Routes>
				<Route
					path={"/"}
					element={
						<Home
							latestPhones={latestPhones}
							setLatestPhones={setLatestPhones}
							brands={brands}
							setBrands={setBrands}
							fetchError={fetchError}
							setFetchError={setFetchError}
							acquirePhoneDetails={acquirePhoneDetails}
						/>
					}
				/>
				<Route
					path={"/:slug"}
					element={
						<PhoneDetails
							phoneDetails={phoneDetails}
							acquirePhoneDetails={acquirePhoneDetails}
							fetchError={fetchError}
						/>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export {baseURL};

export default App;

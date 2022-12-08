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

const baseURL = "http://phone-specs-api.azharimm.dev";

const App = () => {
	const [phoneDetails, setPhoneDetails] = useState(null);

	const acquirePhoneDetails = (url) => {
		getPhoneDetails(url)
		.then(result => setPhoneDetails(result.data.data));
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path={"/"}
					element={<Home acquirePhoneDetails={acquirePhoneDetails} />}
				/>
				<Route
					path={"/:slug"}
					element={<PhoneDetails phoneDetails={phoneDetails} />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export {baseURL};

export default App;

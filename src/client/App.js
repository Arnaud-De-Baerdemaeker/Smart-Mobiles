import React, {useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./components/home/home";
import PhoneDetails from "./components/phoneDetails/phoneDetails";

import {getPhoneDetails} from "./apiCalls/fetchPhoneDetails";

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
					element={
						<Home acquirePhoneDetails={acquirePhoneDetails} />
					}
				/>
				<Route
					path={"/phone-details"}
					element={
						<PhoneDetails phoneDetails={phoneDetails} />
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
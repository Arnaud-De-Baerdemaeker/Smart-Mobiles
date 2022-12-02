/*
	Smart Mobiles
	Started on December 2022
	By Arnaud De Baerdemaeker
*/

import React, {useState, useEffect} from "react";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";

import "./App.scss";

import {getAllBrands} from "./api-calls/fetch-all-brands";

function App() {
	const [brands, setBrands] = useState([]);

	useEffect(() => {
		getAllBrands()
		.then(result => {
			setBrands(result.data.data);
		});
	}, []);

	return (
		<>
			<Header />
			<div className="App">
				{brands.length > 0
				? <ul>
					{brands.map(item => 
						<li key={item.brand_id}>{item.brand_name}</li>
					)}
				</ul>
				: <p>{"Loading"}</p>
				}
			</div>
			<Footer />
		</>
	);
}

export default App;
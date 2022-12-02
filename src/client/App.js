import React, {useState, useEffect} from "react";

import './App.css';

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
	);
}

export default App;
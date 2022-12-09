import React, {useState, useEffect, useRef} from "react";

import Header from "../header/header";
import Render from "../render/render";
import UserInput from "../userInput/userInput";
import Footer from "../footer/footer";

import {getLatestPhones} from "../../apiCalls/fetchLatestPhones";
import {getAllBrands} from "../../apiCalls/fetchAllBrands";
import {getResultsFromSearchQuery} from "../../apiCalls/fetchFromInputTerm";
import {getPhonesFromBrand} from "../../apiCalls/fetchPhonesFromBrand";

const Home = ({acquirePhoneDetails}) => {
	const [latestPhones, setLatestPhones] = useState(null);
	const [brands, setBrands] = useState([]);
	const [brandTitle, setBrandTitle] = useState(null);
	const [searchResult, setSearchResult] = useState(null);
	const [phones, setPhones] = useState(null);
	const dropDown = useRef(null);
	const searchInput = useRef(null);

	const getOption = () => {
		let selected = dropDown.current.value;

		if(selected !== "default") {
			getPhonesFromBrand(selected)
			.then(result => {
				setBrandTitle(result.data.data.title);
				setPhones(result.data.data.phones);
				setSearchResult(null);
			});
		}
		else {
			alert("Please select a brand");
		}
	};

	const getSearchQuery = () => {
		let searchTerms = searchInput.current.value;

		if(searchTerms !== "") {
			getResultsFromSearchQuery(searchTerms)
			.then(result => {
				setSearchResult(result.data.data);
				setBrandTitle(null);
				setPhones(null);
			});
		}
		else {
			alert("Please provide a term for the research");
		}
	};

	const clear = () => {
		setBrandTitle(null);
		setPhones(null);
		setSearchResult(null);

		dropDown.current.value = "default";
		searchInput.current.value = null;
	};

	useEffect(() => {
		getLatestPhones()
		.then(result =>
			setLatestPhones(result.data.data)
		);
		getAllBrands()
		.then(result =>
			setBrands(result.data.data)
		);
	}, []);

	return(
		<>
			<Header />
			<main>
				{/* Brand selection */}
				<UserInput
					labelFor={"brandSelection"}
					labelName={"Select a brand"}
					buttonClick={getOption}
					buttonName={"Validate"}
				>
					<select
						name={"brands"}
						id={"brandSelection"}
						defaultValue={"default"}
						ref={dropDown}
					>
						<option
							value={"default"}
							hidden
							disabled
						>
							{"Acer, Alcatel..."}
						</option>
						{brands.length && brands.map(item => 
							<option
								value={item.brand_slug}
								key={item.brand_id}
							>
								{item.brand_name}
							</option>
						)}
					</select>
				</UserInput>

				{/* Search field */}
				<UserInput
					labelFor={"phoneSearch"}
					labelName={"Search a phone"}
					buttonClick={getSearchQuery}
					buttonName={"Search"}
				>
					<input
						type={"search"}
						id={"phoneSearch"}
						ref={searchInput}
					/>
				</UserInput>

				<div>
					<button onClick={clear}>{"Clear"}</button>
				</div>

				{/* Render the corresponding component based on the user's actions */}
				<Render
					latestPhones={latestPhones}
					brandTitle={brandTitle}
					searchResult={searchResult}
					phones={phones}
					acquirePhoneDetails={acquirePhoneDetails}
				/>
			</main>
			<Footer />
		</>
	);
}

export default Home;

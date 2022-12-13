import React, {useState, useEffect, useRef} from "react";

import Header from "../header/header";
import Render from "../render/render";
import Button from "../button/button";
import SVG from "../svg/svg";
import UserInput from "../userInput/userInput";
import Footer from "../footer/footer";

import {getLatestPhones} from "../../apiCalls/fetchLatestPhones";
import {getAllBrands} from "../../apiCalls/fetchAllBrands";
import {getResultsFromSearchQuery} from "../../apiCalls/fetchFromInputTerm";
import {getPhonesFromBrand} from "../../apiCalls/fetchPhonesFromBrand";

const Home = ({acquirePhoneDetails}) => {
	const [latestPhones, setLatestPhones] = useState(null);
	const [brands, setBrands] = useState([]);
	const [isBrandSelectionOpen, setIsBrandSelectionOpen] = useState(false);
	const [isSearchFieldOpen, setIsSearchFieldOpen] = useState(false);
	const [brandTitle, setBrandTitle] = useState(null);
	const [searchResult, setSearchResult] = useState(null);
	const [phones, setPhones] = useState(null);
	const dropDown = useRef(null);
	const searchInput = useRef(null);

	const toggleBrandInput = () => {
		setIsBrandSelectionOpen(!isBrandSelectionOpen);

		if(isSearchFieldOpen == true) {
			setIsSearchFieldOpen(!isSearchFieldOpen);
		}
	};

	const toggleSearchInput = () => {
		setIsSearchFieldOpen(!isSearchFieldOpen);

		if(isBrandSelectionOpen == true) {
			setIsBrandSelectionOpen(!isBrandSelectionOpen);
		}
	};

	const getOption = (event) => {
		event.preventDefault();

		let selected = dropDown.current.value;

		if(selected !== "default") {
			getPhonesFromBrand(selected)
			.then(result => {
				setBrandTitle(result.data.data.title);
				setPhones(result.data.data.phones);
				setSearchResult(null);
			})
			.catch(error => console.error(error));
		}
		else {
			alert("Please select a brand");
		}
	};

	const getSearchQuery = (event) => {
		event.preventDefault();

		let searchTerms = searchInput.current.value;

		if(searchTerms !== "") {
			getResultsFromSearchQuery(searchTerms)
			.then(result => {
				setSearchResult(result.data.data);
				setBrandTitle(null);
				setPhones(null);
			})
			.catch(error => console.error(error));
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
				<div className={"userInterface"}>
					<div className={"userInterface__controls"}>
						<Button
							buttonType={"button"}
							buttonClick={toggleBrandInput}
							buttonClass={"button__brands"}
						>
							{"brand"}
						</Button>
						<Button
							buttonType={"button"}
							buttonClick={toggleSearchInput}
							buttonClass={"button__search"}
						>
							<SVG
								width={"50"}
								height={"50"}
								viewbox={"-25 -25 100 100"}
								svgClass={"svg__search"}
							>
								<path d="M25.9051 25.9051C26.405 25.4052 27.2154 25.4052 27.7153 25.9051L44.997 43.1868C45.4968 43.6867 45.4969 44.4971 44.997 44.997V44.997C44.4971 45.4968 43.6867 45.4968 43.1868 44.997L25.9051 27.7153C25.4052 27.2154 25.4052 26.405 25.9051 25.9051V25.9051Z" />
								<path d="M32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16ZM2.56 16C2.56 23.4227 8.57729 29.44 16 29.44C23.4227 29.44 29.44 23.4227 29.44 16C29.44 8.57729 23.4227 2.56 16 2.56C8.57729 2.56 2.56 8.57729 2.56 16Z" />
							</SVG>
						</Button>
						<Button
							buttonType={"button"}
							buttonClick={clear}
							buttonClass={"button__clear"}
						>
							<SVG
								width={"50"}
								height={"50"}
								viewbox={"-12.5 -12.5 75 75"}
								svgClass={"svg__clear"}
							>
								<path d="M25 43.0006C25 43.5526 25.4478 44.0027 25.999 43.9737C29.4061 43.7944 32.7088 42.7002 35.5558 40.7979C38.6804 38.7102 41.1156 35.7428 42.5537 32.271C43.9918 28.7992 44.368 24.9789 43.6349 21.2933C42.9018 17.6076 41.0922 14.2222 38.435 11.565C35.7778 8.90777 32.3924 7.0982 28.7067 6.36508C25.0211 5.63196 21.2008 6.00822 17.729 7.44629C14.2572 8.88435 11.2898 11.3196 9.20208 14.4442C7.29976 17.2912 6.20563 20.5939 6.02627 24.001C5.99726 24.5522 6.44745 25 6.9994 25V25C7.55135 25 7.99574 24.5521 8.02816 24.0011C8.20537 20.9896 9.18137 18.0729 10.864 15.5546C12.7321 12.7588 15.3874 10.5797 18.4939 9.29294C21.6005 8.00616 25.0189 7.66948 28.3168 8.32547C31.6147 8.98147 34.644 10.6007 37.0217 12.9783C39.3993 15.356 41.0185 18.3853 41.6745 21.6832C42.3305 24.9811 41.9938 28.3995 40.7071 31.5061C39.4203 34.6126 37.2412 37.2679 34.4454 39.136C31.9271 40.8186 29.0104 41.7946 25.9989 41.9718C25.4479 42.0043 25 42.4486 25 43.0006V43.0006Z" />
								<path d="M7.70499 27.295L13 22C14 21 12.5 19.5 11.5 20.5L7 25L2.5 20.5C1.5 19.5 1.5883e-06 21 0.999999 22L6.29501 27.295C6.68553 27.6855 7.31446 27.6855 7.70499 27.295Z" />
							</SVG>
						</Button>
					</div>

					<div className={
						isBrandSelectionOpen || isSearchFieldOpen === true
						? "userInterface__fields"
						: "userInterface__fields--closed"
					}>
						{/* Brand selection */}
						<UserInput
							formName={"brandSelection"}
							formClass={
								isBrandSelectionOpen
								? "userInput__dropdown"
								: "userInput__dropdown--closed"
							}
						>
							<select
								name={"brands"}
								id={"brandSelection"}
								defaultValue={"default"}
								ref={dropDown}
								className={"userInput__selection"}
							>
								<option
									value={"default"}
									hidden
									disabled
								>
									{"Select brand"}
								</option>
								{brands.length && brands.map(item => 
									<option
										value={item.brand_slug}
										key={item.brand_id}
										className={"userInput__option"}
									>
										{item.brand_name}
									</option>
								)}
							</select>
							<Button
								buttonType={"submit"}
								buttonClick={getOption}
								buttonClass={"button__validateSelection"}
							>
								{"Select"}
							</Button>
						</UserInput>

						{/* Search field */}
						<UserInput
							formName={"searchPhone"}
							formClass={
								isSearchFieldOpen
								? "userInput__search"
								: "userInput__search--closed"
							}
						>
							<input
								type={"search"}
								placeholder={"Search phone"}
								id={"phoneSearch"}
								ref={searchInput}
								className={"userInput__field"}
							/>
							<Button
								buttonType={"submit"}
								buttonClick={getSearchQuery}
								buttonClass={"button__validateTerms"}
							>
								{"Search"}
							</Button>
						</UserInput>
					</div>
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

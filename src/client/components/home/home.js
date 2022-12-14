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
								viewbox={"-12.5 -12.5 75 75"}
								svgClass={"svg__search"}
							>
								<path d="M43.2635 43.2635C42.4824 44.0445 41.2161 44.0445 40.435 43.2635L27 29.8285C26.219 29.0474 26.219 27.7811 27 27V27C27.7811 26.219 29.0474 26.219 29.8284 27L43.2635 40.4351C44.0445 41.2161 44.0445 42.4824 43.2635 43.2635V43.2635Z" />
								<path d="M33 19.5C33 26.9558 26.9558 33 19.5 33C12.0442 33 6 26.9558 6 19.5C6 12.0442 12.0442 6 19.5 6C26.9558 6 33 12.0442 33 19.5ZM9.99922 19.5C9.99922 24.7471 14.2529 29.0008 19.5 29.0008C24.7471 29.0008 29.0008 24.7471 29.0008 19.5C29.0008 14.2529 24.7471 9.99922 19.5 9.99922C14.2529 9.99922 9.99922 14.2529 9.99922 19.5Z" />
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
								<path d="M13 8.5C13 5.5 9 5.5 9 8.5V15.0016C9 16.1062 9.89383 17 10.9984 17H17.5C20.5 17 20.5 13 17.5 13H13L13 8.5Z" />
								<path d="M12.9757 12.9756C12.1966 12.1966 12.1906 10.924 13.0471 10.2308C15.9224 7.90368 19.4277 6.4569 23.1377 6.09149C27.5122 5.66063 31.9009 6.75992 35.5558 9.20207C39.2107 11.6442 41.9058 15.2781 43.1819 19.4846C44.4579 23.691 44.2359 28.2098 42.5537 32.2709C40.8716 36.3321 37.8333 39.6843 33.9566 41.7565C30.0799 43.8286 25.6046 44.4925 21.2933 43.6349C16.9821 42.7774 13.1015 40.4515 10.3129 37.0535C7.94785 34.1718 6.4923 30.6702 6.10463 26.9915C5.98915 25.8958 6.89319 25.0001 7.995 25.0001V25.0001C9.09681 25.0001 9.97636 25.8972 10.1224 26.9893C10.4906 29.7429 11.6182 32.3546 13.3972 34.5223C15.6002 37.2067 18.6658 39.0441 22.0717 39.7216C25.4777 40.3991 29.0131 39.8746 32.0757 38.2376C35.1383 36.6006 37.5385 33.9524 38.8674 30.744C40.1964 27.5357 40.3717 23.9659 39.3637 20.6428C38.3556 17.3197 36.2265 14.4489 33.3391 12.5196C30.4517 10.5903 26.9847 9.7219 23.5288 10.0623C20.738 10.3371 18.094 11.3865 15.8865 13.0733C15.011 13.7423 13.7547 13.7547 12.9757 12.9756V12.9756Z" />
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

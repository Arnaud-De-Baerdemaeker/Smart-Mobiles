import React, {useState, useEffect, useRef} from "react";

import Header from "../header/header";
import Render from "../render/render";
import Button from "../button/button";
import SVG from "../svg/svg";
import UserInput from "../userInput/userInput";
import Warning from "../warning/warning";
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
	const [brandInputWarning, setBrandInputWarning] = useState(false);
	const [searchInputWarning, setSearchInputWarning] = useState(false);
	const [selectedBrand, setSelectedBrand] = useState(null);
	const [term, setTerm] = useState(null);
	const [brandTitle, setBrandTitle] = useState(null);
	const [searchResult, setSearchResult] = useState(null);
	const [phones, setPhones] = useState(null);
	const [currentPage, setCurrentPage] = useState(null);
	const [totalPages, setTotalPages] = useState(null);
	const brandsButton = useRef(null);
	const searchButton = useRef(null);
	const dropDown = useRef(null);
	const searchInput = useRef(null);
	const dropdownContainer = useRef(null);
	const searchContainer = useRef(null);

	const toggleBrandInput = () => {
		setIsBrandSelectionOpen(!isBrandSelectionOpen);

		// Remove the warning if it was displayed
		if(searchInputWarning) {
			setSearchInputWarning(false);
		}

		if(isBrandSelectionOpen === false) {
			brandsButton.current.classList.add("touchButton");
			brandsButton.current.childNodes[0].classList.add("touchSVG");

			searchButton.current.classList.remove("touchButton");
			searchButton.current.childNodes[0].classList.remove("touchSVG");
		}
		else {
			brandsButton.current.classList.remove("touchButton");
			brandsButton.current.childNodes[0].classList.remove("touchSVG");

			if(selectedBrand) {
				setSelectedBrand(null);
			}

			if(brandInputWarning) {
				setBrandInputWarning(false);
			}
		}

		if(isSearchFieldOpen === true) {
			setIsSearchFieldOpen(!isSearchFieldOpen);

			if(brandInputWarning) {
				setBrandInputWarning(false);
			}
		}
	};

	const toggleSearchInput = () => {
		setIsSearchFieldOpen(!isSearchFieldOpen);

		// Remove the warning if it was displayed
		if(brandInputWarning) {
			setBrandInputWarning(false);
		}

		if(isSearchFieldOpen === false) {
			searchButton.current.classList.add("touchButton");
			searchButton.current.childNodes[0].classList.add("touchSVG");

			brandsButton.current.classList.remove("touchButton");
			brandsButton.current.childNodes[0].classList.remove("touchSVG");
		}
		else {
			searchButton.current.classList.remove("touchButton");
			searchButton.current.childNodes[0].classList.remove("touchSVG");

			if(term) {
				setTerm(null);
			}

			if(searchInputWarning) {
				setSearchInputWarning(false);
			}
		}

		if(isBrandSelectionOpen === true) {
			setIsBrandSelectionOpen(!isBrandSelectionOpen);

			if(searchInputWarning) {
				setSearchInputWarning(false);
			}
		}
	};

	const getOption = (event) => {
		setSelectedBrand(event.target.value);
	};

	const getDropdownResults = (event) => {
		event.preventDefault();

		// Launch the call if the value is different than default
		if(selectedBrand !== null) {
			// Remove the warning if it was set due to a previous mistake
			if(brandInputWarning) {
				setBrandInputWarning(false);
			}

			// Make the call with the value selected
			getPhonesFromBrand(selectedBrand)
			.then(result => {
				// Distribute the results in states
				setBrandTitle(result.data.data.title);
				setPhones(result.data.data.phones);
				setCurrentPage(result.data.data.current_page);
				setTotalPages(result.data.data.last_page);
				setSearchResult(null);
			})
			.catch(error => {
				console.error(error);
			});

			// Empty the state after the call is fulfilled
			setSelectedBrand(null);
		}
		else {
			// Display a warning label if the value is not selected
			setBrandInputWarning(true);
		}
	};

	const getTerm = (event) => {
		setTerm(event.target.value);
	};

	const getSearchQuery = (event) => {
		event.preventDefault();

		// Launch the call if the user provided a term in the search field
		if(term !== null) {
			// Remove the warning if it was set due to a previous mistake
			if(searchInputWarning) {
				setSearchInputWarning(false);
			}

			getResultsFromSearchQuery(term)
			.then(result => {
				// Distribute the results in the states
				setSearchResult(result.data.data);
				setBrandTitle(null);
				setPhones(null);
			})
			.catch(error => {
				console.error(error);
			});

			// Empty the state after the call is fulfilled
			setTerm(null);
		}
		else {
			// Display a warning sign if no term is provided
			setSearchInputWarning(true);
		}
	};

	const clear = () => {
		setSelectedBrand(null);
		setTerm(null);
		setBrandTitle(null);
		setPhones(null);
		setSearchResult(null);

		if(dropDown.current.selectedIndex !== "default") {
			dropDown.current.selectedIndex = "default";
		}

		if(searchInput.current && searchInput.current.value !== "") {
			searchInput.current.value = "";
		}

		if(brandInputWarning) {
			setBrandInputWarning(false);
		}

		if(searchInputWarning) {
			setSearchInputWarning(false);
		}
	};

	const touchStartEffect = (event) => {
		event.target.classList.add("touchButton");

		if(event.target.children.length > 0) {
			event.target.childNodes[0].classList.add("touchSVG");
		}
	};

	const touchEndEffect = (event) => {
		event.target.classList.remove("touchButton");

		if(event.target.children.length > 0) {
			event.target.childNodes[0].classList.remove("touchSVG");
		}
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
			<main className={"home"}>
				<div className={"userInterface"}>
					<div className={"userInterface__controls"}>
						<Button
							buttonType={"button"}
							buttonClick={toggleBrandInput}
							buttonRef={brandsButton}
							buttonClass={"button__brands"}
						>
							<SVG
								viewbox={"-12.5 -12.5 75 75"}
								svgClass={"svg__brands"}
							>
								<path
									fillRule={"evenodd"}
									clipRule={"evenodd"}
									d={"M19 13L25 13C30 13 33 15.8487 33 20C33 24.1513 30 27 25 27L30.9701 34.4627C31.7882 35.4852 31.0601 37 29.7506 37C29.2762 37 28.8275 36.7843 28.5311 36.4139L21 27V35C21 36.1046 20.1046 37 19 37C17.8954 37 17 36.1046 17 35V15C17 13.8954 17.8954 13 19 13ZM21 18V22C21 22.5523 21.4476 23 21.9999 23L25 23C27 23 29 22.6197 29 20C29 17.3803 27 17 25 17H21.9999C21.4476 17 21 17.4477 21 18Z"}
								/>
								<path
									fillRule={"evenodd"}
									clipRule={"evenodd"}
									d={"M25 5C36.0457 5 45 13.9543 45 25C45 36.0457 36.0457 45 25 45C13.9543 45 5 36.0457 5 25C5 13.9543 13.9543 5 25 5ZM25 9C33.8366 9 41 16.1634 41 25C41 33.8366 33.8366 41 25 41C16.1634 41 9 33.8366 9 25C9 16.1634 16.1634 9 25 9Z"}
								/>
							</SVG>
						</Button>
						<Button
							buttonType={"button"}
							buttonClick={toggleSearchInput}
							buttonRef={searchButton}
							buttonClass={"button__search"}
						>
							<SVG
								viewbox={"-12.5 -12.5 75 75"}
								svgClass={"svg__search"}
							>
								<path d={"M43.6777 43.6777C42.8966 44.4587 41.6303 44.4587 40.8492 43.6777L28.8284 31.6569C28.0474 30.8758 28.0474 29.6095 28.8284 28.8284V28.8284C29.6095 28.0474 30.8758 28.0474 31.6569 28.8284L43.6777 40.8492C44.4587 41.6303 44.4587 42.8966 43.6777 43.6777V43.6777Z"} />
								<path
									fillRule={"evenodd"}
									clipRule={"evenodd"}
									d={"M20 5C28.2843 5 35 11.7157 35 20C35 28.2843 28.2843 35 20 35C11.7157 35 5 28.2843 5 20C5 11.7157 11.7157 5 20 5ZM20 9C26.0751 9 31 13.9249 31 20C31 26.0751 26.0751 31 20 31C13.9249 31 9 26.0751 9 20C9 13.9249 13.9249 9 20 9Z"}
								/>
							</SVG>
						</Button>
						<Button
							buttonType={"button"}
							buttonClick={clear}
							buttonTouchStart={touchStartEffect}
							buttonTouchEnd={touchEndEffect}
							buttonClass={"button__clear"}
						>
							<SVG
								viewbox={"-12.5 -12.5 75 75"}
								svgClass={"svg__clear"}
							>
								<path d={"M13 12V7C13 5.89543 12.1046 5 11 5C9.89543 5 9 5.89543 9 7V14C9 15.1046 9.89543 16 11 16H18C19.1046 16 20 15.1046 20 14C20 12.8954 19.1046 12 18 12H13Z"} />
								<path d={"M12.2721 12.2721C11.491 11.491 11.4853 10.2157 12.3404 9.51657C15.3816 7.03002 19.101 5.48423 23.0397 5.09631C27.6445 4.64277 32.2641 5.79993 36.1114 8.37061C39.9587 10.9413 42.7956 14.7664 44.1388 19.1943C45.482 23.6222 45.2483 28.3788 43.4776 32.6537C41.7069 36.9286 38.5087 40.4572 34.4279 42.6384C30.3472 44.8196 25.6364 45.5184 21.0982 44.6157C16.56 43.713 12.4752 41.2647 9.53979 37.6879C7.02902 34.6285 5.49204 30.9054 5.0999 26.9968C4.98963 25.8977 5.89543 25 7 25V25C8.10457 25 8.98711 25.8989 9.12482 26.9949C9.49944 29.9763 10.7085 32.8067 12.6318 35.1503C14.9802 38.0117 18.248 39.9704 21.8786 40.6926C25.5091 41.4147 29.2778 40.8557 32.5423 39.1107C35.8069 37.3658 38.3655 34.5428 39.7821 31.1229C41.1986 27.703 41.3856 23.8977 40.311 20.3554C39.2365 16.8132 36.967 13.753 33.8891 11.6965C30.8113 9.63994 27.1156 8.71422 23.4317 9.07704C20.4146 9.37421 17.5582 10.5207 15.1851 12.364C14.3128 13.0415 13.0531 13.0531 12.2721 12.2721V12.2721Z"} />
							</SVG>
						</Button>
					</div>

					{isBrandSelectionOpen &&
						<UserInput
							formName={"brandSelection"}
							formClass={"userInput__dropdown"}
						>
							<label
								htmlFor={"brandSelection"}
								className={"dropdown__label"}
							>
								{"Select brand"}
							</label>
							<div
								ref={dropdownContainer}
								className={"dropdown__fieldsContainer"}
							>
								<select
									name={"brands"}
									id={"brandSelection"}
									defaultValue={"default"}
									ref={dropDown}
									onChange={getOption}
									className={"dropdown__selection"}
								>
									<option
										value={"default"}
										hidden
										disabled
									>
										{""}
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
								<Button
									buttonType={"submit"}
									buttonClick={getDropdownResults}
									buttonTouchStart={touchStartEffect}
									buttonTouchEnd={touchEndEffect}
									buttonClass={"button__validateSelection"}
								>
									{"OK"}
								</Button>
							</div>
							{brandInputWarning
								? <Warning warningClass={"dropdown__warning"}>{"Please select a brand"}</Warning>
								: null
							}
						</UserInput>
					}

					{isSearchFieldOpen &&
						<UserInput
							formName={"searchPhone"}
							formClass={
								isSearchFieldOpen
								? "userInput__search"
								: "userInput__search--closed"
							}
						>
							<label
								htmlFor={"phoneSearch"}
								className={"search__label"}
							>
								{"Search phone"}
							</label>
							<div
								ref={searchContainer}
								className={"search__fieldsContainer"}
							>
								<input
									type={"search"}
									id={"phoneSearch"}
									ref={searchInput}
									onChange={getTerm}
									className={"search__field"}
								/>
								<Button
									buttonType={"submit"}
									buttonClick={getSearchQuery}
									buttonTouchStart={touchStartEffect}
									buttonTouchEnd={touchEndEffect}
									buttonClass={"button__validateTerms"}
								>
									{"OK"}
								</Button>
							</div>
							{searchInputWarning
								? <Warning warningClass={"search__warning"}>{"Please provide a term"}</Warning>
								: null
							}
						</UserInput>
					}
				</div>

				{/* Render the corresponding component based on the user's actions */}
				<Render
					latestPhones={latestPhones}
					brandTitle={brandTitle}
					searchResult={searchResult}
					phones={phones}
					setPhones={setPhones}
					selectedBrand={selectedBrand}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					totalPages={totalPages}
					touchStartEffect={touchStartEffect}
					touchEndEffect={touchEndEffect}
					acquirePhoneDetails={acquirePhoneDetails}
				/>
			</main>
			<Footer />
		</>
	);
}

export default Home;

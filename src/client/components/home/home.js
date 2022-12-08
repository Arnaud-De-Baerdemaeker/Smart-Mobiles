import React, {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";

import UserInput from "../userInput/userInput";
import PhonesList from "../phonesList/phonesList";
import PhoneCard from "../phoneCard/phoneCard";

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

		getPhonesFromBrand(selected)
		.then(result => {
			setBrandTitle(result.data.data.title);
			setPhones(result.data.data.phones);
		});
	}

	const getSearchQuery = () => {
		let searchTerms = searchInput.current.value;

		getResultsFromSearchQuery(searchTerms)
		.then(result =>
			setSearchResult(result.data.data)
		);
	}

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
					ref={dropDown}
				>
					<option value={""}>{"Please choose an option"}</option>
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

			{brandTitle && phones
				? <PhonesList title={brandTitle}>
					{phones.map(phone =>
						<Link
							to={`/${phone.slug}`}
							onClick={() => acquirePhoneDetails(phone.detail)}
							key={phone.slug}
						>
							<PhoneCard
								imgSrc={phone.image}
								imgAlt={`${phone.brand} ${phone.phone_name}`}
								title={`${phone.brand} ${phone.phone_name}`}
							/>
						</Link>
					)}
				</PhonesList>
				: searchResult
					? searchResult && <PhonesList title={searchResult.title}>
						{searchResult.phones.map(phone =>
							<Link
								to={`/${phone.slug}`}
								onClick={() => acquirePhoneDetails(phone.detail)}
								key={phone.phone_name}
							>
								<PhoneCard
									imgSrc={phone.image}
									imgAlt={phone.phone_name}
									title={phone.phone_name}
								/>
							</Link>
						)}
					</PhonesList>
					: latestPhones
						? <PhonesList title={latestPhones.title}>
							{latestPhones.phones.map(phone =>
								<Link
									to={`/${phone.slug}`}
									onClick={() => acquirePhoneDetails(phone.detail)}
									key={phone.phone_name}
								>
									<PhoneCard
										imgSrc={phone.image}
										imgAlt={phone.phone_name}
										title={phone.phone_name}
									/>
								</Link>
							)}
						</PhonesList>
						: <p>{"Loading"}</p>
			}
		</main>
	);
}

export default Home;

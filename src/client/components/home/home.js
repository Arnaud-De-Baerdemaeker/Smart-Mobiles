import React, {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";

import UserInput from "../userInput/userInput";

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

			{/* Search results */}
			{searchResult
				? <section>
					<h2>{searchResult.title}</h2>
					{searchResult.phones.map(phone =>
						<Link
							to={`/${phone.slug}`}
							onClick={() => acquirePhoneDetails(phone.detail)}
							key={phone.phone_name}
						>
							<section>
								<div>
									<img
										src={phone.image}
										alt={phone.phone_name}
									/>
								</div>
								<h3>{phone.phone_name}</h3>
							</section>
						</Link>
					)}
				</section>
				: null
			}

			{/* Latest phones */}
			{latestPhones
				? <section>
					<h2>{latestPhones.title}</h2>
					{latestPhones.phones.map(phone =>
						<Link
							to={`/${phone.slug}`}
							onClick={() => acquirePhoneDetails(phone.detail)}
							key={phone.phone_name}
						>
							<section>
								<div>
									<img
										src={phone.image}
										alt={phone.phone_name}
									/>
								</div>
								<h3>{phone.phone_name}</h3>
							</section>
						</Link>
					)}
				</section>
				: <p>{"Loading"}</p>
			}

			{/* Brand titles when option selected */}
			{brandTitle
				? <div>
					<h2>{brandTitle}</h2>
				</div>
				: null
			}

			{/* List of phones from a brand */}
			{phones
				? <div>
					{phones.map(phone =>
						<Link
							to={`/${phone.slug}`}
							onClick={() => acquirePhoneDetails(phone.detail)}
							key={phone.slug}
						>
							<section>
								<div>
									<img
										src={phone.image}
										alt={`${phone.brand} ${phone.phone_name}`}
									/>
								</div>
								<h3>{`${phone.brand} ${phone.phone_name}`}</h3>
							</section>
						</Link>
					)}
				</div>
				: null
			}
		</main>
	);
}

export default Home;

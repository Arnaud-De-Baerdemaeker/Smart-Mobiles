import React from "react";
import {Link} from "react-router-dom";

import PhonesList from "../phonesList/phonesList";
import Pagination from "../pagination/pagination";
import PhoneCard from "../phoneCard/phoneCard";

const Render = ({latestPhones, brandTitle, searchResult, phones, selectedBrand, setPhones, currentPage, setCurrentPage, totalPages, acquirePhoneDetails}) => {
	if(brandTitle && phones) {
		return <PhonesList title={brandTitle}>
			<Pagination
				selectedBrand={selectedBrand}
				setPhones={setPhones}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				totalPages={totalPages}
			/>
			{phones.map(phone =>
				<Link
					to={`/${phone.slug}`}
					onClick={() => acquirePhoneDetails(phone.detail)}
					key={phone.slug}
					className={"phonesList__link"}
				>
					<PhoneCard
						imgSrc={phone.image}
						imgAlt={`${phone.brand} ${phone.phone_name}`}
						title={`${phone.brand} ${phone.phone_name}`}
					/>
				</Link>
			)}
			<Pagination
				selectedBrand={selectedBrand}
				setPhones={setPhones}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				totalPages={totalPages}
			/>
		</PhonesList>;
	}
	else if(searchResult) {
		return <PhonesList title={searchResult.title}>
			{searchResult.phones.map(phone =>
				<Link
					to={`/${phone.slug}`}
					onClick={() => acquirePhoneDetails(phone.detail)}
					key={phone.slug}
					className={"phonesList__link"}
				>
					<PhoneCard
						imgSrc={phone.image}
						imgAlt={phone.phone_name}
						title={phone.phone_name}
					/>
				</Link>
			)}
		</PhonesList>;
	}
	else {
		if(latestPhones) {
			return <PhonesList title={latestPhones.title}>
				{latestPhones.phones.map(phone =>
					<Link
						to={`/${phone.slug}`}
						onClick={() => acquirePhoneDetails(phone.detail)}
						key={phone.slug}
						className={"phonesList__link"}
					>
						<PhoneCard
							imgSrc={phone.image}
							imgAlt={phone.phone_name}
							title={phone.phone_name}
						/>
					</Link>
				)}
			</PhonesList>;
		}
		else {
			return <div>{"Loading"}</div>;
		}
	}
};

export default Render;

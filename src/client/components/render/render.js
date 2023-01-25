/*
	Smart Mobiles
	Started on December 2022
	By Arnaud De Baerdemaeker
*/

import React from "react";
import {Link} from "react-router-dom";

import PhonesList from "../phonesList/phonesList";
import Pagination from "../pagination/pagination";
import PhoneCard from "../phoneCard/phoneCard";
import FailedFetch from "../failedFetch/failedFetch";

const Render = ({
	latestPhones,
	brandTitle,
	searchResult,
	phones,
	selectedBrandPagination,
	setPhones,
	currentPage,
	setCurrentPage,
	totalPages,
	acquirePhoneDetails,
	fetchError
}) => {
	if(brandTitle && phones) {
		document.title = `${brandTitle} | Smartmobiles`

		return(
			<PhonesList title={brandTitle}>
				<Pagination
					selectedBrandPagination={selectedBrandPagination}
					setPhones={setPhones}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					totalPages={totalPages}
				/>
				{phones.map(phone =>
					<Link
						to={`/${phone.slug}`}
						onClick={() => {
							acquirePhoneDetails(phone.detail);
							document.title = `${phone.phone_name} | Smartmobiles`;
						}}
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
					selectedBrandPagination={selectedBrandPagination}
					setPhones={setPhones}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					totalPages={totalPages}
				/>
			</PhonesList>
		);
	}
	else if(searchResult) {
		document.title = `${searchResult.title} | Smartmobiles`;

		return(
			<PhonesList title={searchResult.title}>
				{searchResult.phones.map(phone =>
					<Link
						to={`/${phone.slug}`}
						onClick={() => {
							acquirePhoneDetails(phone.detail);
							document.title = `${phone.phone_name} | Smartmobiles`;
						}}
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
			</PhonesList>
		);
	}
	else if(fetchError) {
		document.title = "Request failed | Smartmobiles";

		return(
			<PhonesList title={"Something went wrong..."}>
				<FailedFetch />
			</PhonesList>
		);
	}
	else if(latestPhones) {
		document.title = `${latestPhones.title} | Smartmobiles`;

		return(
			<PhonesList title={latestPhones.title}>
				{latestPhones.phones.map(phone =>
					<Link
					to={`/${phone.slug}`}
					onClick={() => {
						acquirePhoneDetails(phone.detail);
						document.title = `${phone.phone_name} | Smartmobiles`;
					}}
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
			</PhonesList>
		);
	}
};

export default Render;

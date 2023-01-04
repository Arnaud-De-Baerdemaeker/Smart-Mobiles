import React from "react";

import Button from "../button/button";

import {getPhonesFromBrand} from "../../apiCalls/fetchPhonesFromBrand";

const Pagination = ({selectedBrand, currentPage, setCurrentPage, totalPages, setPhones}) => {
	return(
		<div>
			<Button
				buttonType={"button"}
				buttonClick={() => {
					if(currentPage > 1) {
						getPhonesFromBrand(selectedBrand, currentPage - 1)
						.then(result => {
							setCurrentPage(result.data.data.current_page);
							setPhones(result.data.data.phones);
						})
						.catch(error => {
							console.log(error);
						})
					}
				}}
				buttonClass={""}
			>
				{"Previous page"}
			</Button>
			<Button
				buttonType={"button"}
				buttonClick={() => {
					if(currentPage < totalPages) {
						getPhonesFromBrand(selectedBrand, currentPage + 1)
						.then(result => {
							setCurrentPage(result.data.data.current_page);
							setPhones(result.data.data.phones);
						})
						.catch(error => {
							console.log(error);
						})
					}
				}}
				buttonClass={""}
			>
				{"Next page"}
			</Button>
		</div>
	);
};

export default Pagination;

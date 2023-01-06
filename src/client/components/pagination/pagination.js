import React from "react";

import Button from "../button/button";
import SVG from "../svg/svg";

import {getPhonesFromBrand} from "../../apiCalls/fetchPhonesFromBrand";

const Pagination = ({selectedBrand, currentPage, setCurrentPage, totalPages, setPhones, touchStartEffect, touchEndEffect}) => {
	return(
		<div className={"pagination"}>
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
				buttonTouchStart={touchStartEffect}
				buttonTouchEnd={touchEndEffect}
				buttonClass={"button__previous"}
			>
				<SVG
					viewbox={"-10 -10 70 70"}
					svgClass={"svg__previous"}
				>
					<path d={"M24.2929 31.2929L8 15C7.44772 14.4477 6.55228 14.4477 6 15C5.44772 15.5523 5.44771 16.4477 6 17L24.2929 35.2929C24.6834 35.6834 25.3166 35.6834 25.7071 35.2929L44 17C44.5523 16.4477 44.5523 15.5523 44 15C43.4477 14.4477 42.5523 14.4477 42 15L25.7071 31.2929C25.3166 31.6834 24.6834 31.6834 24.2929 31.2929Z"} />
				</SVG>
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
				buttonTouchStart={touchStartEffect}
				buttonTouchEnd={touchEndEffect}
				buttonClass={"button__next"}
			>
				<SVG
					viewbox={"-10 -10 70 70"}
					svgClass={"svg__next"}
				>
					<path d={"M24.2929 31.2929L8 15C7.44772 14.4477 6.55228 14.4477 6 15C5.44772 15.5523 5.44771 16.4477 6 17L24.2929 35.2929C24.6834 35.6834 25.3166 35.6834 25.7071 35.2929L44 17C44.5523 16.4477 44.5523 15.5523 44 15C43.4477 14.4477 42.5523 14.4477 42 15L25.7071 31.2929C25.3166 31.6834 24.6834 31.6834 24.2929 31.2929Z"} />
				</SVG>
			</Button>
		</div>
	);
};

export default Pagination;

/*
	Smart Mobiles
	Started on December 2022
	By Arnaud De Baerdemaeker
*/

import React, {useState} from "react";

import Header from "../header/header";
import Modal from "../modal/modal";
import Button from "../button/button";
import SVG from "../svg/svg";
import Footer from "../footer/footer";

const PhoneDetails = ({phoneDetails}) => {
	const [galleryModalState, setGalleryModalState] = useState(false);
	const [fullscreenModalState, setFullscreenModalState] = useState(false);
	const [clickedImage, setClickedImage] = useState({
		src: null,
		alt: null
	});

	const openGalleryModal = () => {
		setGalleryModalState(true);
	};

	const closeGalleryModal = () => {
		setGalleryModalState(false);
	};

	const transformTitle = (title) => {
		let splitWord = title.split("");
		let letters = [];

		splitWord.forEach(letter => {
			if(letter === " ") {
				letters.push(<span className={"space"}>{letter}</span>);
			}
			else {
				letters.push(<span className={"title"}>{letter}</span>);
			}
		});

		return <h3 className={"container__title"}>{letters}</h3>;
	};

	const openFullscreenModal = (click) => {
		setFullscreenModalState(true);
		setClickedImage({
			src: click.target.src,
			alt: click.target.alt
		});
	};

	const closeFullscreenModal = () => {
		setFullscreenModalState(false);
	};

	const touchStartEffect = (event) => {
		event.target.classList.add("touchButton--modal");

		if(event.target.children.length > 0) {
			event.target.childNodes[0].classList.add("touchSVG");
		}
	};

	const touchEndEffect = (event) => {
		event.target.classList.remove("touchButton--modal");

		if(event.target.children.length > 0) {
			event.target.childNodes[0].classList.remove("touchSVG");
		}
	};

	return(
		<>
			<Header />
			<main className={"phoneDetails"}>
				{phoneDetails
					? <>
						<h2 className={"phoneDetails__title"}>{`${phoneDetails.brand} ${phoneDetails.phone_name}`}</h2>
						<div className={"phoneDetails__presentation"}>
							<div className={"presentation"}>
								<div
									onClick={openGalleryModal}
									className={"presentation__thumbnailContainer"}
								>
									<img
										src={phoneDetails.thumbnail}
										alt={`${phoneDetails.brand} ${phoneDetails.phone_name}`}
										className={"presentation__thumbnail"}
									/>
								</div>
							</div>
							<div className={"informations"}>
								<dl>
									<dt>{"Brand"}</dt>
									<dd>{phoneDetails.brand}</dd>

									<dt>{"Phone name"}</dt>
									<dd>{phoneDetails.phone_name}</dd>

									<dt>{"Dimensions"}</dt>
									<dd>{phoneDetails.dimension}</dd>

									<dt>{"OS"}</dt>
									<dd>{phoneDetails.os}</dd>

									<dt>{"Storage"}</dt>
									<dd>{phoneDetails.storage}</dd>

									<dt>{"Release date"}</dt>
									<dd>{phoneDetails.release_date}</dd>
								</dl>
							</div>
						</div>
						<div className={"phoneDetails__specifications"}>
							{phoneDetails.specifications.map(specification =>
								<div
									key={specification.title}
									className={"specifications"}
								>
									<div className={"specifications__container"}>
										{transformTitle(specification.title)}
									</div>
									<dl>
										{specification.specs.map(spec =>
											<>
												<dt>{spec.key}</dt>
												{spec.val.map(value =>
													<dd>{value}</dd>
												)}
											</>
										)}
									</dl>
								</div>
							)}
						</div>

						{galleryModalState &&
							<Modal
								galleryModalState={galleryModalState}
								setGalleryModalState={setGalleryModalState}
								modalClass={"modal__gallery"}
							>
								<div className={"gallery"}>
									{phoneDetails.phone_images.map((image, index) =>
										<img
											key={image}
											src={image}
											alt={`${phoneDetails.brand} ${phoneDetails.phone_name}`}
											onClick={openFullscreenModal}
											className={`gallery__image image${index + 1}`}
										/>
									)}
								</div>
								<Button
									buttonType={"button"}
									buttonClick={closeGalleryModal}
									buttonTouchStart={touchStartEffect}
									buttonTouchEnd={touchEndEffect}
									buttonClass={"button__close"}
								>
									<SVG
										viewbox={"-6 -6 50 50"}
										svgClass={"svg__close"}
									>
										<path d="M7.5 6C6 4.49998 4.5 6 6 7.5L16.5 18L6.00004 28.5C4.50003 30 6.00007 31.5 7.50006 30L18 19.5L28.5 30C30 31.5 31.5 30 30 28.5L19.5 18L30 7.5C31.5 5.99997 30 4.49998 28.5 5.99998L18 16.5L7.5 6Z" />
									</SVG>
								</Button>
							</Modal>
						}

						{fullscreenModalState &&
							<Modal modalClass={"modal__fullscreen"}>
								<div className={"fullscreen"}>
									<img src={clickedImage.src} alt={clickedImage.alt} className={"fullscreen__image"} />
								</div>
								<Button
									buttonType={"button"}
									buttonClick={closeFullscreenModal}
									buttonTouchStart={touchStartEffect}
									buttonTouchEnd={touchEndEffect}
									buttonClass={"button__close"}
								>
									<SVG
										viewbox={"-6 -6 50 50"}
										svgClass={"svg__close"}
									>
										<path d="M7.5 6C6 4.49998 4.5 6 6 7.5L16.5 18L6.00004 28.5C4.50003 30 6.00007 31.5 7.50006 30L18 19.5L28.5 30C30 31.5 31.5 30 30 28.5L19.5 18L30 7.5C31.5 5.99997 30 4.49998 28.5 5.99998L18 16.5L7.5 6Z" />
									</SVG>
								</Button>
							</Modal>
						}
					</>
					: <p>{"Loading"}</p>
				}
			</main>
			<Footer />
		</>
	);
}

export default PhoneDetails;

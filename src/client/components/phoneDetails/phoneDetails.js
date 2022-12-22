import React, {useState} from "react";

import Header from "../header/header";
import Modal from "../modal/modal";
import Footer from "../footer/footer";

const PhoneDetails = ({phoneDetails}) => {
	const [modalState, setModalState] = useState(false);

	return(
		<>
			<Header />
			<main className={"phoneDetails"}>
				{phoneDetails
					? <>
						<h2 className={"phoneDetails__title"}>{`${phoneDetails.brand} ${phoneDetails.phone_name}`}</h2>
						<div className={"phoneDetails__presentation"}>
							<div
								onClick={() => setModalState(!modalState)}
								className={"presentation__thumbnailContainer"}
							>
								<img
									src={phoneDetails.thumbnail}
									alt={`${phoneDetails.brand} ${phoneDetails.phone_name}`}
									className={"presentation__thumbnail"}
								/>
							</div>
							<div className={"presentation__infos"}>
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
						<div>
							{phoneDetails.specifications.map(specification =>
								<section key={specification.title}>
									<h3>{specification.title}</h3>
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
								</section>
							)}
						</div>
						{modalState
							? <Modal
								modalState={modalState}
								images={phoneDetails.phone_images}
								name={`${phoneDetails.brand} ${phoneDetails.phone_name}`}
							/>
							: null
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

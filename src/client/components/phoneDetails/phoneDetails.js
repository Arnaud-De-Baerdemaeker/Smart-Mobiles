import React, {useState} from "react";

import Modal from "../modal/modal";

const PhoneDetails = ({phoneDetails}) => {
	const [modalState, setModalState] = useState(false);

	return(
		<main>
			{phoneDetails
				? <>
					<h2>{`${phoneDetails.brand} ${phoneDetails.phone_name}`}</h2>
					<div>
						<div onClick={() => setModalState(!modalState)}>
							<img
								src={phoneDetails.thumbnail}
								alt={`${phoneDetails.brand} ${phoneDetails.phone_name}`}
							/>
						</div>
						<div>
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
	);
}

export default PhoneDetails;

import React from "react";

const PhoneDetails = ({phoneDetails}) => {
	return(
		<main>
			{phoneDetails
				? <>
					<h2>{`${phoneDetails.brand} ${phoneDetails.phone_name}`}</h2>
					<div>
						<div>
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
						
					</div>
				</>
				: <p>{"Loading"}</p>
			}
		</main>
	);
}

export default PhoneDetails;
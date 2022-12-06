import React from "react";

const Modal = ({phoneDetails}) => {
	return(
		<section>
			{phoneDetails
				? <>
					<h2>{`${phoneDetails.brand} ${phoneDetails.phone_name}`}</h2>
					<div>
						<div>
							{phoneDetails.thumbnail
								? <img src={phoneDetails.thumbnail} alt={`${phoneDetails.brand} ${phoneDetails.phone_name}`} />
								: null
							}
						</div>
						<div>
							<dl>
								<dt>{"Brand"}</dt>
								<dd>{phoneDetails.brand}</dd>

								<dt>{"Phone Name"}</dt>
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
				</>
				: null
			}
		</section>
	);
}

export default Modal;
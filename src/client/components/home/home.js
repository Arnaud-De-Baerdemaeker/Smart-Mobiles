import React, {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";

import {getAllBrands} from "../../apiCalls/fetchAllBrands";
import {getPhonesFromBrand} from "../../apiCalls/fetchPhonesFromBrand";

const Home = ({acquirePhoneDetails}) => {
	const [brands, setBrands] = useState([]);
	const [brandTitle, setBrandTitle] = useState(null);
	const [phones, setPhones] = useState(null);
	const dropDown = useRef(null);

	const getOption = () => {
		let selected = dropDown.current.value;

		getPhonesFromBrand(selected)
		.then(result => {
			setBrandTitle(result.data.data.title);
			setPhones(result.data.data.phones);
		});
	}

	useEffect(() => {
		getAllBrands()
		.then(result => {
			setBrands(result.data.data);
		});
	}, []);

	return(
		<main>
			<div>
				<label htmlFor={"brandSelection"}>{"Select a brand"}</label>
				<select name={"brands"} id={"brandSelection"} ref={dropDown}>
					<option value={""}>{"Please choose an option"}</option>
					{brands.length && brands.map(item => 
						<option value={item.brand_slug} key={item.brand_id}>{item.brand_name}</option>
					)}
				</select>
				<button onClick={getOption}>{"Validate"}</button>
			</div>

			<div>
				{brandTitle
					? <h2>{brandTitle}</h2>
					: null
				}
			</div>

			<div>
				{phones
					? phones.map(phone =>
						<Link
							to={"/phone-details"}
							onClick={() => acquirePhoneDetails(phone.detail)}
							key={phone.slug}
						>
							<section>
								<div>
									<img src={phone.image} alt={`${phone.brand} ${phone.phone_name}`} />
								</div>
								<h3>{phone.brand + phone.phone_name}</h3>
							</section>
						</Link>
					)
					: null
				}
			</div>
		</main>
	);
}

export default Home;
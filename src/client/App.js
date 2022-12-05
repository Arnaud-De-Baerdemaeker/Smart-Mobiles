import React, {useState, useEffect, useRef} from "react";

import Modal from "./components/modal/modal";

import {getAllBrands} from "./apiCalls/fetchAllBrands";
import {getPhonesFromBrand} from "./apiCalls/fetchPhonesFromBrand";
import {getPhoneDetails} from "./apiCalls/fetchPhoneDetails";

const App = () => {
	const [brands, setBrands] = useState([]);
	const [brandTitle, setBrandTitle] = useState(null);
	const [phones, setPhones] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const dropDown = useRef(null);

	const getOption = () => {
		let selected = dropDown.current.value;

		getPhonesFromBrand(selected)
		.then(result => {
			setBrandTitle(result.data.data.title);
			setPhones(result.data.data.phones);
		});
	}

	const acquirePhoneDetails = (url) => {
		return () => {
			getPhoneDetails(url)
			.then(result => console.log(result.data.data));
		}
	}

	const toggleModal = () => {
		setIsModalOpen({isModalOpen: !isModalOpen});
	}

	useEffect(() => {
		getAllBrands()
		.then(result => {
			setBrands(result.data.data);
		});
	}, []);

	return (
		<div className={"App"}>
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
							<section onClick={toggleModal} key={phone.slug}>
								<div>
									<img src={phone.image} alt={phone.brand + phone.phone_name + " image"} />
								</div>
								<h3>{phone.brand + phone.phone_name}</h3>
							</section>
						)
						: null
					}
					<Modal />
				</div>
			</main>
		</div>
	);
}

export default App;
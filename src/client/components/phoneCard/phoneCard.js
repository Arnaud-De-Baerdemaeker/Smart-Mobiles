import React from "react";

const PhoneCard = ({imgSrc, imgAlt, title}) => {
    return(
        <section>
            <div>
                <img src={imgSrc} alt={imgAlt} />
            </div>
            <h3>{title}</h3>
        </section>
    );
}

export default PhoneCard;

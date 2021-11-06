import React from "react";
import { useState } from "react/cjs/react.development";
import "./card.styles.scss";

import CardDetailModal from "./card-detail-modal/card-detail-modal.componen";

const Card = (props) => {
  const [showCardDetails, setShowCardDetails] = useState(false);

  return (
    <>
      <button
        className={`card ${props.className}`}
        onClick={() => setShowCardDetails(true)}
      >
        {props.title}
      </button>

      <CardDetailModal  
        visible={showCardDetails}
        onOk={() => setShowCardDetails(false)}
        onCancel={() => setShowCardDetails(false)}
      />
    </>
  );
};

export default Card;

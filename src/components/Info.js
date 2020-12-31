import React from "react";

const Info = ({ info, title }) => {
  return (
    <div className="title">
      {title}: <span className="info">{info}</span>
    </div>
  );
};

export default Info;

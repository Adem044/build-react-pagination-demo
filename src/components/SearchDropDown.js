import React from "react";
import Flag from "react-flags";

const SearchDropDown = ({ search, countries, clickHandler }) => {
  return (
    <div
      className="search-dropdown"
      hidden={countries.length && search ? false : true}
    >
      {countries.map(({ cca2: code2 = "", region = null, name = {} }) => (
        <div
          className="search-item"
          key={code2}
          onClick={() => {
            clickHandler(code2);
          }}
        >
          <Flag
            country={code2}
            format="png"
            pngSize={64}
            basePath="./img/flags"
            className="d-block h-100"
          />
          <div className="search-item-content">
            <h3>{name.common}</h3>
            <h5>{region}</h5>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchDropDown;

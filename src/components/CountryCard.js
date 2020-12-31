import React from "react";
import Info from "./Info";
import PropTypes from "prop-types";
import Flag from "react-flags";

const CountryCard = ({ country, showFullInfo, clickHandler, code }) => {
  const {
    cca2: code2 = "",
    capital,
    currency,
    languages,
    region = null,
    name = {},
  } = country || {};
  const showFull = showFullInfo === code2 || code === code2;
  return (
    <div
      className={`country-card ${showFull ? "show-full-info" : ""}`}
      onClick={() => clickHandler(code2)}
    >
      <div className={`${showFull ? "w-50 flex-column" : "h-100"}  d-flex`}>
        <div
          className={`${
            showFull ? "w-100 h-maxCont" : "h-100"
          }  border-gray px-2 bg-white rounded-left`}
        >
          <Flag
            country={code2}
            format="png"
            pngSize={64}
            basePath="./img/flags"
            className={`${showFull ? "w-100" : "h-100"} d-block`}
          />
        </div>
        <div
          className={`d-flex flex-column justify-content-center ${
            showFull ? "align-items-center mt-2" : "pl-3"
          }`}
        >
          <span className="country-name text-dark font-weight-bold mb-2">
            {name.common}
          </span>
          <span className="country-region text-secondary text-uppercase">
            {region}
          </span>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center pl-3">
        <div hidden={!showFull}>
          {[capital, currency].map((info, id) => (
            <Info key={id} info={info} title={["Capital", "Currency"][id]} />
          ))}
          <div className="d-flex flex-row flex-wrap">
            <span className="country-name text-dark font-weight-bold">{`Languages: `}</span>
            <ul>
              {Object.values(languages).map((lang, idx) => (
                <li className="country-name" key={idx}>
                  {`${lang}`}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

CountryCard.propTypes = {
  country: PropTypes.shape({
    cca2: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    name: PropTypes.shape({
      common: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CountryCard;
// const [ShouldUpdate, setShould] = useState(showFullInfo === code2);
// useEffect(() => {setShould(showFullInfo === code2)}, [ShouldUpdate]);
// console.log("UPDATED");
/* <div className="d-flex flex-row mb-1">
            <span className="country-name text-dark font-weight-bold">
              Capital:{" "}
            </span>
            <span className="country-name">{capital}</span>
          </div>
          <div className="d-flex flex-row mb-1">
            <span className="country-name text-dark font-weight-bold">
              Currency:{" "}
            </span>
            <span className="country-name">{currency}</span>
          </div> */
/* <div className="px-3 d-flex flex-column">
          <div className="d-flex flex-row mb-1">
            <span className="country-name text-dark font-weight-bold">
              Capital:{" "}
            </span>
            <span className="country-name">{capital}</span>
          </div>
          <div className="d-flex flex-row mb-1">
            <span className="country-name text-dark font-weight-bold">
              Currency:{" "}
            </span>
            <span className="country-name">{currency}</span>
          </div>
          <div className="d-flex flex-row flex-wrap">
            <span className="country-name text-dark font-weight-bold">{`Languages: `}</span>

            {Object.values(languages).map((lang, idx) => (
              <span className="country-name" key={idx}>
                {`${lang} `}
              </span>
            ))}
          </div> 
         </div> */

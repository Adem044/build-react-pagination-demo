import React, { Component } from "react";
import Countries from "countries-api";
import "./App.css";
import SearchDropDown from "./components/SearchDropDown";

import Pagination from "./components/Pagination";
import CountryCard from "./components/CountryCard";

class App extends Component {
  state = {
    allCountries: [],
    currentCountries: [],
    currentPage: null,
    totalPages: null,
    showFullInfo: "",
    current: "",
    search: "",
  };

  componentDidMount() {
    const { data: allCountries = [] } = Countries.findAll();
    this.setState({ allCountries });
  }

  onPageChanged = (data) => {
    const { allCountries } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentCountries = allCountries.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentCountries, totalPages });
  };
  clickHandler = (code2) => {
    this.setState({ showFullInfo: code2, current: "" });
  };
  handleChange = (ev) => {
    this.setState({ search: ev.target.value });
  };

  searchClickHandler = (code) => {
    const { allCountries } = this.state;
    let countryId;
    allCountries.forEach((country, id) => {
      if (country.cca2 === code) countryId = id;
    });
    const currentPage = Math.floor(countryId / 18) + 1;
    const offset = (currentPage - 1) * 18;
    const currentCountries = allCountries.slice(offset, offset + 18);
    this.setState({ currentPage, currentCountries, current: code, search: "" });
  };

  render() {
    const {
      allCountries,
      currentCountries,
      currentPage,
      totalPages,
      search,
      showFullInfo,
      current,
    } = this.state;
    const totalCountries = allCountries.length;
    if (totalCountries === 0) return null;
    const filteredCountries = allCountries.filter((country) => {
      return country.name.common.toLowerCase().includes(search.toLowerCase());
    });
    const headerClass = [
      "text-dark py-2 pr-4 m-0",
      currentPage ? "border-gray border-right" : "",
    ]
      .join(" ")
      .trim();
    return (
      <div
        onClick={(ev) => {
          if (!ev.target.closest(".search-box")) this.setState({ search: "" });
        }}
        className="container mb-5"
      >
        <div className="row d-flex flex-row py-5">
          <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <h2 className={headerClass}>
                <strong className="text-secondary">{totalCountries}</strong>{" "}
                Countries
              </h2>

              {currentPage && (
                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Page <span className="font-weight-bold">{currentPage}</span> /{" "}
                  <span className="font-weight-bold">{totalPages}</span>
                </span>
              )}
            </div>

            <div className="d-flex flex-row py-4 align-items-center">
              <Pagination
                totalRecords={totalCountries}
                pageLimit={18}
                pageNeighbours={1}
                goTo={currentPage}
                onPageChanged={this.onPageChanged}
              />
            </div>
            <div className="search-box position-relative">
              <input type="search" onChange={(ev) => this.handleChange(ev)} />
              <SearchDropDown
                countries={filteredCountries}
                search={search}
                clickHandler={this.searchClickHandler}
              />
            </div>
          </div>
          <div className="country-cards">
            {currentCountries.map((country) => (
              <CountryCard
                clickHandler={this.clickHandler}
                showFullInfo={showFullInfo}
                key={country.cca3}
                country={country}
                code={current}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

import React from "react";

const UserQuotes = ({
  quoteInput,
  setQuoteInput,
  saveUserQuote,
  searchInput,
  setSearchInput,
  filteredUserQuotes,
}) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Enter your quote"
        value={quoteInput}
        onChange={(e) => setQuoteInput(e.target.value)}
      />
      <button className="button" onClick={saveUserQuote}>
        Save Quote
      </button>
      <input
        type="text"
        placeholder="Search your quotes"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <div id="user-quotes" className="quote-section">
        {filteredUserQuotes.map((quote, index) => (
          <div key={index} className="quote">
            {quote}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserQuotes;

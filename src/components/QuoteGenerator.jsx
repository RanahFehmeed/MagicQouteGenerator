import React from "react";

const QuoteGenerator = ({ generateMagicQuote, magicQuote }) => {
  return (
    <div>
      <button className="button" onClick={generateMagicQuote}>
        Generate Magic Quote
      </button>
      <div id="magic-quote" className="quote-section">
        {magicQuote}
      </div>
    </div>
  );
};

export default QuoteGenerator;

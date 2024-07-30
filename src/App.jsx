import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthForm from "./components/AuthForm";
import QuoteGenerator from "./components/QuoteGenerator";
import UserQuotes from "./components/UserQuotes";
import "./App.css";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [magicQuote, setMagicQuote] = useState("");
  const [userQuotes, setUserQuotes] = useState([]);
  const [quoteInput, setQuoteInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filteredUserQuotes, setFilteredUserQuotes] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const cachedQuotes = localStorage.getItem("quotes");
    if (cachedQuotes) {
      setQuotes(JSON.parse(cachedQuotes));
    } else {
      fetchQuotes();
    }
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(user);
      loadUserQuotes(user);
    }
  }, []);

  useEffect(() => {
    setFilteredUserQuotes(
      userQuotes.filter((quote) =>
        quote.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  }, [searchInput, userQuotes]);

  const fetchQuotes = async () => {
    try {
      const response = await axios.get("https://type.fit/api/quotes");
      setQuotes(response.data);
      localStorage.setItem("quotes", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  const generateMagicQuote = () => {
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setMagicQuote(quotes[randomIndex].text);
    }
  };

  const saveUserQuote = () => {
    if (quoteInput.trim() !== "") {
      const updatedQuotes = [...userQuotes, quoteInput];
      setUserQuotes(updatedQuotes);
      updateUserQuotes(currentUser, updatedQuotes);
      setQuoteInput("");
    }
  };

  const updateUserQuotes = (user, quotes) => {
    const userData = JSON.parse(localStorage.getItem(user));
    userData.quotes = quotes;
    localStorage.setItem(user, JSON.stringify(userData));
  };

  const loadUserQuotes = (user) => {
    const userData = JSON.parse(localStorage.getItem(user));
    setUserQuotes(userData.quotes || []);
  };

  const handleAuth = (username, password, isSignUp) => {
    if (isSignUp) {
      signUp(username, password);
    } else {
      login(username, password);
    }
  };

  const signUp = (username, password) => {
    if (localStorage.getItem(username)) {
      alert("Username already exists");
      return;
    }

    localStorage.setItem(username, JSON.stringify({ password, quotes: [] }));
    alert("Sign Up successful, please log in");
  };

  const login = (username, password) => {
    const userData = JSON.parse(localStorage.getItem(username));

    if (!userData || userData.password !== password) {
      alert("Invalid credentials");
      return;
    }

    setCurrentUser(username);
    localStorage.setItem("currentUser", username);
    loadUserQuotes(username);
  };

  const logout = () => {
    setCurrentUser(null);
    setUserQuotes([]);
    localStorage.removeItem("currentUser");
  };

  return (
    <div className="App">
      {!currentUser ? (
        <div className="auth-section">
          <h1>Quote App</h1>
          <AuthForm onAuth={handleAuth} />
        </div>
      ) : (
        <div className="main-section">
          <h1>Welcome, {currentUser}</h1>
          <QuoteGenerator
            generateMagicQuote={generateMagicQuote}
            magicQuote={magicQuote}
          />
          <UserQuotes
            quoteInput={quoteInput}
            setQuoteInput={setQuoteInput}
            saveUserQuote={saveUserQuote}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            filteredUserQuotes={filteredUserQuotes}
          />
          <button className="button" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

import React, { useState, useRef } from 'react';
import './SearchBar.css'; // Import your CSS for styling
import { useHotkeys } from 'react-hotkeys-hook';



const SearchBar = (props) => {
  // props Destructuring
  const { setsearch,data } = props;

  // States Used
  const [input, setInput] = useState("");

  // Use Ref hook
  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  // We use useRef hook here to select the text on click as ref hook is used to access DOM element in React

  // Handling Search Button
  const handleSearch = () => {
    setsearch({...data,search:input});
  }

  const handleClick = () => {
    if (inputRef) {
      inputRef.current.select();
    }
  }
// Hotkeys enbkes using react-hotkeys-hook package
  useHotkeys('enter',()=>{
    buttonRef.current.click();
  },{
    enableOnFormTags:true
  })


  return (
    <>
        <div className="search-bar-container search">
          <input
            type="text"
            ref={inputRef}
            className="search-input"
            placeholder="Search..."
            value={input}
            onChange={(e) => { setInput(e.target.value) }}
            onClick={handleClick}
          />
          <button className="search-button" ref={buttonRef} onClick={handleSearch}>
            Search
          </button>
        </div>
    </>
  );
};

export default SearchBar;

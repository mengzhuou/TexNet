import React, { useState } from 'react';
import './UniversalSearch.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UniversalSearch = ({ onSearch, placeholder = "Search..." }) => {
   const [query, setQuery] = useState('');
   const [isFocused, setIsFocused] = useState(false); 

   const handleChange = (e) => {
       const value = e.target.value;
       setQuery(value); 
       if (onSearch) onSearch(value);
   };

   const handleBlur = () => {
       setIsFocused(false);
       if (query === '') setQuery('');
   };

   const handleFocus = () => setIsFocused(true);

   return (
        <div className="universal-search-container">
            <input
                type="text"
                className="universal-search-input"
                placeholder={isFocused ? '' : placeholder}
                value={query}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
            />
            <FontAwesomeIcon className="universal-search-button" icon={faSearch} />
        </div>
   );
};

export default UniversalSearch;

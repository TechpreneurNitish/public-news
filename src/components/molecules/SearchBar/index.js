import React from 'react'
import './SearchBar.css'
const SearchBar = ({ keyword, setKeyword }) => {
    return (
        <div className="searchBar">
            <form>
                <input
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    aria-label="Search"
                />
            </form>
        </div>
    )
}

export default SearchBar

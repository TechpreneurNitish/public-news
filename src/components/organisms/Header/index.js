import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = ({ keyword, setKeyword }) => {
    return (
        <header>
            <div className="headerCnt container-fluid">
                <Link to="/">News App</Link>
            </div>
        </header>
    )
}

export default Header

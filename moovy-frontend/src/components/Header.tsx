import React from 'react';
import { Link } from 'react-router-dom';

function Logout() {
    sessionStorage.clear();
    window.location.href = '/';
}

export const Header = () => {
    return (
        <header>
            <div className='container'>
                <div className='inner-content'>
                    <div className='brand'>
                        <Link to='/'>WatchList</Link>
                    </div>

                    <ul className='nav-links'>
                        <li>
                            <Link to='/'>Dashboard</Link>
                        </li>
                        <li>
                            <Link to='/add' className='btn btn-main'>
                                Search
                            </Link>
                        </li>
                        <li>
                            <button
                             className='btn'
                             onClick={() => Logout()}
                            >
                                Logout
                            </button>
                        </li>

                    </ul>
                </div>
            </div>
        </header>
    );
};
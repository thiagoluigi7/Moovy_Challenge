import React, { useState } from 'react';
import { ResultCard } from './ResultCard';

// import IMDB_API from './App/App';
const IMDB_API = "http://www.omdbapi.com/?apikey=39c17bb5&";

export const Add = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const onChange = (e) => {
        e.preventDefault();

        setQuery(e.target.value);

        if(query.length > 4) {

            fetch(`${IMDB_API}s=${e.target.value}`, {
                method: 'GET'
            }) 
            .then ((res) => res.json())
            .then ((data) => {
                // console.log(data.Search);
                if (data.Response === 'True') {
                    setResults(data.Search);
                } else {
                    setResults([]);
                }
            });
        }
    };

    return (
        <div className='add-page'>
            <div className='container'>
                <div className='add-content'>
                    <div className='input-wrapper'>
                        <input
                         type='text'
                         placeholder='Search for a movie'
                         value={query}
                         onChange={onChange}
                         />
                    </div>

                    {results.length > 0 && (
                        <ul className='results'>
                            {results.map((movie) => (
                                
                                <li key={movie.imdbID}>
                                    <ResultCard movie={movie} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};
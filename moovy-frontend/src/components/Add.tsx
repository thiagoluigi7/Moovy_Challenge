import React, { useState } from 'react';
import { ResultCard } from './ResultCard';

import IMDB_API from './App/App';

export const Add = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const onChange = (e: { preventDefault: () => void; target: { value: React.SetStateAction<string>; }; }) => {
        e.preventDefault();

        setQuery(e.target.value);

        fetch(
            `${IMDB_API}s=${e.target.value}`
        ) 
        .then ((res) => res.json())
        .then ((data) => {
            if (!data.errors) {
                setResults(data.results);
            } else {
                setResults([]);
            }
        });
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
                                {/*//@ts-ignore*/}
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
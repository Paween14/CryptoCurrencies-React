import React from 'react';

const SortButtons = props => {
    const {sortByName, sortByRank, sortByPrice, refreshButton} = props;

    return (
        <div className="sort-buttons">
            <button onClick={ sortByName } >Sort by Name</button>
            <button onClick={ sortByRank } >Sort by Rank</button>
            <button onClick={ sortByPrice } >Sort by Price</button> 
            <i className="fas fa-sync-alt icon" onClick={ refreshButton }></i>
        </div>
    );
}

export default SortButtons;
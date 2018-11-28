import React from 'react';

const NoResult = props => {
    // const {} = props;
    
    return (
        <li className='no-gifs'>
            <p><i class="fas fa-robot"></i></p>
            <h3 className="oops">Oops!</h3>
            <h3 className="no-result-found">No Results Found</h3>
            <p>We can't seem to find the coin(s) you're looking for.</p>
        </li> 
    );
}

export default NoResult;
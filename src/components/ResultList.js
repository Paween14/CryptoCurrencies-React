import React from 'react';
import NoResult from './NoResult';
import DisplayCrypto from './DisplayCrypto';

const ResultList = props => {
    const {data, redOrGreenNumber, numberWithCommas} = props;
    
    let  results;
    if (data.length > 0) {
        results = data.map( (crypto, index) => 
            <DisplayCrypto 
                cryptoData={ crypto } 
                redOrGreenNumber={ redOrGreenNumber }  
                numberWithCommas={ numberWithCommas } 
                key={ index } 
            />);
    } else {
        results = <NoResult />;
    }

    return (
        <ul>
            {results}
        </ul>
    );
}

export default ResultList;
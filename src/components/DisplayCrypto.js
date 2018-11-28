import React from 'react';
import CryptoIcon from 'react-webfont-cryptocoins'   //https://github.com/keyvanm/react-webfont-cryptocoins

const DisplayCrypto = props => {
    const { cryptoData, redOrGreenNumber, numberWithCommas } = props;

    return (
        <li>
            <div className="coin-log-rank">
                <CryptoIcon coin={ cryptoData.symbol } />
                <p className="crypto-name"><span>{ cryptoData.symbol }</span> | { cryptoData.name }</p>
                <p className="crypto-rank">Rank: #{ cryptoData.rank }</p>
            </div>
            <div>
                <p>Price: $ { (parseFloat(cryptoData.price_usd) > 0 && parseFloat(cryptoData.price_usd) < 1)
                                ? parseFloat(cryptoData.price_usd).toFixed(6)
                                : numberWithCommas(parseFloat(cryptoData.price_usd).toFixed(2)) }</p>
                <p>Market Cap: $ { numberWithCommas(parseFloat(cryptoData.market_cap_usd).toFixed(2)) }</p>
                <p>Volume(24h): $ { numberWithCommas(parseFloat(cryptoData["24h_volume_usd"]).toFixed(2)) }</p>
                { redOrGreenNumber(cryptoData.percent_change_24h) }
            </div>
        </li>
    );
}

export default DisplayCrypto;

// way to get the property key that starts with a number? --> using bracket notation!! ex. myObject["myProperty"]
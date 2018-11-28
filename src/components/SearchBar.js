import React, { Component } from 'react';

class SearchBar extends Component {
    // const {} = this.props;

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSearch(this.props.searchValue);
        // e.currentTarget.reset();
    }

    render() {
        const { searchValue, onChange } = this.props;

        return (
            <form onSubmit={ this.handleSubmit } >
                {/* <label htmlFor="search">Search</label> */}
                <input 
                    type="search" 
                    name="search" 
                    value={ searchValue }
                    onChange={ onChange }
                    placeholder="Search Coins" />
                <button type="submit" id="submit" className="search-button"><i className="fa fa-search"></i></button>
            </form>
        );
    }
    
}

export default SearchBar;

// this.props.onSearch(this.search.value);

// ref={(input) => this.search = input}

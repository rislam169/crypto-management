import React from 'react';
import { withRouter } from 'react-router-dom';
import { API_URL } from '../../config';
import { handleResponse } from '../../helper';
import './Search.css';
import Loading from './Loading';

class Search extends React.Component {
    constructor() {
        super();

        this.state = {
            searchResults: [],
            loading: false,
            searchKey: ''
        }
    }

    handleChange = (event) => {
        const searchKey = event.target.value;
        
        this.setState({ searchKey }, () => {})

        if (!searchKey) {
            return '';
        }

        this.setState({ loading: true })

        fetch(`${API_URL}/autocomplete?searchQuery=${searchKey}`)
            .then(handleResponse)
            .then((result) => {
                this.setState({ 
                    loading: false,
                    searchResults: result
                })
            })
        
    }

    handleRedirect = (currencyId) => {
        //Clear input calue and close autocomplete container
        this.setState({
            searchKey: '',
            searchResults: [],
        })

        this.props.history.push(`/currency/${currencyId}`);        
    }

    renderSearchResult = () => {
        const { searchResults, searchKey, loading } = this.state; 

        if (!searchKey) {
            return '';
        }
        
        if (searchResults.length > 0) {
            return (
                <div className="Search-result-container">
                    {searchResults.map(result => (
                        <div 
                            key={result.id}
                            className="Search-result"
                            onClick={() => this.handleRedirect(result.id)}
                        >
                            {result.name} ({result.symbol})
                        </div>
                    ))}
                </div>
            )
        }

        if (!loading) {
            return (
                <div className="Search-result-container">
                    <div className="Search-no-result">
                        No results found
                    </div>
                </div>            
            )
        }
        
    }

    render() {
        const { loading, searchKey } = this.state;

        return (
            <div className="Search">
                <span className="Search-icon" />
                <input className="Search-input" type="text" placeholder="Currency name" onChange={this.handleChange} value={searchKey}/>
                {loading &&
                    <div className="Search-loading">
                        <Loading 
                            width="12px"
                            height="12px"
                        />
                    </div>
                }
                {this.renderSearchResult()}
            </div>
        )
    }
}

export default withRouter(Search);
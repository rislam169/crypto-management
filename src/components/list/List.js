import React from 'react';
import { handleResponse } from '../../helper';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import Table from './Table'
import Pagination from './Pagination'

class List extends React.Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            currencies: [],
            error: null,
            page: 1,
            totalPages: 0
        }
    }

    componentDidMount() {
        this.fetchCurrencies();
    }

    fetchCurrencies = () => {
        this.setState({ loading: true });

        const {page} = this.state;
         
        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
        .then(handleResponse)
        .then((data) => {
            const {currencies, page, totalPages} = data;
            
            this.setState({ 
                currencies: currencies, 
                loading: false,
                page: page,
                totalPages: totalPages
            });
        })
        .catch((error) => {
            this.setState({ error: error.errorMessage, loading: false });
        });
    }

    handlePaginationClick = (direction) => {
        let nextPage = this.state.page;

        nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;
        
        this.setState({ page: nextPage }, () => {            
            this.fetchCurrencies();
        });        
    }

    render() {
        const { loading, error, currencies, page, totalPages } = this.state;

        //Render only loading component, If loading state is set to true
        if(loading) {
            return <div className="loading-container"><Loading /></div>
        }

        //Render only error message, If error occured while fetching data
        if (error) {
            return <div className="error">{this.state.error}</div>
        }

        return (
            <div>
                <Table 
                    currencies={currencies}
                />
                <Pagination 
                    page={page} 
                    totalPages={totalPages}
                    handlePaginationClick={this.handlePaginationClick}
                />
            </div>
            
        );
    }
}

export default List;
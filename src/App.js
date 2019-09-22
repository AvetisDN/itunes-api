import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import ResultItem from './components/result-item';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.onTermChange = this.onTermChange.bind(this);
        this.onLimitChange = this.onLimitChange.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.state = {
            page: 0,
            limit: 9,
            data: [],
            term: '2019'
        };
    }

    onSubmitHandler(e) {
        e.preventDefault();
        this.setState({
            page: 0
        }, () => {
            this.getData()
        });
    }

    onTermChange(e) {
        this.setState({
            term: e.target.value
        });
    }

    onLimitChange(e) {
        this.setState({
            limit: e.target.value
        }, () => {
            this.getData()
        });
    }

    onPageChange(e){
        this.setState({
            page: e.target.getAttribute('data-number')
        }, () => {
            this.getData()
        });
    }

    getData() {
        axios.get(`https://itunes.apple.com/search?term=${this.state.term}&limit=${this.state.limit}&offset=${this.state.page * this.state.limit}&media=music`)
            .then(response => {
                // console.log(response.data.results);
                this.setState({
                    data: response.data.results
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    getNumbers() {
        let numbers = [];
        let display = '';
        for (let i=this.state.page*1 + 1; i<=this.state.page*1 + 5; i++) {
            numbers.push(i);
        }
        display = numbers.map((element,index) => {
            let className = 'itunes-pagination-btn';
            if(element - 1 == this.state.page) className += ' active';
            return(
                <button className={className} key={index} data-number={index} onClick={this.onPageChange}>{element}</button>
            )
        });
        return display
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        let items = '';
        if (this.state.data.length > 0) {
            items = this.state.data.map((element, index) => {
                // console.log(element);
                return (
                    <ResultItem data={element} key={index} delay={(index+1)*100} />
                );
            })
        }
        let isPrevBtnDisabled = false;
        if(this.state.page == 0) isPrevBtnDisabled = true;
        return (
            <div className="itunes-wrapper">

                <form onSubmit={this.onSubmitHandler}>
                    <div className="itunes-search-form">
                        <input className="itunes-search-text" required type="text" value={this.state.term}
                               placeholder="Search for..." onChange={this.onTermChange}/>
                        <button className="itunes-search-btn">Search...</button>
                    </div>
                </form>

                <div className="itunes-pagination">
                    <div className="itunes-pagination-select">
                        <select onChange={this.onLimitChange}>
                            <option value='9'>9</option>
                            <option value='12'>12</option>
                            <option value='15'>15</option>
                            <option value='18'>18</option>
                        </select>
                    </div>
                    <div className="itunes-pagination-numbers">
                        <button className="itunes-pagination-btn" data-number={this.state.page - 1} onClick={this.onPageChange} disabled={isPrevBtnDisabled}>&lt;</button>
                        {this.getNumbers()}
                        <button className="itunes-pagination-btn" data-number={this.state.page*1 + 1} onClick={this.onPageChange}>&gt;</button>
                    </div>
                </div>

                <div className="itunes-results">
                    {items}
                </div>

            </div>
        );
    }
}

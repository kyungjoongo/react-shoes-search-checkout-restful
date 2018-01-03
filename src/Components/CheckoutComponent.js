import React, {Component} from 'react';
import '../App.css';
import {blue500, orange500} from 'material-ui/styles/colors';
import sheos_list from './data.json'
import SearchBar from 'material-ui-search-bar'

import axios from 'axios'
import {
    TextField, CircularProgress, IconButton, GridList, GridTile, Subheader, SelectField, MenuItem,
    RaisedButton, Table, TableBody, TableHeader,
    TableHeaderColumn, TableRow, TableRowColumn, Dialog,
    FlatButton, Snackbar, FontIcon
} from 'material-ui'
import InfiniteScroll from 'react-infinite-scroller';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ScrollUpButton from "react-scroll-up-button";
import {BrowserRouter as Router, Link, Route, withRouter} from 'react-router-dom';


var FontAwesome = require('react-fontawesome');

const style = {
    marginRight: 20
};

class CheckoutComponent extends Component {
    constructor(props) {
        super();
        this.state = {
            snackbarOpen: false,
            results: [],
            selectedText: 'rel',
            loading: false,
            loading4: false,
            open: false,
            query: '페가수스 33',
            input1: '',
            fullItems: [],
            curPage: 0,
            sort: 'rel',
            url: 'http://kyungjoon.ipdisk.co.kr:5000/checkout'
        };


    }

    componentDidMount() {
        this.getSearchList();
    }

    clickedNext() {

        console.log(this.state.input1);
        this.setState({
            curPage: this.state.curPage + 1,
            query: this.state.query
        }, () => {
            this.getList()
        });
    }

    clickedFab() {
        window.scrollTo(0, 0)
    }

    clickedPrev() {

        if (this.state.curPage === 1) {
            this.setState({
                snackbarOpen: true,
            });

            return false;
        }

        console.log(this.state.input1);
        this.setState({
            curPage: this.state.curPage - 1,
            query: this.state.query
        }, () => {
            this.getList()
        });
    }

    getSearchList() {

        if (this.state.curPage === 0) {
            this.setState({
                input1: '아디다스 슈퍼노바'
            })
        }

        console.log(this.state.input1);

        this.setState({
            curPage: 1,
            query: this.state.input1
        }, () => {

            this.getList()

        });
    }


    getList() {
        this.setState({
            loading: true
        });
        const completeUrl = this.state.url + "?page=" + this.state.curPage + "&query=" + this.state.input1 + "&sort=" + this.state.sort;

        console.log('##############completeUrlcompleteUrl#######' + completeUrl);

        axios.get(completeUrl).then(response => {

            console.log(response);

            this.setState({
                results: response.data.result,
                loading: false
            })
        })

    }

    handleClick = () => {
        this.setState({
            snackbarOpen: true,
        });
    };

    handleRequestClose = () => {
        this.setState({
            snackbarOpen: false,
        });
    };

    goDetailPage(res) {
        /*

                console.log('#####################' + res.detailUrl);

                this.props.history.push('/CheckoutDetailComponent/'+encodeURIComponent(res.detailUrl));
        */

        /*        window.location.href= res.detailUrl;*/

        window.open(res.detailUrl, '_blank');


    }

    loadMore() {

        this.setState({
            loading4: true,
            curPage: this.state.curPage + 1
        }, () => {

            //alert(this.state.curPage)

            const completeUrl = this.state.url + "?page=" + this.state.curPage + "&query=" + this.state.query + "&sort=" + this.state.sort;

            console.log('##############completeUrlcompleteUrl#######' + completeUrl);

            axios.get(completeUrl).then(response => {

                console.log(response);

                response.data.result.map(elementOne => {
                    this.state.results.push(elementOne);
                });

                setTimeout(() => {
                    this.setState({
                        loading4: false
                    })
                }, 1000)

            })

        });

    }


    render() {
        return (
            <div className='test001'>
                <br/>
                <br/>
                <br/>
                <br/>
                {/*#############################fab 버튼 영역#################################*/}
                {/*#############################fab 버튼 영역#################################*/}
                {/*#############################fab 버튼 영역#################################*/}
                <div className='fab001'>

                    <FloatingActionButton style={style} backgroundColor='orange' onClick={() => this.clickedFab()}>
                        <FontAwesome name='arrow-up' size='2x' className='arrow_up'/>
                    </FloatingActionButton>


                </div>
                <TextField
                    hintText="검색어 and enter"
                    autoFocus

                    value={this.state.input1}
                    onChange={(event) => {

                        this.setState({
                            input1: event.target.value
                        }, () => {
                            console.log(this.state.input1 + "############");
                        })
                    }}
                    onKeyPress={(event) => {

                        if (event.charCode == 13) {
                            this.getSearchList();
                        }
                    }}
                />
                {' '}
                <RaisedButton label='search' onClick={() => this.getSearchList()} backgroundColor={'yellow'}
                              labelColor={'black'}/>&nbsp;
                <br/>
                <div>
                    <SelectField
                        value={this.state.selectedText}
                        onChange={(event, index, value) => {
                            console.log(value);
                            this.setState({
                                sort: value,
                                selectedText: value
                            }, () => {
                                this.getSearchList();

                                console.log('#####################' + this.state.sort);
                            })
                        }}
                    >
                        <MenuItem value={'price_asc'} primaryText="가격낮은순"/>
                        <MenuItem value={'rel'} primaryText="관련성"/>

                    </SelectField>
                </div>

                {this.state.results.length > 0 ?
                    <div>
                        <RaisedButton label='prev' onClick={() => this.clickedPrev()} backgroundColor={'red'}
                                      labelColor={'white'}/> &nbsp;
                        <RaisedButton label='next' onClick={() => this.clickedNext()} backgroundColor={'green'}
                                      labelColor={'white'}/>

                        <div>
                            현재페이지 : {this.state.curPage}
                        </div>
                    </div>
                    : ''
                }


                <div>
                    <table className='table'>

                        {
                            this.state.results.length > 0 ?
                                this.state.results.map(res =>
                                    <tr onClick={() => this.goDetailPage(res)}>
                                        <td>
                                            <img src={res.imageUrl}/>
                                        </td>
                                        <td>
                                            {res.comments}
                                        </td>

                                        <td>
                                            {res.info}
                                        </td>
                                        <td>
                                            <FontIcon
                                                className="muidocs-icon-action-home"

                                            />
                                        </td>

                                    </tr>
                                )

                                : <div style={{textAlign: 'center', color: 'red', width: '100%'}}>데이타가 존재 하지 않습니다</div>

                        }
                        {}
                        <InfiniteScroll
                            pageStart={1}
                            loadMore={() => this.loadMore()}
                            hasMore={true || false}
                            initialLoad={false}
                            threshold={50}

                        >
                        </InfiniteScroll>
                        <div className='loader4'>
                            {this.state.loading4 ? <CircularProgress color={'blue'} size={50}/> : null}
                        </div>

                    </table>
                </div>


                <div className='loader3'>
                    {this.state.loading ? <CircularProgress color={'blue'} size={50}/> : null}
                </div>
                <Snackbar

                    className='snackbar001'
                    open={this.state.snackbarOpen}
                    message="더이상 페이지가 없습니다"
                    autoHideDuration={1500}
                    onRequestClose={() => this.handleRequestClose()}
                />


            </div>
        );
    }
}


export default CheckoutComponent;

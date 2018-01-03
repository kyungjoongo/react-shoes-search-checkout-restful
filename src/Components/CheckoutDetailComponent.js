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
    FlatButton, Snackbar
} from 'material-ui'
import InfiniteScroll from 'react-infinite-scroller';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ScrollUpButton from "react-scroll-up-button";
import {BrowserRouter as Router, Link, Route, withRouter} from 'react-router-dom';
import Iframe from 'react-iframe'


var FontAwesome = require('react-fontawesome');

const style = {
    marginRight: 20
};

class CheckoutDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            snackbarOpen: false,
            results: [],
            loading: false,
            loading4: false,
            open: false,
            query: '',
            input1: '',
            fullItems: [],
            curPage: 1,
            sort: 'rel',
            url: 'http://kyungjoon.ipdisk.co.kr:5000/checkout'
        };


    }

    componentDidMount() {

        let detail_uri = this.props.match.params.param1;

        detail_uri = decodeURIComponent(detail_uri);

        this.setState({
            url:detail_uri
        })

        console.log('#####################' + detail_uri)
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
                CheckoutDetailComponent

                <Iframe url={this.state.url}
                        width="450px"
                        height="450px"
                        id="myId"
                        className="myClassname"
                        display="initial"
                        position="relative"
                        allowFullScreen/>
            </div>
        );
    }
}


export default CheckoutDetailComponent;

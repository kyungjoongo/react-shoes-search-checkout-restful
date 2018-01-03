import React, {Component} from 'react';
import '../App.css';
import {blue500, orange500} from 'material-ui/styles/colors';
import sheos_list from './data.json'
import SearchBar from 'material-ui-search-bar'
import {BrowserRouter} from 'react-router-dom'
import axios from 'axios'
import {
    TextField, CircularProgress, IconButton, GridList, GridTile, Subheader, SelectField, MenuItem,
    RaisedButton, Table, TableBody, TableHeader,
    TableHeaderColumn, TableRow, TableRowColumn, Dialog,
    FlatButton
} from 'material-ui'
import InfiniteScroll from 'react-infinite-scroller';

class ShoesSearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            loading: false,
            open: false,
            text1: '',
            fullItems: [],
            curPage: 1,
            url: 'http://kyungjoon.ipdisk.co.kr:5000/shoe_v2/'
        };

    }

    componentDidMount() {
        this.getShoeListFromRemote();
    }

    getShoes() {
        this.setState({
            results: sheos_list.result
        })
    }

    getShoeListFromRemote() {
        this.setState({loading: true});
        axios.get(this.state.url + 1).then(response => {
            this.setState({
                results: response.data.result,
                fullItems: response.data.result,
                loading: false
            })
        })

    }


    filterList(event) {
        var updatedList = this.state.initialItems;
        updatedList = updatedList.filter(function (item) {
            return item.toLowerCase().search(event.target.value.toLowerCase()) !== -1;

        });
        this.setState({items: updatedList});
    }

    pressedEnter(event) {

    }

    imageClicked(response) {
        window.open('http://www.roadrunnersports.com/rrs/products/' + response.shoesId , '_blank') ;
    }

    loadMore(page) {

        this.setState({loading: true});
        axios.get(this.state.url + page).then(response => {

            this.setState({
                results: response.data.result,
                fullItems: response.data.result,
                loading: false,
                curPage: page
            })
        })
    }


    render() {
        return (
            <div className='test001'>
                <br/>
                <br/>
                <br/>
                <br/>
                <SearchBar
                    onChange={currentInput => {

                        this.setState({input1: currentInput});

                        if (currentInput === '') {
                            console.log('널이네');
                            this.setState({
                                results: this.state.fullItems
                            })

                        } else {

                            var fullShoesItem = this.state.fullItems;

                            console.log(fullShoesItem);

                            console.log("currentInput:" + currentInput);
                            var updateFilteredList = fullShoesItem.filter(function (entry) {
                                console.log(currentInput);

                                if (entry.shoesFullname.toLowerCase().search(currentInput.toLowerCase()) !== -1) {
                                    return true;
                                }

                            });
                            console.log('#####################' + updateFilteredList.length);
                            this.setState({
                                results: updateFilteredList
                            })
                        }


                    }}
                    onRequestSearch={() => console.log('onRequestSearch')}
                    style={{
                        margin: '0 auto',
                        maxWidth: 400
                    }}
                />

                <br/>
                <div>
                    <table>
                        <tr>
                            <td width="50px">
                                {this.state.curPage != '1' ? <a href='#' onClick={() => this.loadMore(1)}>1 </a> : 1}
                            </td>
                            <td width="50px">
                                {this.state.curPage != '2' ? <a href='#' onClick={() => this.loadMore(2)}>2 </a> : 2}
                            </td>
                            <td width="50px">
                                {this.state.curPage != '3' ? <a href='#' onClick={() => this.loadMore(3)}>3 </a> : 3}
                            </td>
                            <td width="50px">
                                {this.state.curPage != '4' ? <a href='#' onClick={() => this.loadMore(4)}>4 </a> : 4}
                            </td>
                        </tr>
                    </table>
                    <GridList
                        cellHeight={180}
                        style={styles.gridList}
                        cols={2}
                    >
                        {this.state.results.map(response => (
                            <GridTile className='grid_tile001'
                                      key={response.shoesId}
                                      onClick={() => this.imageClicked(response)}
                                      subtitle={response.shoesBrand}
                                      title={response.shoesName}
                            >
                                <img src={response.product_image_url}/>
                                {response.shoeType}
                            </GridTile>


                        ))}


                    </GridList>
                </div>

                <div className='loader3'>
                    {this.state.loading ? <CircularProgress color={'blue'} size={50}/> : null}
                </div>


            </div>
        );
    }
}



export default ShoesSearchComponent;

const styles = {
    errorStyle: {
        color: orange500,
    },
    underlineStyle: {
        borderColor: orange500,
        fontSize: 20
    },
    floatingLabelStyle: {
        color: orange500,
    },
    floatingLabelFocusStyle: {
        color: orange500,
    },
};

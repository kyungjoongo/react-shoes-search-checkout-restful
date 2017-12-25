import React, {Component} from 'react';
import '../App.css';
import axios from "axios/index";
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {
    TextField, CircularProgress, IconButton, GridList, GridTile, Subheader, SelectField, MenuItem,
    RaisedButton, Table, TableBody, TableHeader,
    TableHeaderColumn, TableRow, TableRowColumn, Dialog,
    FlatButton
} from 'material-ui'
import SearchBar from 'material-ui-search-bar'

const shoes_list = require('./data.json');

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        /*width: 500,
        height: 450,*/
        overflowY: 'auto',
    },
};

class ShoesComponent extends Component {
    constructor(props) {
        super(props);


        this.state = {
            results: [],
            page: 1,
            input1: '',
            searchTerm: '',
            loading: false,
            loading2: false,
            shoeInfo: {},
            shoeType: '',
            dialogOpen: false,
        };
    }

    componentDidMount() {
        //this.getShoes();
        this.getShoesFromJson();
    }

    //###########################################
    getShoes() {

        this.setState({loading: true});
        /*        axios.get('http://kyungjoon.ipdisk.co.kr:5000/shoe/'+ this.state.page).then(res => {*/

        axios.get('http://kyungjoon.ipdisk.co.kr:5000/shoesListAll').then(res => {


            console.log(res.data.result);
            this.setState({
                results: res.data.result,
                loading: false,
                page: this.state.page + 1
            });
            console.log("this.state.page " + this.state.page);


        }).catch(e => {
            this.setState({loading: false});
            alert("error" + e);

        })
    }

    getShoesFromJson() {

        this.setState({loading: true});
        this.setState({
            results: shoes_list.result
        });
        this.setState({loading: false});
    }


    handleOpenDialog(desc, shoeType) {
        this.setState({dialogOpen: true});

        this.setState({
            shoeInfo: desc,
            shoeType: shoeType,
            loading2: false
        });
    }

    handleOpenDialog2(shoeId) {
        this.setState({dialogOpen: true});

        this.setState({loading: true});
        axios.get('http://kyungjoon.ipdisk.co.kr:5000/getReview/' + shoeId).then(response => {

            console.log(response.data.result);

            var reviews = response.data.result;
            this.setState({
                shoeInfo: reviews.map(response => {
                    return "" + response.comments + "\n\n\n"
                })

            });

            this.setState({loading: false});

        })


    }


    handleClose = () => {
        this.setState({dialogOpen: false});
    };


    render() {

        const actions = [
            <FlatButton
                label="닫기"
                primary={true}
                onClick={this.handleClose}
            />
        ];


        return (
            <div className="App">
                <br/>
                <br/>
                <br/>
                <br/>
                <div>

                    <SelectField
                        floatingLabelText="Shoes Type"
                        value={this.state.value}
                        onChange={(event, key, payload) => {

                            console.log('###########resultsresults##########' + this.state.results);
                            var currentInput = payload;

                            console.log('############currentInputcurrentInput#########' + currentInput);

                            var fullShoesItem = shoes_list.result;

                            var updateFilteredList = fullShoesItem.filter(function (entry) {
                                console.log(entry);

                                if (entry.shoesFullname.toLowerCase().search(currentInput.toLowerCase()) !== -1) {
                                    return true;
                                } else if (entry.shoeType.toLowerCase().search(currentInput.toLowerCase()) !== -1) {
                                    return true;
                                }

                            });
                            console.log('#####################' + updateFilteredList.length);
                            this.setState({
                                results: updateFilteredList
                            })


                        }}
                    >
                        <MenuItem value={'Neutral'} primaryText="Neutral"/>
                        <MenuItem value={'Stability'} primaryText="Stability"/>
                        <MenuItem value={'Motion Control'} primaryText="Motion Control"/>

                    </SelectField>
                </div>

                <Dialog
                    title={<img src={this.state.shoeType}/>}
                    modal={false}
                    actions={actions}
                    open={this.state.dialogOpen}
                    onRequestClose={this.handleClose}
                >
                    <div className='red'>
                    </div>
                    <br/>
                    <br/>

                    {this.state.shoeInfo}
                    <div className='alertLoader'>
                        {this.state.loading2 ?
                            <CircularProgress value={'좀 오래 걸려요^^;'} color={'green'} size={50}/> : null}
                    </div>
                </Dialog>
                <SearchBar
                    onChange={currentInput => {
                        this.setState({input1: currentInput});

                        if (currentInput == '') {
                            console.log('널이네');
                            this.getShoesFromJson()

                        } else {

                            var fullShoesItem = shoes_list.result;
                            console.log("currentInput:" + currentInput);
                            var updateFilteredList = fullShoesItem.filter(function (entry) {
                                console.log(currentInput);

                                if (entry.shoesFullname.toLowerCase().search(currentInput.toLowerCase()) !== -1) {
                                    return true;
                                } else if (entry.shoeType.toLowerCase().search(currentInput.toLowerCase()) !== -1) {
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
                <div style={styles.root}>
                    <GridList
                        cellHeight={180}
                        style={styles.gridList}
                        cols={2}
                    >


                        {/*<Subheader>dksjfaksdjfksjdf</Subheader>*/}
                        {this.state.results.map(response => (
                            <GridTile className='grid_tile001'
                                      key={response.shoesId}
                                      title={<div onClick={() => {
                                          /// return this.handleOpenDialog2(response.shoesId)

                                      }}>{response.shoesFullname} </div>}
                                      subtitle={<div>id: <b>{response.shoesId} &nbsp;  {response.shoeType}</b></div>}

                                      actionIcon={<img src={response.shoeTypeImage}/>}
                            >

                                <img onClick={() => this.handleOpenDialog(response.desc, response.shoeTypeImage)}
                                     className='image001'
                                     src={response.imageBaseUrl + response.shoesId}/>

                            </GridTile>
                        ))}
                    </GridList>
                </div>


                <div className='loader2'>
                    {this.state.loading ?
                        <div>
                            <CircularProgress value={'좀 오래 걸려요^^;'} color={'green'} size={50}>

                            </CircularProgress>
                            &nbsp;&nbsp;&nbsp;좀 걸립니다^^;
                        </div>

                        : null}
                </div>

            </div>
        );
    }
}


export default ShoesComponent;

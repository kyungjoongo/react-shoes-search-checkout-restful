import React, {Component} from 'react';
import '../App.css';
import axios from 'axios'
import {
    CircularProgress,
    RaisedButton,
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    Dialog,
    FlatButton
} from 'material-ui'



class Component1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            proverbList: [],
            loading: false,
            title: '고경준 천재',
            open: false,
            dialogOpen : false
        }
    }

    getReddit() {
        axios.get(`http://www.reddit.com/r/reactjs.json`).then(res => {
            let __posts = res.data.data.children.map(obj => {
                return obj.data
            });
            console.log(__posts);
            this.setState({posts: __posts});
        });
    }

    getProverb() {

        this.setState({loading: true});
        axios.get(`http://35.201.153.132:3000/proverbJson`).then(res => {

            let _tmp = res.data.map(result => {
                return result;
            });

            this.setState({proverbList: _tmp});

            setTimeout(() => {
                this.setState({loading: false});
            }, 1500);

            console.log("aslfksdlkflskdf--->" + JSON.stringify(this.state.proverbList));

        })
    }

    componentDidMount() {
        this.getProverb();
    }

    clickedProverb(content) {
        alert(content);
    }

    handleOpenDialog(){
        this.setState({dialogOpen: true});
    }

    handleClose = () => {
        this.setState({dialogOpen: false});
    };


    render() {

        const actions = [
            <FlatButton
                label="취소"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="전송"
                primary={true}

                onClick={this.handleClose}
            />,
        ];

        return (

            <div>
                <br/>
                <br/>
                <br/>
                <br/>
                <Dialog
                    title="Dialog With kyungjoon"
                    modal={false}
                    actions={actions}
                    open={this.state.dialogOpen}
                    onRequestClose={this.handleClose}
                >
                    고경준 천재님이십니다!
                </Dialog>

                <RaisedButton label='퐁듀' onClick={() => this.clickedProverb('sdkflskdf')} backgroundColor={'red'}
                              labelColor={'white'}/>{' '}
                <RaisedButton label='다이얼로그' onClick={() => this.handleOpenDialog()}
                              backgroundColor={'green'} labelColor={'white'}/>


                <div>
                    <ul>
                        {this.state.proverbList.map(proverbOne =>
                            <li onClick={() => this.clickedProverb(proverbOne.content)}> {proverbOne.content}</li>
                        )}
                    </ul>


                </div>


                <div className='loader'>
                    {this.state.loading ? <CircularProgress color={'green'} size={50}/> : null}
                </div>
            </div>
        );
    }
}

export default Component1;

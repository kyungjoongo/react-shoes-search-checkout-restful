import React, {Component} from 'react';
import '../App.css';
var FontAwesome = require('react-fontawesome');

const style = {
    marginRight: 20
};

class AntTestComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            snackbarOpen: false,
            results: [],
            loading: false,
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
                <div>
                  sdfsdfsdf
                </div>
            </div>
        );
    }
}


export default AntTestComponent;

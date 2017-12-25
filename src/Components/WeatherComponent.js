import React, {Component} from 'react';
import '../App.css';
import logo from './../logo.svg'
import axios from "axios/index";

import {
    TextField,
    CircularProgress,
    RaisedButton

} from 'material-ui';


class WeatherComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherResult: [],
            weatherState: '',
            loading: false,
            location: '',
            inputedLocation: 'seongnam',
            temperature: '',
            cityList: [],
            weatherUrl: 'https://api.openweathermap.org/data/2.5/weather?appid=88ded9bf6cf6b77a3e89e0f34c6ea76c&units=metric&q='
        };


    }


    componentDidMount() {
        this.getWeather();

        this.getCitys();
    }

    getCitys() {

        this.setState({loading: true});
        axios.get(`http://localhost:3001/posts`).then(res => {

            let requestResult = res.data;


            this.setState({
                cityList: requestResult

            });

            setTimeout(() => {
                this.setState({loading: false});
            }, 500);

            /*console.log(this.state.cityList);*/


        }).catch(e => {
            this.setState({loading: false});
            alert("지역이 존재 하질 않는다.");

        })
    }


    getWeather() {

        this.setState({loading: true});
        axios.get(this.state.weatherUrl + this.state.inputedLocation).then(res => {

            let requestResult = res.data;
            console.log("requestResult:" + JSON.stringify(requestResult));

            this.setState({
                location: requestResult.name,
                temperature: requestResult.main.temp,
                weatherState: requestResult.weather[0].main
            });

            setTimeout(() => {
                this.setState({loading: false});
            }, 500);


        }).catch(e => {
            this.setState({loading: false});
            alert("지역이 존재 하질 않는다.");

        })
    }

    render() {
        return (
            <div className="App">
                <br/>
                <br/>
                <br/>
                <br/>
                <h3 className="">
                    지역은 : {this.state.location}<br/>
                    온도는 : {this.state.temperature} C<br/>
                    하늘상태 : {this.state.weatherState == 'Clear' ? <img src='./images/sun.png'/> : null}
                    {this.state.weatherState == 'Clouds' ? <img src='./images/clouds.png'/> : this.state.weatherState}

                </h3>
                <TextField
                    name="numberOfGuests"
                    type="text"
                    value={this.state.inputedLocation}
                    onKeyPress={event => {
                        if (event.key === 'Enter')
                            this.getWeather();
                    }}
                    onChange={event => {
                        console.log(event.target.value);
                        this.setState({inputedLocation: event.target.value});
                    }}/>

                <RaisedButton onClick={() => this.getWeather()} label={'submit'}
                              primary={true}/>

                <div className='loader2'>
                    {this.state.loading ? <CircularProgress color={'green'} size={50}/> : null}
                </div>
                <ul>

                </ul>
            </div>
        );
    }
}


export default WeatherComponent;

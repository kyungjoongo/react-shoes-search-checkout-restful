import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle} from 'material-ui/Card';
import axios from "axios/index";
import InfiniteScroll from 'react-infinite-scroller';
import {CircularProgress, RaisedButton} from 'material-ui'
import '../App.css';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ScrollUpButton from "react-scroll-up-button";
var FontAwesome = require('react-fontawesome');


const style = {
    marginRight: 20
};

class CardExampleWithAvatar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            imageList: [],
            loading: false,
            title: '고경준 천재',
            open: false,
            page: 1,
            category: '',
            pageSize :20
        }
    }

    componentDidMount() {
        this.getPictures();
    }

    getPictures() {

        var _category = [
            'fashion', 'nature', 'backgrounds', 'science', 'education', 'people', 'feelings'
            , 'religion', 'health', 'places', 'animals'
            , 'industry', 'food', 'computer', 'sports', 'transportation'
            , 'travel', 'buildings', 'business', 'music'

        ];
        var randCate = _category[Math.floor(Math.random() * _category.length)];

        let plxabayUri = 'https://pixabay.com/api/?key=7259916-f3ce173538d4a7f0dee3e23a0&image_type=photo&pretty=true&per_page='+ this.state.pageSize + '&page=';

        this.setState({
            loading: true,
            category: randCate
        });

        axios.get(plxabayUri + this.state.page + "&category=" + randCate).then(res => {

            console.log("page-->"+ this.state.page);

            let _responseResult = res.data.hits.map(result => {
                return result;
            });

            this.setState({
                imageList: _responseResult,
                 page: this.state.page + 1
            });
        })
    }

    loadMore() {

        let plxabayUri = 'https://pixabay.com/api/?key=7259916-f3ce173538d4a7f0dee3e23a0&image_type=photo&pretty=true&per_page='+ this.state.pageSize + '&page=';
        axios.get(plxabayUri + this.state.page + "&category=" + this.state.category).then(res => {

            console.log("page-->"+ this.state.page);

            let _responseResult = res.data.hits.map(result => {
                this.state.imageList.push(result);
            });

            this.setState({
                page: this.state.page + 1
            });
        })
    }

    clickedFab(){
        /*alert('sdlfksdlfk');*/
        window.scrollTo(0, 0)
    }


    render() {

        return (
            <div>


                <div className='fab001'>
                    <ScrollUpButton AnimationDuration={2000} ContainerClassName="ScrollUpButton__Container" TransitionClassName="ScrollUpButton__Toggled" >
                        <FloatingActionButton  style={style} backgroundColor='green'  >
                            <FontAwesome name='arrow-up' size='2x'  className='arrow_up'/>
                        </FloatingActionButton>
                    </ScrollUpButton>

                </div>
                <br/>
                <br/>
                <br/>


                <InfiniteScroll
                    pageStart={0}
                    loadMore={() => this.loadMore()}
                    hasMore={true || false}
                    loader={<CircularProgress color={'red'} size={50} className='bottomLoader'/>}
                >
                    {this.state.imageList.map(proverbOne =>
                        <Card>
                            <CardHeader
                                title="URL Avatar"
                                subtitle="Subtitle"
                                avatar="./images/jsa-128.jpg"
                            />
                            <CardMedia
                                overlay={<CardTitle title={proverbOne.tags} subtitle={proverbOne.pageURL}/>}
                            >
                                <img src={proverbOne.webformatURL} alt=""/>
                            </CardMedia>
                            {/*  <CardTitle title="Card title"/>
                        <CardText>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                        </CardText>*/}
                            <CardActions>
                                <RaisedButton label="Like" primary={true}/>
                                <RaisedButton label="Share" secondary={true}/>

                            </CardActions>
                        </Card>
                    )}
                </InfiniteScroll>





            </div>

        )
    }


}

export default CardExampleWithAvatar;

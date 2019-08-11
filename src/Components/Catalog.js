import React, { Component } from 'react';
import Footer from './Footer';
import BoardMenu from './BoardMenu';
import Banner from './Banner';
import CatalogPost from './CatalogPost';
const request = require('superagent');

class Catalog extends Component {
    constructor(props){
        super(props);
        this.state = { posts: null, ready: false, board: props.match.params.board }
    }

    componentDidMount(){

        var apiURI = 'http://127.0.0.1:8080/api/catalog/'+this.state.board;
        request.get(apiURI)
        .end((err,response)=>{
            var res = response.body
            var postContainer = []
            for(var i=0;i<res.length;i++){
                postContainer.push(<CatalogPost post={res[i]} />)
            }
            this.setState({posts:postContainer, ready:true})
        })
    };

    render(){
        if(this.state.ready === false){
            return(<div>Loading...</div>)
        } else if(this.state.ready ===true){
            return(
                <div id="catalogPage">
                    <BoardMenu />
                    <div className="topBanner">
                        <hr className="abovePostForm" />
                        <Banner />
                    </div>
                    <div className="catalogContainer">
                        {this.state.posts}
                    </div>
                    <BoardMenu />
                    <Footer />
                </div>
            )
        }
    }
}

export default Catalog;

import React, { Component } from 'react';
import Footer from './Footer';
import BoardMenu from './BoardMenu';
import Banner from './Banner';
const request = require('superagent');

class Board extends Component {
    constructor(props){
        super(props);
        this.board = props.match.params.board
        this.page = props.match.params.page
        this.state = { board: this.board, page: this.page, threads: null }
    }

    componentDidMount(){
        var page;
        !this.props.page ? page = this.props.page : page = 1; 
        var apiURI = 'http://127.0.0.1:8080/api/board/'+this.board+'/'+page;
        request.get(apiURI)
        .end((err,response)=>{
            var res = response.body
            this.setState({ threads: res})
        })
    };

    render(){

        return(
            <div>
                <BoardMenu />
                <div className="topBanner">
                    <hr className="abovePostForm" />
                    <Banner />
                </div>
                <BoardMenu />
                <Footer />
            </div>
        )
    } 
}

export default Board;

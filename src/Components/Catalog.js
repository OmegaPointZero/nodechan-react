import React, { Component } from 'react';
import Footer from './Footer';
import BoardMenu from './BoardMenu';
import Banner from './Banner';
import PostForm from './PostForm';
import CatalogPost from './CatalogPost';
const request = require('superagent');

class Catalog extends Component {
    constructor(props){
        super(props);
        this.state = { 
            boards: null, 
            posts: null, 
            ready: false, 
            board: props.match.params.board, 
            thisBoard: null
        }
    }

    componentDidMount(){

        // Get boards data for menu and for the title
        request.get('http://127.0.0.1:8080/api/boardList')
        .end((err,response)=>{
            var res = response.body
            this.setState({boards:res})
            var thisBoard = this.state.boards.find(board => board.boardCode === this.state.board);
            this.setState({thisBoard: thisBoard})
        })
        
        // Get board catalog
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
            var returnButtonTarget = "/boards/"+this.state.board+"/"
            var refreshButtonTarget = "/catalog/"+this.state.board+"/"
            return(
                <div id="catalogPage">
                    <BoardMenu boards={this.state.boards} />
                    <div className="topBanner">
                        <hr className="abovePostForm" />
                        <Banner />
                    </div>
                    <h1 className="boardTitle"> /{this.state.thisBoard.boardCode}/ - {this.state.thisBoard.boardTitle} </h1>
                    <hr className="abovePostForm" />
                    <PostForm type="newThread" />
                    <hr />
                    [<a href={returnButtonTarget}>Return</a>] [<a href="#footer">Bottom</a>]  [<a href={refreshButtonTarget}>Refresh</a>]  
                    <hr />
                    <div className="catalogContainer">
                        {this.state.posts}
                    </div>
                    <BoardMenu boards={this.state.boards}/>
                    <Footer />
                </div>
            )
        }
    }
}

export default Catalog;

import React, { Component } from 'react';
import BoardMenu from './BoardMenu'
import Footer from './Footer'

class Board extends Component {
    constructor(props){
        super(props);
        this.state = { board: null }
    }

    render(){
        return (
          <div className="main-container">
              <BoardMenu />

              <BoardMenu />
              <Footer />
          </div>
        );
    } 
}

export default Board;

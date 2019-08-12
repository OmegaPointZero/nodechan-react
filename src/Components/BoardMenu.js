import React, { Component } from 'react';

class BoardCode extends Component {

    render() {
        var href = "/boards/"+this.props.board.boardCode;
        var title = this.props.board.boardCode + " - " + this.props.board.boardTitle
        return(
            <span><a href={href} title={title} className="boardCodes"> {this.props.board.boardCode} </a> /</span>
        )                
    }
}

const makeBoardsMenu = function(array){
    var thisArr = []
    for(var i=0;i<array.length;i++){
        thisArr.push(<BoardCode board={array[i]} />);
    }
    return thisArr
}


class BoardMenu extends Component {

    constructor(props){
        super(props);
        this.state = { boards: null }
    }

    componentDidMount(){
        var boards = this.props.boards;
        var menu = makeBoardsMenu(boards)
        this.setState({boards:menu})
    };

    render(){

        return(
            <div className="boardNav"> [ / {makeBoardsMenu(this.props.boards)} ] </div>
        );
    }
}

export default BoardMenu

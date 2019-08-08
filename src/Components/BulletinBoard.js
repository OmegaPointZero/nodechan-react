import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';


const request = require('superagent');

//Generate the table for each category
const makeTable = (function(array,category){
    var tableElements = []
    tableElements.push('<table class="column"><tbody><tr><td><h3>'+category+'</h3></td></tr>')

    var filteredCategories = array.filter(function(board){
        return board.category === category
    })

    filteredCategories.forEach(function(b){
        var str = '<tr><td><a href="/boards/'+b.boardCode+'" class="boardCodes">'+b.boardTitle+'</a></td></tr>'
        tableElements.push(str)
    })
    tableElements.push('</tbody></table>')
    return tableElements.join('')
})

//Generate the bulletin board
const makeBulletinBoard = (function(array){
    var thisArr = []
    console.log(array)
    console.log(array.map(board=>board.category))
    let unique = [...new Set(array.map(board=>board.category))]
    unique.forEach(function(category){
        thisArr.push(makeTable(array,category))
    })    
    return thisArr.join('')
})


class BulletinBoard extends Component {

    constructor(props){
        super(props);
        this.state = { boards: null }
    }

    componentDidMount(){
        request.get('http://127.0.0.1:8080/api/boardlist')
        .end((err,response)=>{
            var res = response.body;
            console.log(res)
            this.setState({boards:makeBulletinBoard(res)})
        })
    };

    render(){

        if(!this.state.boards){
            return (<div>LOADING</div>)
        }
        return(
            <div className="boardsContainer" id="boards">
                <div className="boardsTitleBar">
                    <h2 id="bTB">Boards</h2>
                </div>
                {ReactHtmlParser(this.state.boards)}
            </div>
        );
    }
}

export default BulletinBoard

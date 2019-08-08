import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';


const request = require('superagent');

const makeBoardsMenu = function(array){
    var thisArr = []
    thisArr.push(' [ ')
    for(var i=0;i<array.length;i++){
        var str = ' / <a href="/boards/'+ array[i].boardCode +'"  title="'+ array[i].boardCode +' - '+ array[i].boardTitle +'" class="boardCodes">' + array[i].boardCode + '</a>'
        thisArr.push(str);
        var lastStr = "";
        if(i === array.length-1){
            thisArr.push(' / ] ')
            lastStr = thisArr.join(' '); 
            return lastStr
        }
    }
}


class BoardMenu extends Component {

    constructor(props){
        super(props);
        this.state = { boards: null }
    }

    componentDidMount(){
        request.get('http://127.0.0.1:8080/api/boardList')
        .end((err,response)=>{
            var res = response.body
            var menu = makeBoardsMenu(res)
            this.setState({boards:menu})
        })
    };

    render(){

        if(!this.state.boards){
            return (<div>LOADING</div>)
        }
        return(
            <div className="boardNav"> {ReactHtmlParser(this.state.boards)} </div>
        );
    }
}

export default BoardMenu

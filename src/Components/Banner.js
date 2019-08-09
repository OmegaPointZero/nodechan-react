import React, { Component } from 'react';
const request = require('superagent');

class Banner extends Component {
    constructor(props){
        super(props)
        this.state = { banner : null }
    }

    componentDidMount(){
        var apiURI = "http://localhost:8080/api/banner"
        request.get(apiURI)
        .end((err,response)=>{
            console.log(response)
            var banner = "http://localhost:8080/"+response.body.banner
            this.setState({banner:banner})
        })
    }

    render() {
        return <img src={this.state.banner} class="banner" alt="banner"/>
    }

}

export default Banner

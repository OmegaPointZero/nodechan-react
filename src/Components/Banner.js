import React, { Component } from 'react';
const request = require('superagent');

class Banner extends Component {
    constructor(props){
        super(props)
        this.state = { banner : null }
    }

    componentDidMount(){
        var apiURI = process.env.REACT_APP_SERVER+"/api/banner"
        request.get(apiURI)
        .end((err,response)=>{
            var banner = process.env.REACT_APP_SERVER+"/"+response.body.banner
            this.setState({banner:banner})
        })
    }

    render() {
        return <img src={this.state.banner} className="banner" alt="banner"/>
    }

}

export default Banner

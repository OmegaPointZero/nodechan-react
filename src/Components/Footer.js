import React, { Component } from 'react';


class Footer extends Component {
    constructor(props){
        super(props);
        this.state = { boards: null }
    }

    render(){
        return(
            <div className="footer">
All works posted on here are artistic works of fiction and falsehood. Only a fool would take anything posted here as fact.
</div>
        );
    }
}

export default Footer;

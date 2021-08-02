import React, { Component } from 'react';
import Popular from '@/Popular';
import Battle from '@/Battle';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageName: 'Popular'
        } 
        console.log(process.env.NODE_ENV,'NODE_ENVNODE_ENV')
    }
    onSwitch = str => {
        this.setState({ pageName: str })
    }
    render() {
        const { pageName } = this.state
        return (
            <div>
                <div style={{ display: 'flex', paddingLeft: "30px" }}>
                    <div onClick={() => { this.onSwitch('Popular') }} style={{ marginRight: '20px', cursor: 'pointer', color: pageName === 'Popular' ? 'red' : '' }}>Popular</div>
                    <div onClick={() => { this.onSwitch('Battle') }} style={{ cursor: 'pointer', color: pageName === 'Battle' ? 'red' : '' }}>Battle</div>
                </div>
                {pageName === 'Popular' ? <Popular /> : <Battle />}
            </div>
        );
    }
}

export default Home;
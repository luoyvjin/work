import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
// import  '@/Battle.scss';

class Battle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inp1:'',
            inp2:'',
            flage1:false,
            falge2:false
        }
    }
    onValue1Change = e => {
        this.setState({inp1:e.target.value})
        if(!e.target.value){
            this.setState({flage1:false})
        }
    }
    onValue2Change= e =>{
        this.setState({inp2:e.target.value})
        if(!e.target.value){
            this.setState({flage2:false})
        }
    }
    btn1Click = () =>{
        this.setState({flage1:true})
    }
    btn2Click = () =>{
        this.setState({flage2:true})
    }
    
    render() {
        return (
            <div style={{padding: '0 30px'}}>
                <div style={{ textAlign: 'center', fontSize: '30px', margin: '20px 0', fontWeight: 'bold' }}>Instructions</div>
                <div style={{ display: 'flex', width: '600px', margin: '0 auto' }}>

                    <div style={{ width: '190px', textAlign: 'center' }}>
                        <p>Enter two Github:</p>
                        <div style={{ background: '#eee', padding: '20px' }}>
                            <i className='fa fa-users' style={{ fontSize: '150px', color: '#ffbf74' }}></i>
                        </div>
                    </div>

                    <div style={{ width: '190px', textAlign: 'center', margin: '0 15px' }}>
                        <p>Battle</p>
                        <div style={{ background: '#eee', padding: '20px' }}>
                            <i className='fa fa-fighter-jet' style={{ fontSize: '150px', color: '#808080' }}></i>
                        </div>
                    </div>
                    <div style={{ width: '190px', textAlign: 'center' }}>
                        <p>See the winner</p>
                        <div style={{ background: '#eee', padding: '20px' }}>
                            <i className='fa fa-fighter-jet' style={{ fontSize: '150px', color: '#808080' }}></i>
                        </div>
                    </div>
                </div>
                <div style={{textAlign: 'center',margin: '10px 0',fontSize:'25px',fontWeight:'bold'}}>Players</div>
                <div style={{display: 'flex',justifyContent:'space-between'}}>
                    <div style={{width: '50%',textAlign: 'right',paddingRight:'20px'}}>
                        <p style={{fontSize:'25px',fontWeight:'bold'}}>Player One</p>
                        <input type="text" placeholder='github username' value={this.state.inp1} onChange={this.onValue1Change}/>
                        <button onClick={this.btn1Click} disabled={this.state.inp1===''}>Submit</button>
                    </div>
                    <div style={{width: '50%'}}>
                        <p style={{fontSize:'25px',fontWeight:'bold'}}>Player Two</p>
                        <input type="text" placeholder='github username' value={this.state.inp2} onChange={this.onValue2Change}/>
                        <button onClick={this.btn2Click} disabled={this.state.inp2===''}>Submit</button>
                    </div>
                </div>
                <div style={{textAlign: 'center',margin: '20px 0'}}>
                    {
                       this.state.flage1&&this.state.flage2?<button>Battle</button>:''
                    } 
                </div>
            </div>
        );
    }
}

export default Battle;
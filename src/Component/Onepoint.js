import React,{Component} from 'react';
import {Button,Input} from 'antd';

import apis from '../Container/API'
class Onepoint extends Component {
    state = {
        f_x:'',
        x_s:null,
        Er:null,
        x:null,
        ifer:null,
        ans:null,
        apiData:null,
        result:null
    }
    async GetDatafromAPI(){
        let tmpData = null
        await apis.getAllRootOfEquation().then(res => (tmpData = res.data));
        this.setState({apiData:tmpData})
        console.log(this.state.apiData);
        let n = this.state.apiData.length;
        console.log(n);
        let ranIndex = Math.floor(Math.random() * n); 
        this.setState({
            f_x: this.state.apiData[2]["equation"],
            x_s:this.state.apiData[2]["initial_x"],
            er : this.state.apiData[2]["error"],
        })
        
    }
    onClickExample = e =>{
        this.GetDatafromAPI()
    }
    myChangeHandler_f_x = (e) => {
        this.setState({f_x: e.target.value});
    }
    myChangeHandler_x_s = (e) => {
        this.setState({x_s: e.target.value});
    }
    myChangeHandler_Er = (e) => {
        this.setState({Er: e.target.value});
    }
    find_x = e =>{
        this.setState({ifer:null})
        if(this.state.f_x === ''){
            this.setState({ifer:(<div style={{color:'red'}}>โปรดกรอกข้อมูลให้ครบ</div>)})
            return
        }
        const math = require('mathjs')
        let fx = math.parse(this.state.f_x).compile()
        let x = math.bignumber(this.state.x_s)
        let error = math.bignumber(this.state.er)
        let checkError = math.bignumber(Number.MAX_VALUE)
        let newX = x
        let arr = []
        let iteration = 1

        while (math.larger(checkError, error)) {

            newX = fx.evaluate({x:x})
            let newCheckError = math.abs(math.divide(math.subtract(newX, x), newX))
            if(iteration > 500 || (iteration > 5 && math.equal(checkError, 1))){
                arr = []
                arr.push(<div style={{fontSize:'40px',fontWeight:'bold'}}>สมการนี้เป็น ลู่ออก</div>)
                this.setState({x:arr})
                return;
            }
            checkError = newCheckError
            console.log(checkError.toString())
            x = newX
            arr.push(<div style={{fontSize:'25px'}}>
                        <span style={{display:'inline-block',width:'40%'}}>Iteration {iteration}: x is {parseFloat(x)}</span>
                        <span>Error : {checkError.toFixed(15)}</span>
                    </div>);
            iteration = iteration + 1
        }
        arr.push(<div style={{fontSize:'40px',fontWeight:'bold'}}>Result of x is {parseFloat(x)}</div>);
        this.setState({x:arr});

    }
    render(){
        return(
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'left' }}>
                <h1 className="header-content">OnepointIteration Method</h1>
                <div> 
                    <span><Input placeholder="x^4-13" style={{width:'364px'}} onChange={this.myChangeHandler_f_x} value={this.state.f_x}/></span>
                    <span style={{marginLeft:'10px'}}><Button type="primary" onClick={this.find_x}>Calculation</Button></span>
                    {this.state.ifer}
                </div>
                <div style={{marginTop:'5px'}}>
                    <span>X_s =</span>
                    <span style={{marginLeft:'5px', marginRight:'5px'}}><Input placeholder="0" style={{width:'57px'}} onChange={this.myChangeHandler_x_s} value={this.state.x_s}/></span>
                    <span>Error =</span>
                    <span style={{marginLeft:'5px', marginRight:'5px'}}><Input placeholder="0.000001" style={{width:'80px'}} onChange={this.myChangeHandler_Er} value={this.state.er}/></span>
                    
                </div>
                <div>
                    <Button style={{marginLeft:'5px',width:'100px',marginTop:'5px'}} type='primary' onClick={this.onClickExample}>Example</Button>
                  
                </div>
                <div style={{marginTop:'20px'}}>
                    {this.state.x}
                </div>
                
            </div>
        )
    }
}

export default Onepoint;
import React,{Component} from 'react';
import {Button,Input} from 'antd';
import { equation_func, fixed_fx } from './Equation_Function';

class Onepoint extends Component {
    state = {
        f_x:'',
        x_s:null,
        Er:null,
        x:null,
        ifer:null
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
        let f_x = this.state.f_x;
        let x_s = parseFloat(this.state.x_s);
        let Er = parseFloat(this.state.Er);
        let Err = 999999;
        let arr = [];
        try{
            f_x = fixed_fx(f_x);
           
            let i = 1;
            let x_new = 0;
            while(Err > Er){
                
                x_new = equation_func(x_s,f_x);
                console.log(x_new);
                Err = Math.abs((x_new-x_s)/x_new);
                x_s = x_new;
                arr.push(<div style={{fontSize:'25px'}}>
                <span style={{display:'inline-block',width:'40%'}}>Iteration {i}: x is {x_new}</span>
                <span>Error : {Err.toFixed(15)}</span>
                </div>);
                 i++;
            }
            arr.push(<div style={{fontSize:'40px',fontWeight:'bold'}}>Result of x is {x_new}</div>);
            this.setState({x:arr})  
        }
        catch (error){
            this.setState({ifer:(<div style={{color:'red'}}>ใส่ฟังก์ชั่นไม่ถูกต้อง</div>)})
        }   
    }
    render(){
        return(
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'left' }}>
                <h1 className="header-content">OnepointIteration Method</h1>
                <div> 
                    <span><Input placeholder="x^4-13" style={{width:'364px'}} onChange={this.myChangeHandler_f_x}/></span>
                    <span style={{marginLeft:'10px'}}><Button type="primary" onClick={this.find_x}>Calculation</Button></span>
                    {this.state.ifer}
                </div>
                <div style={{marginTop:'5px'}}>
                    <span>X_s =</span>
                    <span style={{marginLeft:'5px', marginRight:'5px'}}><Input placeholder="0" style={{width:'57px'}} onChange={this.myChangeHandler_x_s}/></span>
                    <span>Error =</span>
                    <span style={{marginLeft:'5px', marginRight:'5px'}}><Input placeholder="0.000001" style={{width:'80px'}} onChange={this.myChangeHandler_Er}/></span>
                    
                </div>
                <div style={{marginTop:'20px'}}>
                    {this.state.x}
                </div>
                
            </div>
        )
    }
}

export default Onepoint;
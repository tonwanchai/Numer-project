import React,{Component} from 'react';
import {equation_func, fixed_fx} from './Equation_Function'
import {Input,Button} from 'antd';
import apis from '../Container/API'
import { create, all } from 'mathjs'

const config = { }
const math = create(all, config)

class Secant extends Component {
    state = {
        f_x:null,
        x0:null,
        x1:null,
        er:null,
        ans:null,
        apiData:null,
        ifer:null
    }
    async GetDatafromAPI(){
        let tmpData = null
        await apis.getAllRootOfEquation().then(res => (tmpData = res.data));
        this.setState({apiData:tmpData})
        console.log(this.state.apiData);
        
        this.setState({
            f_x: this.state.apiData[3]["equation"],
            x0:this.state.apiData[3]["initial_x"],
            x1:parseFloat(this.state.apiData[3]["initial_x"])+1.0,
            er : this.state.apiData[3]["error"],
        })
        
    }
    onClickExample = e =>{
        this.GetDatafromAPI()
    }
    myChangeHandler_f_x = (e) => {
        this.setState({f_x: e.target.value});
    }

    myChangeHandler_x0 = (e) => {
        this.setState({x0: e.target.value});
    }
    myChangeHandler_x1 = (e) => {
        this.setState({x1: e.target.value});
    }
    myChangeHandler_er = (e) => {
        this.setState({er: e.target.value});
    }

    Calculate = e =>{
        
        if(this.state.f_x === null){
            this.setState({ifer:(<div style={{color:'red'}}>โปรดกรอกข้อมูลให้ครบ</div>)})
            return
        }
        try{
            this.setState({ifer:null})
            let f_x = this.state.f_x;
       

            f_x = fixed_fx(f_x);

            let x0 = parseFloat(this.state.x0);
            let x1 = parseFloat(this.state.x1);
            let er = parseFloat(this.state.er);

            let x_new;
            let tmp_er = 9999999;
            let arr = [];
            let i = 1;

            while(tmp_er > er){

                x_new = x1 - ((equation_func(x1,f_x)*(x1-x0))/(equation_func(x1,f_x)-equation_func(x0,f_x)))

                tmp_er = Math.abs((x_new-x1)/x_new);
            
                x0 = x1;
                x1 = x_new;

                arr.push(<div style={{fontSize:'25px'}}>
                    <span style={{display:'inline-block',width:'40%'}}>Iteration {i}: x is {x_new}</span>
                    <span>Error : {tmp_er.toFixed(15)}</span>
                    </div>);
                i++;

            }
            arr.push(<div style={{fontSize:'40px',fontWeight:'bold'}}>Result of x is {x_new}</div>);
            this.setState({ans:arr});

        } catch(error){
            this.setState({ifer:(<div style={{color:'red'}}>ใส่ฟังก์ชั่นไม่ถูกต้อง</div>)})
        }
    }
    render(){
        return(
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'left' }}>
                <h1 className="header-content">Secant Method</h1>
                <div> 
                    <span><Input placeholder="x^4-13" style={{width:'364px'}} onChange={this.myChangeHandler_f_x} value={this.state.f_x}/></span>
                    <span style={{marginLeft:'10px'}}><Button type="primary" onClick={this.Calculate}>Calculation</Button></span>
                    {this.state.ifer}
                </div>
                <div style={{marginTop:'5px'}}>
                    <span>X0 =</span>
                    <span style={{marginLeft:'5px', marginRight:'5px'}}><Input placeholder="0" style={{width:'57px'}} onChange={this.myChangeHandler_x0} value={this.state.x0}/></span>
                    <span>X1 =</span>
                    <span style={{marginLeft:'5px', marginRight:'5px'}}><Input placeholder="1" style={{width:'57px'}} onChange={this.myChangeHandler_x1} value={this.state.x1}/></span>
                    <span>Error =</span>
                    <span style={{marginLeft:'5px', marginRight:'5px'}}><Input placeholder="0.000001" style={{width:'80px'}} onChange={this.myChangeHandler_er} value={this.state.er}/></span>
                    
                </div>
                <div>
                    <Button style={{marginLeft:'5px',width:'100px',marginTop:'5px'}} type='primary' onClick={this.onClickExample}>Example</Button>
                   
                </div>
                <div style={{marginTop:'20px'}}>
                    {this.state.ans}
                </div>
                
            </div>
        )
    }
}

export default Secant;
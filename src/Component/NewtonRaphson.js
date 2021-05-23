import React, { Component } from 'react';
import { equation_func, fixed_fx } from './Equation_Function'
import { Input, Button } from 'antd';
import apis from '../Container/API'
import { create, all } from 'mathjs'

const config = {}
const math = create(all, config)

class NewtonRaphson extends Component {

    state = {
        f_x: null,
        init_x: null,
        er: null,
        ans: null,
        apiData: null,
        ifer: null
    }
    async GetDatafromAPI() {
        let tmpData = null
        await apis.getAllRootOfEquation().then(res => (tmpData = res.data));
        this.setState({ apiData: tmpData })
        console.log(this.state.apiData);
        let n = this.state.apiData.length;
        console.log(n);
        let ranIndex = Math.floor(Math.random() * n);
        this.setState({
            f_x: this.state.apiData[ranIndex]["equation"],
            init_x: this.state.apiData[ranIndex]["initial_x"],
            er: this.state.apiData[ranIndex]["error"],
        })

    }
    onClickExample = e => {
        this.GetDatafromAPI()
    }
    myChangeHandler_f_x = (e) => {
        this.setState({ f_x: e.target.value });
    }

    myChangeHandler_init_x = (e) => {
        this.setState({ init_x: e.target.value });
    }

    myChangeHandler_er = (e) => {
        this.setState({ er: e.target.value });
    }
    Calculate = e => {
        if (this.state.f_x === null) {
            this.setState({ ifer: (<div style={{ color: 'red' }}>โปรดกรอกข้อมูลให้ครบ</div>) })
            return
        }
        try {
            let f_x = this.state.f_x;
            let arr = [];
            let x = parseFloat(this.state.init_x);
            let er = parseFloat(this.state.er);
            let tmp_er = 999999;
            let De_f_x = math.derivative(f_x, 'x').toString();
            let i = 1;
            let x_new;
            f_x = fixed_fx(f_x);
            De_f_x = fixed_fx(De_f_x);
            while (tmp_er > er) {

                x_new = x - (equation_func(x, f_x) / equation_func(x, De_f_x));
                tmp_er = Math.abs((x_new - x) / x_new);
                x = x_new;

                arr.push(<div style={{ fontSize: '25px' }}>
                    <span style={{ display: 'inline-block', width: '50%' }}>Iteration {i}: x is {x}</span>
                    <span>Error : {tmp_er.toFixed(15)}</span>
                </div>);
                i++;
                if (i > 200) {
                    break;
                }
            }

            arr.push(<div style={{ fontSize: '40px', fontWeight: 'bold' }}>Result of x is {x}</div>);

            this.setState({ ans: arr })
        } catch (error) {
            this.setState({ ifer: (<div style={{ color: 'red' }}>ใส่ฟังก์ชั่นไม่ถูกต้อง</div>) })
        }
    }
    render() {
        return (
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'left' }}>
                <h1 className="header-content">NewtonRaphson Method</h1>
                <div>
                    <span><Input placeholder="x^4-13" style={{ width: '364px' }} onChange={this.myChangeHandler_f_x} value={this.state.f_x} /></span>
                    <span style={{ marginLeft: '10px' }}><Button type="primary" onClick={this.Calculate}>Calculation</Button></span>
                    {this.state.ifer}
                </div>
                <div style={{ marginTop: '5px' }}>
                    <span>X_s =</span>
                    <span style={{ marginLeft: '5px', marginRight: '5px' }}><Input placeholder="0" style={{ width: '57px' }} onChange={this.myChangeHandler_init_x} value={this.state.init_x} /></span>
                    <span>Error =</span>
                    <span style={{ marginLeft: '5px', marginRight: '5px' }}><Input placeholder="0.000001" style={{ width: '80px' }} onChange={this.myChangeHandler_er} value={this.state.er} /></span>

                </div>
                <div>
                    <Button style={{ marginLeft: '5px', width: '100px', marginTop: '5px' }} type='primary' onClick={this.onClickExample}>Example</Button>

                </div>
                <div style={{ marginTop: '20px' }}>
                    {this.state.ans}
                </div>

            </div>
        )

    }
}

export default NewtonRaphson;
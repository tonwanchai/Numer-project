import React from 'react';
import { Input, Button } from 'antd';

import { equation_func, fixed_fx } from './Equation_Function'
import apis from '../Container/API'
import { create, all } from 'mathjs'
import functionPlot from 'function-plot'

const config = {}
const math = create(all, config)
class BisectionMethod extends React.Component {

    state = {
        f_x: '',
        x: null,
        xl: null,
        xr: null,
        er: null,
        ifer: null,
        ans: null,
        apiData: null,
        result: null,
        tmpXl:[[]],
        tmpXr:[[]]
    };

    async GetDatafromAPI() {
        let tmpData = null
        await apis.getAllRootOfEquation().then(res => (tmpData = res.data));
        this.setState({ apiData: tmpData })
        console.log(this.state.apiData);
        this.setState({
            f_x: this.state.apiData[1]["equation"],
            xl: this.state.apiData[1]["xl"],
            xr: this.state.apiData[1]["xr"],
            er: this.state.apiData[1]["error"],
        })

    }
    onClickExample = e => {
        this.GetDatafromAPI()
    }

    myChangeHandler_f_x = (e) => {
        this.setState({ f_x: e.target.value });
    }
    myChangeHandler_xl = (e) => {
        this.setState({ xl: e.target.value });
    }
    myChangeHandler_xr = (e) => {
        this.setState({ xr: e.target.value });
    }
    myChangeHandler_er = (e) => {
        this.setState({ er: e.target.value });
    }

    find_x = e => {

        if (this.state.f_x === '') {
            this.setState({ ifer: (<div style={{ color: 'red' }}>โปรดใส่ฟังก์ชั่น</div>) })
            return;
        }

        try {

            this.setState({ ifer: null })
            let f_x = this.state.f_x;
            //console.log(f_x);

            f_x = fixed_fx(f_x);

            let xl = parseFloat(this.state.xl);
            let xr = parseFloat(this.state.xr);
            let er = parseFloat(this.state.er);
            let tmpXL = [],tmpXr = []
            let xm = (xl + xr) / 2;
            let num = equation_func(xm, f_x) * equation_func(xr, f_x);

            tmpXL.push([])
            tmpXL[0].push(xl)
            tmpXL[0].push(equation_func(xl, f_x))
            tmpXr.push([])
            tmpXr[0].push(xr)
            tmpXr[0].push(equation_func(xr, f_x))

            let tmp_er = 9999999;
            let new_xm = 0;

            let arr = [];
            let i = 1;

            if (num > 0) {
                xr = xm;
            }
            else if (num < 0) {
                xl = xm;
            }

            while (tmp_er > er) {
                
                new_xm = (xl + xr) / 2;
                num = equation_func(new_xm, f_x) * equation_func(xr, f_x);
                
                
                if (num > 0) {
                    xr = new_xm;
                }
                else if (num < 0) {
                    xl = new_xm;
                }

                tmp_er = Math.abs(new_xm - xm) / new_xm;
                xm = new_xm;
                tmpXL.push([])
                tmpXr.push([])
                console.log(xl,xr)
                tmpXL[i].push(xl)
                tmpXL[i].push(equation_func(xl, f_x));
                tmpXr[i].push(xr)
                tmpXr[i].push(equation_func(xr, f_x));

                arr.push(<div style={{ fontSize: '25px' }}>
                    <span style={{ display: 'inline-block', width: '40%' }}>Iteration {i}: x is {xm}</span>
                    <span>Error : {tmp_er.toFixed(15)}</span>
                </div>);
                i++;

            }
            arr.push(<div style={{ fontSize: '40px', fontWeight: 'bold' }}>Result of x is {xm}</div>);
            
            this.setState({ result: arr });
            this.setState({ ans: xm ,tmpXl:tmpXL,tmpXr:tmpXr})
        } catch (error) {
            this.setState({ ifer: (<div style={{ color: 'red' }}>ใส่ฟังก์ชั่นไม่ถูกต้อง</div>) })
        }


    };
    Plot(){
        console.log(this.state.tmpXl)
        console.log(this.state.tmpXr)
        functionPlot({
            target: "#plt",
            width: 700,
            height: 700,
            xAxis: {domain :[-5,5]},
            yAxis: { domain: [-1, 9] },
            grid: true,
            data: [
                {
                    fn:this.state.f_x
                },
                {
                
                    points:this.state.tmpXl,
                    fnType:'points',
                    graphType:'scatter'
               
                },
                {
                
                    points:this.state.tmpXr,
                    fnType:'points',
                    graphType:'scatter'
               
                }

            ]
          });
    }
    onClickShow = e =>{
        this.Plot();
    }
    render() {
        return (
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'left' }}>
                <h1 className="header-content">Bisection Method</h1>
                <div>
                    <span><Input placeholder="x^4-13" style={{ width: '364px' }} onChange={this.myChangeHandler_f_x} value={this.state.f_x} /></span>
                    <span style={{ marginLeft: '10px' }}><Button type="primary" onClick={this.find_x}>Calculation</Button></span>
                    {this.state.ifer}
                </div>
                <div style={{ marginTop: '5px' }}>
                    <span>XL =</span>
                    <span style={{ marginLeft: '5px', marginRight: '5px' }}><Input placeholder="1.5" style={{ width: '57px' }} onChange={this.myChangeHandler_xl} value={this.state.xl} /></span>
                    <span>XR =</span>
                    <span style={{ marginLeft: '5px', marginRight: '5px' }}><Input placeholder="2" style={{ width: '57px' }} onChange={this.myChangeHandler_xr} value={this.state.xr} /></span>
                    <span>Error =</span>
                    <span style={{ marginLeft: '5px', marginRight: '5px' }}><Input placeholder="0.00001" style={{ width: '100px' }} onChange={this.myChangeHandler_er} value={this.state.er} /></span>
                </div>
                <div>
                    <span><Button style={{ marginLeft: '5px', width: '100px', marginTop: '5px' }} type='primary' onClick={this.onClickExample}>Example</Button></span>
                    
                   <span><Button style={{ marginLeft: '5px', width: '100px', marginTop: '5px' }} type='primary' onClick={this.onClickShow}>Show</Button></span> 
                
                    {this.state.showApiData}
                </div>

                <div style={{ marginTop: '20px' }}>
                    {this.state.result}
                </div>
                
                <div id="plt" style={{margin:"20px"}} />
                
                

            </div>
        );
    }

}

export default BisectionMethod;
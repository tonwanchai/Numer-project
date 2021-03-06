import React, { Component } from 'react';
import { Button, Input } from 'antd';
import functionPlot from 'function-plot'
import apis from '../Container/API'
class Onepoint extends Component {
    state = {
        f_x: '',
        x_s: null,
        Er: null,
        x: null,
        ifer: null,
        apiData: null,
        tmpX: [[]]
    }
    async GetDatafromAPI() {
        let tmpData = null
        await apis.getAllRootOfEquation().then(res => (tmpData = res.data));
        this.setState({ apiData: tmpData })
        console.log(this.state.apiData);

        this.setState({
            f_x: this.state.apiData[2]["equation"],
            x_s: this.state.apiData[2]["initial_x"],
            er: this.state.apiData[2]["error"],
        })

    }
    onClickExample = e => {
        this.GetDatafromAPI()
    }
    myChangeHandler_f_x = (e) => {
        this.setState({ f_x: e.target.value });
    }
    myChangeHandler_x_s = (e) => {
        this.setState({ x_s: e.target.value });
    }
    myChangeHandler_Er = (e) => {
        this.setState({ Er: e.target.value });
    }
    find_x = e => {
        this.setState({ ifer: null })
        if (this.state.f_x === '') {
            this.setState({ ifer: (<div style={{ color: 'red' }}>โปรดกรอกข้อมูลให้ครบ</div>) })
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
        let tmpX = []
        tmpX.push([])
        tmpX[0].push(x)
        tmpX[0].push(fx.evaluate({ x: x }))
        while (math.larger(checkError, error)) {
            newX = math.bignumber(fx.evaluate({ x: math.bignumber(x) }))
            let newCheckError = math.abs(math.divide(math.subtract(newX, x), newX))
            if (iteration > 500 || (iteration > 5 && math.equal(checkError, 1))) {
                arr = []
                arr.push(<div style={{ fontSize: '40px', fontWeight: 'bold' }}>สมการนี้เป็น ลู่ออก</div>)
                this.setState({ x: arr })
                return;
            }
            checkError = newCheckError
            console.log(checkError.toString())
            x = newX
            tmpX.push([])
            tmpX[iteration].push(x)
            tmpX[iteration].push(fx.evaluate({ x: x }))
            arr.push(<div style={{ fontSize: '25px' }}>
                <span style={{ display: 'inline-block', width: '40%' }}>Iteration {iteration}: x is {math.round(x, 15).toString()}</span>
                <span>Error : {math.round(checkError, 15).toString()}</span>
            </div>);
            iteration = iteration + 1
        }
        arr.push(<div style={{ fontSize: '40px', fontWeight: 'bold' }}>Result of x is {parseFloat(x)}</div>);
        this.setState({ x: arr ,tmpX:tmpX});

    }
    Plot() {
        console.log(this.state.tmpX)
        
        functionPlot({
            target: "#plt",
            width: 700,
            height: 700,
            xAxis: { domain: [-5, 5] },
            yAxis: { domain: [-1, 9] },
            grid: true,
            data: [
                {
                    fn: this.state.f_x
                },
                {

                    fn: "x"

                },
                {

                    points: this.state.tmpX,
                    fnType: 'points',
                    color: 'black',
                    graphType: 'scatter'

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
                <h1 className="header-content">OnepointIteration Method</h1>
                <div>
                    <span><Input placeholder="x^4-13" style={{ width: '364px' }} onChange={this.myChangeHandler_f_x} value={this.state.f_x} /></span>
                    <span style={{ marginLeft: '10px' }}><Button type="primary" onClick={this.find_x}>Calculation</Button></span>
                    {this.state.ifer}
                </div>
                <div style={{ marginTop: '5px' }}>
                    <span>X_s =</span>
                    <span style={{ marginLeft: '5px', marginRight: '5px' }}><Input placeholder="0" style={{ width: '57px' }} onChange={this.myChangeHandler_x_s} value={this.state.x_s} /></span>
                    <span>Error =</span>
                    <span style={{ marginLeft: '5px', marginRight: '5px' }}><Input placeholder="0.000001" style={{ width: '80px' }} onChange={this.myChangeHandler_Er} value={this.state.er} /></span>

                </div>
                <div>
                <span><Button style={{ marginLeft: '5px', width: '100px', marginTop: '5px' }} type='primary' onClick={this.onClickExample}>Example</Button></span>
                    
                    <span><Button style={{ marginLeft: '5px', width: '100px', marginTop: '5px' }} type='primary' onClick={this.onClickShow}>Show</Button></span> 

                </div>
                <div style={{ marginTop: '20px' }}>
                    {this.state.x}
                </div>
                <div id="plt" style={{margin:"20px"}} />
            </div>
        )
    }
}

export default Onepoint;
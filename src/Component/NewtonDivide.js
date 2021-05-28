import React from 'react'
import { Button, Input } from 'antd'
import apis from '../Container/API'
import functionPlot from 'function-plot'


const math = require('mathjs')
class NewtonDivide extends React.Component {
    state = {
        n: 2,
        matrix: [[], []],
        Point: null,
        x: null,
        y: null,
        c: [],
        apiData: null,
        ifer:null,
        f_x:null,
        hasClick:false
    }
    async getDatafromAPI() {
        let tmpData = null
        await apis.getAllInterpolation().then(res => (tmpData = res.data));
        this.setState({ apiData: tmpData })
        this.setState({
            n: this.state.apiData[0]["n"],
            matrix: this.state.apiData[0]["matrix"],
            Point: this.state.apiData[0]["selectedPoint"],
            x: this.state.apiData[0]["x"],
        })
    }
    onClickExample = e => {
        this.getDatafromAPI()
    }
    // ลดขนาด matrix
    onClickMinus = e => {
        let tempMt = this.state.matrix;
        if (this.state.n > 2) {
            this.setState({ n: this.state.n - 1 });
            tempMt.pop([])
        }
        this.setState({ matrix: tempMt })
    }
    // เพิ่มขนาด matrix
    onClickPlus = e => {
        let tempMt = this.state.matrix;
        if (this.state.n < 8) {
            this.setState({ n: this.state.n + 1 });
            tempMt.push([])
        }
        this.setState({ matrix: tempMt })
    }
    // เก็บค่าลง matrix
    onChangeMatrix = e => {
        let tmpIndex = e.target.name.split(" ");
        let tmpMt = this.state.matrix;
        tmpMt[parseInt(tmpIndex[0])][parseInt(tmpIndex[1])] = e.target.value;
        this.setState({ matrix: tmpMt });
    }
    // แสดง matrix
    ShowMatrix = e => {
        let arr = []
        let tmpMatrix = this.state.matrix;
        for (let i = 0; i < this.state.n; i++) {
            for (let j = 0; j < 2; j++) {
                arr.push(<span style={{ margin: '2.5px' }}><Input name={(i).toString() + " " + (j).toString()} style={{ width: '100px', textAlign: 'center' }} autoComplete="off" onChange={this.onChangeMatrix} value={tmpMatrix[i][j]} /></span>)
            }
            arr.push(<div style={{ margin: '5px' }}></div>)
        }
        return (arr);
    }
    // เก็บค่าลง Point
    onChangePoint = e => {

        this.setState({ Point: e.target.value }); // 1,3,4,5
    }
    // เก็บค่าลง x
    onChangeX = e => {
        this.setState({ x: e.target.value }); // 2.5
    }
    onClickCalculation = e => {
        this.setState({ ifer: null })
        if (this.state.x === null) {
            this.setState({ ifer: (<div style={{ fontSize: '30px', color: 'red' }}>โปรดกรอกข้อมูลให้ครบ</div>) })
            return
        }
        let tmpMt = [];
        for (let i = 0; i < this.state.n; i++) {
            tmpMt.push([]);
            for (let j = 0; j < 2; j++) {
                tmpMt[i][j] = +this.state.matrix[i][j];
            }
        }
        let tmpPoint = this.state.Point.split(',')
        tmpPoint = tmpPoint.map((x => (+x) - 1))
        let ans = this.Calculate(tmpPoint, +this.state.x, tmpMt);
        console.log(ans.ans)
        this.setState({ y: ans.ans, c: ans.C ,hasClick:true})
    }
    Show_C() {
        let arr = this.state.c;
        let arr2 = [];
        for (let i = 0; i < arr.length; i++) {
            arr2.push(<div style={{ fontSize: '15px' }}><h1>C[{i + 1}] = {arr[i]}</h1></div>)
        }
        return (arr2);
    }
    Calculate(Point, x, matrix) {

        let n = Point.length
        let arrX = []
        let arrFx = [[]]
        Point.map(x => {
            arrX.push(matrix[x][0])
            arrFx[0].push(matrix[x][1])
        })

        for (let i = 0; i < n - 1; i++) {
            let dynamic = []
            for (let j = 0; j < n - i - 1; j++) {
                let value = math.bignumber(arrFx[i][j + 1])
                value = math.subtract(value, arrFx[i][j])
                let temp = math.bignumber(arrX[i + j + 1])
                temp = math.subtract(temp, arrX[j])
                value = math.divide(value, temp)
                dynamic.push(value)
            }
            arrFx.push(dynamic)
        }
        let arrC = []
        let sum = math.bignumber(arrFx[0][0]);
        arrC.push(sum.toFixed(20))
        
        let C = math.bignumber(1);
        for (let i = 0; i < n - 1; i++) {
            arrC.push(arrFx[i + 1][0].toFixed(20))
            let temp = math.bignumber(x)
            temp = math.subtract(temp, arrX[i])
            C = math.multiply(C, temp)
            temp = math.multiply(C, arrFx[i + 1][0])
            sum = math.add(sum, temp)
        }
        let text =  "("+arrC[0].toString()+")"
        for(let i = 1 ; i <arrC.length;i++){
            text = text + "+" + "("+arrC[i].toString()+")"
            for(let j =0;j<i;j++){
                text = text + "*(x-"+arrX[j].toString()+")"
            }
        }
        console.log(text);
        this.setState({f_x:text})
        return { ans: sum.toString(), C: arrC }

    }
    Plot() {
        console.log(this.state.tmpX)
        
        functionPlot({
            target: "#plt",
            width: 700,
            height: 700, 
            xAxis: { domain: [-100000, 100000] },
            yAxis: { domain: [-10, 10] },
            grid: true,
            data: [
                {
                    fn:this.state.f_x
                },
                {
                  points :this.state.matrix,
                  fnType:'points',
                  color:'black',
                  graphType:'scatter'
                },           

            ]
        });
    }
    onClickShow = e =>{
        this.Plot();
        console.log("onclickshow")
    }
    render() {
        return (
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'left' }} >
                <h1 className="header-content">Newton Divide</h1>
                <div style={{ marginBottom: '10px' }}>
                    <span style={{ marginLeft: '10px' }}><Button type="primary" onClick={this.onClickMinus}>-</Button></span>
                    <span style={{ marginLeft: '10px', fontSize: '20px' }}>{this.state.n}</span>
                    <span style={{ marginLeft: '10px' }}><Button type="primary" onClick={this.onClickPlus}>+</Button></span>
                </div>
                <div style={{ display: 'flex', flexFlow: 'row' }}>
                    <div style={{ marginLeft: '53px' }}>X</div>
                    <div style={{ marginLeft: '93px' }}>Y</div>
                </div>
                <div style={{ display: 'flex', flexFlow: 'row' }}>
                    <div style={{ alignItems: 'center' }}>{this.ShowMatrix()}</div>
                </div>
                <div style={{ margin: '5px' }}></div>
                <div>
                    เลือกจุดที่ต้องการ :
                    <Input style={{ marginLeft: '5px', width: '100px' }} onChange={this.onChangePoint} value={this.state.Point} placeholder="1,2,3,4"></Input>
                </div>

                <div style={{ margin: '5px' }}>
                    กำหนดค่า x :
                    <Input style={{ marginLeft: '39px', width: '100px' }} onChange={this.onChangeX} value={this.state.x} placeholder="2.5"></Input>
                </div>

                <div style={{ margin: '5px' }}>
                    <Button style={{ marginLeft: 'px', width: '100px' }} type='primary' onClick={this.onClickCalculation}>Calculation</Button>
                    <Button style={{ marginLeft: '5px', width: '100px' }} type='primary' onClick={this.onClickExample}>Example</Button>
                    <span><Button style={{ marginLeft: '5px', width: '100px', marginTop: '5px' }} type='primary' onClick={this.onClickShow}>Show</Button></span>
                </div>
                <div>{this.state.ifer}</div>
                {this.state.hasClick ?
                    <div style={{fontSize:'20px',fontWeight: 'bold'}}>f({this.state.x}) = {this.state.y}</div>
                    : null
                    
                }
                <div id='plt' style={{margin:'20px'}}></div>

            </div>
        );
    }
}

export default NewtonDivide;
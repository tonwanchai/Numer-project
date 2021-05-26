import React from 'react'
import { Button, Input } from 'antd'
import apis from '../Container/API'

import { create, all } from 'mathjs'
const config = {}
const math = create(all, config)

class PolymomialRegression extends React.Component {
    state = {
        n: 2,
        matrix: [[], []],
        x: null,
        k: 1,
        apiData: null,
        result: null,
        hasClick: false,
        ifer:null
    }
    async getDatafromAPI() {
        let tempData = null
        await apis.getAllRegression().then(res => (tempData = res.data));
        this.setState({ apiData: tempData })
        console.log(this.state.apiData);
        this.setState({
            n: this.state.apiData[0]['n'],
            matrix: this.state.apiData[0]['matrix'],
            x: this.state.apiData[0]['x']
        })

    }
    onClickEample = e => {
        this.getDatafromAPI();
    }
    onClickMinus = e => {
        let n = this.state.n;
        let tempMt = this.state.matrix;
        if (this.state.n > 2) {
            this.setState({ n: this.state.n - 1 });
            tempMt.pop([])
            this.setState({ matrix: tempMt })
            n = n - 1
            if (this.state.k >= n) {
                this.setState({ k: n - 1 })
            }
        }


    }
    onClickMinus_K = e => {
        if (this.state.k > 1) {
            this.setState({ k: this.state.k - 1 })
        }
    }
    onClickPlus_K = e => {
        if (this.state.k < this.state.n - 1) {
            this.setState({
                k: this.state.k + 1,
            })
        }
    }
    onClickPlus = e => {
        let tempMt = this.state.matrix;
        if (this.state.n < 9) {
            this.setState({ n: this.state.n + 1 });
            tempMt.push([])
            this.setState({ matrix: tempMt })
        }

    }
    onChangematrix = e => {
        let getIndex = e.target.name.split(" ");
        let tmpMt = this.state.matrix;
        tmpMt[parseInt(getIndex[0])][parseInt(getIndex[1])] = e.target.value;
        this.setState({ matrix: tmpMt });
    }
    onChangeX = e => {
        this.setState({ x: e.target.value });
    }
    ShowMatrix = e => {
        let arr = []
        let tmpMatrix = this.state.matrix;
        for (let i = 0; i < this.state.n; i++) {
            for (let j = 0; j < 2; j++) {
                arr.push(<span style={{ margin: '2.5px' }}><Input name={(i).toString() + " " + (j).toString()} style={{ width: '100px', textAlign: 'center' }} autoComplete="off" onChange={this.onChangematrix}value={tmpMatrix[i][j]} /></span>)
            }
            arr.push(<div style={{ margin: '5px' }}></div>)
        }
        return (arr);
    }
    OnclickCalculation = e => {
        this.setState({ ifer: null })
        if(this.state.x == null){
            this.setState({ifer: (<div style={{ fontSize: '10px', color: 'red' }}>กรอกข้อมูลให้ครบ</div>) })
            return
        }
        try {
            let ans = this.calculate(this.state.matrix, this.state.k, this.state.x);
            
            this.setState({ result: ans, hasClick: true })
            console.log(ans)
            
        }
        catch (error) {
            this.setState({ ifer: (<div style={{ fontSize: '20px', color: 'red' }}>กรอกข้อมูลผิด</div>) })
        }
    }

    Cal_sum(matrix, k, index, n) {
        let sum = 0
        for (let i = 0; i < n; i++) {
            sum = sum + (matrix[i][index] ** k);
        }
        return sum
    }
    Cal_sumMulti(matrix, k_1, index_1, k_2, index_2, n) {
        let sum = 0;
        for (let i = 0; i < n; i++) {
            sum = sum + ((matrix[i][index_1] ** k_1) * (matrix[i][index_2] ** k_2))
        }
        return sum
    }
    calculate(matrix, k, x) {
        let d = k + 1;

        let tmpArr = []
        for (let i = 0; i < d; i++) {
            tmpArr.push([])
            console.log(tmpArr)
            for (let j = 0; j < d + 1; j++) {
                if (i == 0 && j == 0) {
                    tmpArr[i][j] = matrix.length;
                }
                else if (i == 0 && j == d) {
                    tmpArr[i][j] = this.Cal_sum(matrix, 1, 1, matrix.length)
                }
                else if (i == 0) {
                    tmpArr[i][j] = this.Cal_sum(matrix, j, 0, matrix.length)
                }
                else if (i != 0 && j == 0) {
                    tmpArr[i][j] = tmpArr[0][i]
                }
                else if (j == d && i != 0) {
                    tmpArr[i][j] = this.Cal_sumMulti(matrix, i, 0, 1, 1, matrix.length)
                }
                else {
                    tmpArr[i][j] = this.Cal_sumMulti(matrix, i, 0, j, 0, matrix.length)
                }
            }
        }
        console.log(tmpArr)
        let matrixA = []
        let matrixB = []

        for (let i = 0; i < tmpArr.length; i++) {
            matrixA.push([])
            matrixA[i] = tmpArr[i].slice(0, tmpArr[0].length - 1)
            matrixB[i] = tmpArr[i][tmpArr[0].length - 1]
        }
        console.log(matrixA)
        console.log(matrixB)
        let invMatrixA = math.inv(matrixA)
        let matrixC = math.multiply(matrixB, invMatrixA)

        let sum = matrixC[0]
        for (let i = 1; i < matrixC.length; i++) {
            sum = sum + (matrixC[i] * (x ** i))

        }

        return sum.toString()
    }
    render() {
        return (
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'left' }} >
                <h1 className="header-content">Polymomial Regression</h1>
                <div style={{ marginBottom: '10px',marginTop:'20px' }}>
                    <span style={{fontSize:'15px',marginLeft:'5px'}}>จำนวนของข้อมูล n    </span>
                    <span style={{ marginLeft: '16px' }}><Button type="primary" onClick={this.onClickMinus}>-</Button></span>
                    <span style={{ marginLeft: '10px', fontSize: '20px' }}>{this.state.n}</span>
                    <span style={{ marginLeft: '10px' }}><Button type="primary" onClick={this.onClickPlus}>+</Button></span>
                </div>
                <div style={{ marginBottom: '10px' }}>
                <span style={{fontSize:'15px',marginLeft:'5px'}}>จำนวนเลขยกกำลัง k</span>
                    <span style={{ marginLeft: '10px' }}><Button type="primary" onClick={this.onClickMinus_K}>-</Button></span>
                    <span style={{ marginLeft: '10px', fontSize: '20px' }}>{this.state.k}</span>
                    <span style={{ marginLeft: '10px' }}><Button type="primary" onClick={this.onClickPlus_K}>+</Button></span>
                </div>
                <div style={{ display: 'flex', flexFlow: 'row' }}>
                    <div style={{ marginLeft: '53px' }}>X</div>
                    <div style={{ marginLeft: '93px' }}>Y</div>
                </div>
                <div style={{ display: 'flex', flexFlow: 'row' }}>
                    <div style={{ alignItems: 'center' }}>{this.ShowMatrix()}</div>
                </div>
                <div style={{ margin: '5px' }}></div>


                <div style={{ margin: '5px' }}>
                    กำหนดค่า x :
                <Input style={{ marginLeft: '39px', width: '100px' }} onChange={this.onChangeX} placeholder="2.5" value={this.state.x}></Input>
                </div>

                <div style={{ margin: '5px' }}>
                    <Button style={{ marginLeft: 'px', width: '100px' }} type='primary' onClick={this.OnclickCalculation} >Calculation</Button>
                    <Button style={{ marginLeft: '5px', width: '100px' }} type='primary' onClick={this.onClickEample} >Example</Button>
                </div>
                <div>{this.state.ifer}</div>
                {this.state.hasClick ?
                    <div style={{fontSize:'20px',fontWeight: 'bold'}}>f({this.state.x}) = {this.state.result}</div>
                    : null
                    
                }
                
            </div>
        )
    }
}
export default PolymomialRegression;
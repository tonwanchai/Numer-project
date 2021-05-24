import React from 'react'
import { Button, Input } from 'antd'
import apis from '../Container/API'
class PolymomialRegression extends React.Component {
    state ={
        n:2,
        matrix:[[],[]],
        x:null,
        k:null,
        apiData:null
    } 
    async getDatafromAPI(){
        let tempData = null
        await apis.getAllRegression().then(res => (tempData = res.data));
        this.setState({apiData:tempData})
        
        this.setState({
            n:this.state.apiData[0]['n'],
            matrix:this.state.apiData[0]['matix'],
            x:this.state.apiData[0]['x']
        })
        console.log(this.state.apiData);
    }
    onClickEample = e =>{
        this.getDatafromAPI();
    }
    onClickMinus = e => {
        let tempMt = this.state.matrix;
        if (this.state.n > 2) {
            this.setState({ n: this.state.n - 1 });
            tempMt.pop([])
        }
        this.setState({ matrix: tempMt })
    }
   
    onClickPlus = e => {
        let tempMt = this.state.matrix;
        if (this.state.n < 9) {
            this.setState({ n: this.state.n + 1 });
            tempMt.push([])
        }
        this.setState({ matrix: tempMt })
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
                arr.push(<span style={{ margin: '2.5px' }}><Input name={(i).toString() + " " + (j).toString()} style={{ width: '100px', textAlign: 'center' }} autoComplete="off" value={tmpMatrix[i][j]} /></span>)
            }
            arr.push(<div style={{ margin: '5px' }}></div>)
        }
        return (arr);
    }
    render() {
        return (
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'left' }} >
                <h1 className="header-content">Polymomial Regression</h1>
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
               

                <div style={{ margin: '5px' }}>
                    กำหนดค่า x :
                <Input style={{ marginLeft: '39px', width: '100px' }} onChange={this.onChangeX} placeholder="2.5" value={this.state.x}></Input>
                </div>

                <div style={{ margin: '5px' }}>
                    <Button style={{ marginLeft: 'px', width: '100px' }} type='primary' >Calculation</Button>
                    <Button style={{ marginLeft: '5px', width: '100px' }} type='primary' onClick={this.onClickEample} >Example</Button>
                </div>
                

            </div>
        )
    }
}
export default PolymomialRegression;
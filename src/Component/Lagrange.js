import React from 'react'
import {Button , Input} from 'antd'
import apis from '../Container/API'
const math = require('mathjs')
class Lagrange extends React.Component{
    state ={
        n:2,
        matrix:[[],[]],
        Point : null,
        x : null,
        y : null,
        L : null,
        apiData : null
    }
    async getDataFromAPI(){
        let tmpData = null
        await apis.getAllInterpolation().then(res => (tmpData = res.data));
        this.setState({apiData:tmpData})
        this.setState({
            n:this.state.apiData[0]["n"],
            matrix : this.state.apiData[ 0]["matrix"],
            Point : this.state.apiData[0]["selectedPoint"],
            x : this.state.apiData[0]["x"],
        })
    }
    onClickExample = e =>{
        this.getDataFromAPI()
    }
    // ลดขนาด matrix
    onClickMinus = e =>{
        let tempMt = this.state.matrix;
        if(this.state.n>2){
            this.setState({n : this.state.n - 1 });
            tempMt.pop([])
        }
        this.setState({matrix : tempMt})
    }
    // เพิ่มขนาด matrix
    onClickPlus = e =>{
        let tempMt = this.state.matrix;
        if(this.state.n<8){
            this.setState({n : this.state.n + 1 });
            tempMt.push([])
        }
        this.setState({matrix : tempMt})
    }
    // เก็บค่าลง matrix
    onChangeMatrix = e =>{
        let tmpIndex = e.target.name.split(" ");
        let tmpMt = this.state.matrix;
        tmpMt[parseInt(tmpIndex[0])][parseInt(tmpIndex[1])] = e.target.value;
        this.setState({matrix:tmpMt});
    }
    // แสดง matrix
    ShowMatrix = e =>{
        let arr = []
        let tmpMatrix = this.state.matrix;
        for(let i=0;i<this.state.n;i++){
            for(let j=0;j<2;j++){
                arr.push(<span style={{margin:'2.5px'}}><Input name={(i).toString()+" "+(j).toString()} style={{width:'100px',textAlign:'center'}}  autoComplete="off" value={tmpMatrix[i][j]}/></span>)
            }
            arr.push(<div style={{margin:'5px'}}></div>)
        }
        return(arr);
    }
    // เก็บค่าลง Point
    onChangePoint = e =>{
        
        this.setState({Point : e.target.value}); // 1,3,4,5
    }
    // เก็บค่าลง x
    onChangeX = e =>{
        this.setState({x : e.target.value}); // 2.5
    }
    onClickCalculation = e =>{
        let tmpMt = [];
        for(let i = 0 ; i<this.state.n;i++){
            tmpMt.push([]);
            for(let j =0;j<2;j++){
                tmpMt[i][j] = +this.state.matrix[i][j];
            }
        }
        let tmpPoint = this.state.Point.split(',')
        tmpPoint = tmpPoint.map((x => (+x)-1))
        let ans = this.Calculate(tmpMt,+this.state.x,tmpPoint);
        console.log(ans.y)
        this.setState({y : ans.y })
    }
    Calculate(matrix,x,selectedPoint){
        let n = selectedPoint.length
        let arrX = []
        let arrFx = []
        selectedPoint.map(x => {
            arrX.push(matrix[x][0])
            arrFx.push(matrix[x][1])
        })

        let sum = 0
        let arrL = []
        for(let i=0;i<n;i++){
            let mulUp = 1
            let mulDown = 1
            for(let j=0;j<n;j++){
                if(i!=j){
                    mulUp = math.multiply(math.subtract(math.bignumber(x), arrX[j]), mulUp)
                    mulDown = math.multiply(math.subtract(math.bignumber(arrX[i]), arrX[j]), mulDown)
                }
            }
            arrL.push(math.divide(mulUp, mulDown).toFixed(20))
            sum = math.add(sum, math.multiply(math.divide(mulUp, mulDown), arrFx[i]))
        }
        
        
        return {y: sum.toString(), L : arrL}
    }
    render(){
        return(
            <div className="site-layout-background" >
                <h1 className="header-content">Lagrange</h1>
                <div style={{marginBottom:'10px'}}> 
                    <span style={{marginLeft:'10px'}}><Button type="primary" onClick={this.onClickMinus}>-</Button></span>
                    <span style={{marginLeft:'10px', fontSize:'20px'}}>{this.state.n}</span>
                    <span style={{marginLeft:'10px'}}><Button type="primary" onClick={this.onClickPlus}>+</Button></span>
                </div>
                <div style={{display:'flex',flexFlow:'row'}}>
                    <div style={{marginLeft:'53px'}}>X</div>
                    <div style={{marginLeft:'93px'}}>Y</div>
                </div>
                <div style={{display:'flex',flexFlow:'row'}}>
                    <div style={{alignItems:'center'}}>{this.ShowMatrix()}</div>
                </div>
                <div style={{margin:'5px'}}></div>
                <div>
                    เลือกจุดที่ต้องการ : 
                    <Input style={{marginLeft:'5px',width:'100px'}} onChange={this.onChangePoint} value={this.state.Point} placeholder="1,2,3,4"></Input>
                </div>
                
                <div style={{margin:'5px'}}>
                    กำหนดค่า x : 
                    <Input style={{marginLeft:'39px',width:'100px'}} onChange={this.onChangeX} value={this.state.x} placeholder="2.5"></Input>
                </div>
                
                <div style={{margin:'5px'}}>
                    <Button style={{marginLeft:'px',width:'100px'}} type='primary' onClick={this.onClickCalculation}>Calculation</Button>
                    <Button style={{marginLeft:'5px',width:'100px'}} type='primary' onClick={this.onClickExample}>Example</Button>
                </div>
                <div style={{marginTop:'10px'}}>f({this.state.x}) = {this.state.y}</div>
                
                
            </div>
        )
    }
}

export default Lagrange;
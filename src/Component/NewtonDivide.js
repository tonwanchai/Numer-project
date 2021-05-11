import React from 'react'
import {Button , Input} from 'antd'
import apis from '../Container/API'
class NewtonDivide extends React.Component{
    state ={
        n:2,
        matrix:[[],[]],
        Point : null,
        x : null,
        y : null,
        apiData : null
    }
    async getDataFromAPI(){
        let tmpData = null
        await apis.getAllInterpolation().then(res => (tmpData = res.data));
        this.setState({apiData:tmpData})
        this.setState({
            n:this.state.apiData[0]["n"],
            matrix : this.state.apiData[0]["matrix"],
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
        let ans = this.Calculate(tmpPoint,+this.state.x,tmpMt);
        console.log(ans);
        this.setState({y : ans})
    }

    Calculate(Point,x,matrix){
        const math = require('mathjs')
        let n = Point.length
        let arr_x = []
        let arr_fx = [[]]
        Point.map(x => {
            arr_x.push(matrix[x][0])
            arr_fx[0].push(matrix[x][1])
        })

        for(let i=0;i<n-1;i++){
            let dynamic = []
            for(let j=0;j<n-i-1;j++){
                let value = math.bignumber(arr_fx[i][j+1])
                value = math.subtract(value,arr_fx[i][j])
                let temp = math.bignumber(arr_x[i+j+1])
                temp = math.subtract(temp,arr_x[j])
                value = math.divide(value,temp)
                dynamic.push(value)
            }
            arr_fx.push(dynamic)
        }
        let sum = math.bignumber(arr_fx[0][0]);
        let C = math.bignumber(1);
        for(let i=0;i<n-1;i++){
            let temp = math.bignumber(x)
            temp = math.subtract(temp,arr_x[i])
            C = math.multiply(C,temp)
            temp = math.multiply(C,arr_fx[i+1][0])
            sum = math.add(sum,temp)
        }
        console.log(sum.toString())
        return sum.toString()
        
    }
    render(){
        return(
            <div className="site-layout-background" >
                <h1 className="header-content">Newton Divide</h1>
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
                    <Button style={{marginLeft:'39px',width:'100px'}} type='primary' onClick={this.onClickCalculation}>Calculation</Button>
                </div>
                <div style={{margin:'5px'}}>
                    <h1 style={{fontSize:"20px"}}>{this.state.y}</h1>
                </div>
                <div style={{margin:'5px'}}>
                <Button style={{marginLeft:'39px',width:'100px'}} type='primary' onClick={this.onClickExample}>Example</Button>
                </div>
            </div>
        );
    }
}

export default NewtonDivide;
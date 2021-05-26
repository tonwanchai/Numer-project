import React from "react";
import { Button, Input } from "antd";
import apis from "../Container/API"

import { create, all } from 'mathjs'
const config = {}
const math = create(all, config)

class MultipleLinear extends React.Component {
    state = {
        n: 2,
        m: 3,
        Matrix_X: [[], []],
        Matrix_Y: [],
        fx: null,
        ifer: null,
        apiData: null,
        ansX:[],
        hasClick:false
    }
    async getDatafromAPI (){
        let tmpData = null
        await apis.getAllRegression().then(res => (tmpData = res.data));
        this.setState({apiData:tmpData})
        this.setState({
            n:this.state.apiData[1]["n"],
            m:this.state.apiData[1]["m"],
            Matrix_X:this.state.apiData[1]["matrix_X"],
            Matrix_Y:this.state.apiData[1]["matrix_Y"],
            ansX:this.state.apiData[1]["x"]
        })
    }
    onClickExample = e => {
        this.getDatafromAPI()
    }
    onClickMinus_N = e => {
        let n = this.state.n;
        if (n > 2) {
            let tmpMatrix_X = this.state.Matrix_X
            let tmpMatrix_Y = this.state.Matrix_Y
            let tmpansX = this.state.ansX;
            tmpMatrix_X.pop()
            tmpMatrix_Y.pop()
           // tmpansX.pop()
            this.setState({
                n: n - 1,
                Matrix_X: tmpMatrix_X,
                Matrix_Y: tmpMatrix_Y,
               // ansX: tmpansX
            });

        }

    }
    
    // เพิ่มขนาด matrix
    onClickPlus_N = e => {
        let n = this.state.n;
        if (this.state.n < 9) {
            let tmpMatrix_X = this.state.Matrix_X
            let tmpMatrix_Y = this.state.Matrix_Y
            let tmpansX = this.state.ansX;
            tmpMatrix_X.push([])
            tmpMatrix_Y.push(null)
         //   tmpansX.push(null)
            this.setState({
                n: n + 1,
                Matrix_X: tmpMatrix_X,
                Matrix_Y: tmpMatrix_Y,
         //       ansX: tmpansX
            });

        }

    }
    onClickMinus_M = e => {
        if (this.state.m > 2) {
            let tmpMatrix_X = this.state.Matrix_X
            let tmpAnsX = this.state.ansX;
            for (let i = 0; i < this.state.n; i++) {
                tmpMatrix_X[i].pop();
                tmpAnsX.pop();
            }
            this.setState({ Matrix_X: tmpMatrix_X, m: this.state.m - 1 ,ansX:tmpAnsX})
        }
    }
    onClickPlus_M = e => {
        if (this.state.m < 9) {
            let tmpMatrix_X = this.state.Matrix_X
            let tmpAnsX = this.state.ansX;
            for (let i = 0; i < this.state.n; i++) {
                tmpMatrix_X[i].push(null);
                tmpAnsX.push(null)
            }
            this.setState({ Matrix_X: tmpMatrix_X, m: this.state.m + 1,ansX:tmpAnsX })
        }
    }
    // เก็บค่าลง matrix
    onChangeMatrix_X = e => {
        let tmpIndex = e.target.name.split(" ");
        let tmpMt = this.state.Matrix_X;
        tmpMt[parseInt(tmpIndex[0])][parseInt(tmpIndex[1])] = e.target.value;
        this.setState({ matrix_X: tmpMt });
    }
    onChangeMatrix_Y = e => {
        let tmpIndex = e.target.name
        let tmpMt = this.state.Matrix_Y;
        tmpMt[parseInt(tmpIndex[0])][parseInt(tmpIndex[1])] = e.target.value;
        this.setState({ matrix_Y: tmpMt });
    }
    onChangeMatrix_ansX = e => {
        let tmpIndex = e.target.name
        let tmpMt = this.state.ansX;
        tmpMt[parseInt(tmpIndex[0])][parseInt(tmpIndex[1])] = e.target.value;
        this.setState({ ansX: tmpMt });
    }
    showMatrix() {
        let arr = []
        let tmpMatrixX = this.state.Matrix_X
        let tmpMatrixY = this.state.Matrix_Y;
        
        for (let i = 0 ;i< this.state.m;i++){
            arr.push(<span ><Input style={{ width: '50px', margin: '2.5px' ,textAlign:'center'}} value={"X"+(i+1)} /></span>)
            
        }
        arr.push(<span ><Input style={{ width: '50px', margin: '2.5px' ,textAlign:'center'}} value="Y" /></span>)
        arr.push(<div style={{ margin: '5px',marginTop:'5px' }}></div>)
        for (let i = 0; i < this.state.n; i++) {
            for (let j = 0; j < this.state.m; j++) {
                arr.push(<span ><Input style={{ width: '50px', margin: '2.5px' ,textAlign:'center'}} name={(i).toString() + " " + (j).toString()} onChange={this.onChangeMatrix_X} autoComplete="off" value={tmpMatrixX[i][j]} /></span>)
            }
            arr.push(<span style={{ margin: '2.5px' }}><Input name={(i).toString()} style={{ width: '50px', textAlign: 'center' }} onChange={this.onChangeMatrix_Y} autocomplete="off" value={tmpMatrixY[i]} /></span>)
            
            arr.push(<div style={{ margin: '5px' }}></div>)
        }
        return arr;
    }
   
    showMatrixAns(){
        let arr = [];
        let tmpAnsX = this.state.ansX;
        arr.push(<span>จุด x ที่ต้องการหาผลลัพธ์</span>)
        arr.push(<div style={{ margin: '5px',marginTop:'5px' }}></div>)
        for(let i = 0 ; i < this.state.m;i++){
            arr.push(<span ><Input style={{ width: '50px', margin: '2.5px' ,textAlign:'center'}} onChange={this.onChangeMatrix_ansX} autocomplete="off" placeholder={"X"+(i+1)} value={tmpAnsX[i]} /></span>)
        }
        return arr
    }

    onClickCalculation = e =>{
        
        try{
            let tmpMatrix_X=[]
            let tmpMatrix_Y=[];
            let tmpAnsX = [];
            for(let i=0;i<this.state.n;i++){
                tmpMatrix_X.push([])
                for(let j= 0;j<this.state.m;j++){
                    tmpMatrix_X[i][j] = +this.state.Matrix_X[i][j];
                }
                tmpMatrix_Y.push(+this.state.Matrix_Y[i])
                
            }
            for(let i = 0 ;i<this.state.m;i++){
                tmpAnsX.push(+this.state.ansX[i])
            }
            console.log(tmpMatrix_X)
            console.log(tmpAnsX)
            console.log(tmpMatrix_Y)
            console.log(+this.state.m)
            let ans = this.Calculate(tmpMatrix_X,tmpMatrix_Y,tmpAnsX,+this.state.m)
            console.log(ans)
            this.setState({x:ans,hasClick:true})
         
        }catch(error){

        }
    }
    Cal_sum2D(Matrix,index){
        let sum = 0;
        for(let i = 0 ;i<this.state.n;i++){
            sum = sum+ Matrix[i][index]
        }
        return sum
    }
    Cal_sum1D(Matrix,index){
        let sum = 0;
        for(let i = 0 ;i<this.state.n;i++){
            sum = sum + Matrix[i]
        }
        return sum
    }
    Cal_multi1D2D(Matrix_A,index1,Matrix_B){
        let sum = 0;
        for(let i=0;i<this.state.n;i++){
            sum = sum+ (Matrix_A[i][index1]*Matrix_B[i])
        }
        return sum
    }
    Cal_multi2D(Matrix,index1,index2){
        let sum =0;
        for(let i= 0;i<this.state.n;i++){
            sum = sum+(Matrix[i][index1]*Matrix[i][index2])
        }
        return sum
        
    }
    Calculate(Matrix_X,Matrix_Y,Ans_X,m){
        let d = m+1;
        let tmpArr = []
        console.log("Before Loop")
        for(let i=0;i<d;i++){
            tmpArr.push([]);
            for(let j=0;j<d+1;j++){
                if(i==0 && j==0){
                    tmpArr[i][j] = this.state.n;
                }
                else if(i==0&&j==d){
                    tmpArr[i][j] = this.Cal_sum1D(Matrix_Y,0)
                }
                else if(i==0){
                    tmpArr[i][j] = this.Cal_sum2D(Matrix_X,j-1)
                }
                
                else if(j==0){
                    tmpArr[i][j] = tmpArr[0][i]
                }
                else if(j==d){
                    tmpArr[i][j] = this.Cal_multi1D2D(Matrix_X,i-1,Matrix_Y,0)
                }
                else{
                    tmpArr[i][j] = this.Cal_multi2D(Matrix_X,i-1,j-1)
                }
            }
        }
        console.log(tmpArr)
        console.log('completed 1st loop')
        let matrixA = []
        let matrixB = []
        for (let i = 0; i < tmpArr.length; i++) {
            matrixA.push([])
            matrixA[i] = tmpArr[i].slice(0, tmpArr[0].length - 1)
            matrixB[i] = tmpArr[i][tmpArr[0].length-1]
        }
        console.log('completed 2nd loop',matrixA)
        console.log('completed 2nd loop',matrixB)
        let invMatrixA = math.inv(matrixA)
        console.log('Inv_A = ',invMatrixA)
        let matrixC = math.multiply(matrixB, invMatrixA)
        console.log('MatrixC =',matrixC)
        let sum = matrixC[0]
        for (let i = 1; i < matrixC.length; i++) {
            sum = sum + (matrixC[i] * (Ans_X[i-1]))

        }
        console.log('completed 3nd loop')
        return sum;
    }
    showFX(){
        let text = ""
        let tmpAnsX = this.state.ansX

        tmpAnsX.map(x => {text=text+x+","})
        
        text = text.slice(0,text.length-1)

        return text
    }
    render() {
        return (
            <div>
                <h1 className="header-content">Multiple linear Regression</h1>
                <div style={{ marginBottom: '10px', marginTop: '20px' }}>
                    <span style={{ fontSize: '15px', marginLeft: '5px' }}>จำนวนของข้อมูล n    </span>
                    <span style={{ marginLeft: '16px' }}><Button type="primary" onClick={this.onClickMinus_N}>-</Button></span>
                    <span style={{ marginLeft: '10px', fontSize: '20px' }}>{this.state.n}</span>
                    <span style={{ marginLeft: '10px' }}><Button type="primary" onClick={this.onClickPlus_N}>+</Button></span>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <span style={{ fontSize: '15px', marginLeft: '5px' }}>จำนวนของ X</span>
                    <span style={{ marginLeft: '10px' }}><Button type="primary" onClick={this.onClickMinus_M}>-</Button></span>
                    <span style={{ marginLeft: '10px', fontSize: '20px' }}>{this.state.m}</span>
                    <span style={{ marginLeft: '10px' }}><Button type="primary" onClick={this.onClickPlus_M}>+</Button></span>
                </div>
                


                
                <div style={{ display: 'flex', flexFlow: 'row', marginTop: '5px' }}>
                
                    <div style={{ alignItems: 'center' }}>{this.showMatrix()}</div>


                </div>

                <div>{this.showMatrixAns()}</div>
                
                <div style={{ margin: '5px' }}>
                    <Button style={{ marginLeft: 'px', width: '100px' }} type='primary' onClick={this.onClickCalculation}>Calculation</Button>
                    <Button style={{ marginLeft: '5px', width: '100px' }} type='primary' onClick={this.onClickExample}>Example</Button>
                </div>
                {this.state.hasClick ?
                    <div style={{fontSize:'20px',fontWeight: 'bold'}}>f({this.showFX}) = {this.state.x}</div>
                    : null
                    
                }
            </div>
        )
    }

}

export default MultipleLinear;
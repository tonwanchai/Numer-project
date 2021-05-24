import React from 'react'
import { Button, Input ,Table } from 'antd'

import { create, all } from 'mathjs'
import apis from '../Container/API'
const config = {}
const math = create(all, config)

class JacobiIterationMethod extends React.Component {
    state = {
        n: 3,
        ans: null,
        matrix_A: [[], [], []],
        matrix_B: [null, null, null],
        matrix_X: [null, null, null],
        error: null,
        ifer: null,
        columns:[
            {
                title:'Iteration',
                dataIndex:'Iteration',
                key:'Iteration'
            },
            {
                title:'x',
                dataIndex:'x',
                key:'x'
            },
            {
                title:'error',
                dataIndex:'error',
                key:'error'
            }

        ],
        data:[],
        dataSource:[]
    }
    async GetDatafromAPI() {
        let tmpData = null
        await apis.getAllMatrix().then(res => (tmpData = res.data));
        this.setState({ apiData: tmpData })
        console.log(this.state.apiData);
        let n = this.state.apiData.length;
        console.log(n);
        let ranIndex = Math.floor(Math.random() * n);
        this.setState({
            n: this.state.apiData[0]['n'],
            matrix_A: this.state.apiData[0]['matrixA'],
            matrix_B: this.state.apiData[0]['matrixB'],
            error: this.state.apiData[0]['error'],
            matrix_X: this.state.apiData[0]['init_x']

        })

    }
    onClickExample = e => {
        this.GetDatafromAPI()
    }
    ShowMatrix_A = e => {
        let arr = [];
        let tmpMatrix = this.state.matrix_A;
        for (let i = 0; i < this.state.n; i++) {
            for (let j = 0; j < this.state.n; j++) {
                arr.push(<span style={{ margin: '2.5px' }}><Input name={(i).toString() + " " + (j).toString()} style={{ width: '50px', textAlign: 'center' }} onChange={this.onChangeMatrix} autoComplete="off" value={tmpMatrix[i][j]} /></span>)
            }
            arr.push(<div style={{ margin: '5px' }}></div>)
        }
        return (arr);
    }
    ShowMatrix_X = e => {
        let arr = [];

        for (let i = 0; i < this.state.n; i++) {
            for (let j = 0; j < 1; j++) {
                arr.push(<span style={{ margin: '2.5px', fontSize: '20px' }}>X{i + 1}</span>)
            }
            arr.push(<div style={{ margin: '5px' }}></div>)
        }
        return (arr);
    }
    ShowMatrix_X_s = e => {
        let arr = []
        let number = this.state.matrix_X;
        for (let i = 0; i < this.state.n; i++) {
            arr.push(<span style={{ margin: '2.5px' }}><Input name={(i).toString()} style={{ width: '50px', textAlign: 'center' }} onChange={this.onChangeX} autocomplete="off" value={number[i]} /></span>)
            arr.push(<div style={{ margin: '5px' }}></div>)
        }
        return (arr);
    }
    ShowMatrix_B = e => {
        let arr = []
        let number = this.state.matrix_B;
        for (let i = 0; i < this.state.n; i++) {
            arr.push(<span style={{ margin: '2.5px' }}><Input name={(i).toString()} style={{ width: '50px', textAlign: 'center' }} onChange={this.onChangeMatrix_B} autocomplete="off" value={number[i]} /></span>)
            arr.push(<div style={{ margin: '5px' }}></div>)
        }
        return (arr);
    }

    onChangeMatrix = e => {
        let tmpIndex = e.target.name.split(" ");
        let tmpMt = this.state.matrix_A;
        tmpMt[parseInt(tmpIndex[0])][parseInt(tmpIndex[1])] = e.target.value;
        this.setState({ matrix_A: tmpMt });
    }
    onChangeMatrix_B = e => {
        let name = e.target.name.toString();
        let arr = this.state.matrix_B;
        let index = parseInt(name);
        arr[index] = e.target.value;
        //console.log(name);
        this.setState({ matrix_B: arr });
    }
    onChangeError = e => {
        this.setState({ error: e.target.value })
    }
    onChangeX = e => {
        let name = e.target.name.toString();
        let arr = this.state.matrix_X;
        let index = parseInt(name);
        arr[index] = e.target.value;
        //console.log(name);
        this.setState({ matrix_X: arr });
    }
    add_dm = (e) => {
        let n = this.state.n
        if (n < 8) {
            this.setState({ n: n + 1 })
        }
        else {
            return;
        }
        let arr_a = this.state.matrix_A;
        let arr_b = this.state.matrix_B;
        let arr_x = this.state.matrix_X;
        arr_a.push([]);
        arr_b.push(null);
        arr_x.push(null);
        for (let i = 0; i < n + 1; i++) {
            arr_a[i].push(null);
        }
        this.setState({ matrix_A: arr_a });
        this.setState({ matrix_B: arr_b });
        this.setState({ matrix_X: arr_x });
        //console.log(arr_a);
    }

    del_dm = (e) => {
        let n = this.state.n;
        if (n > 2) {
            this.setState({ n: n - 1 })
        }
        else {
            return;
        }
        let arr_a = this.state.matrix_A;
        let arr_b = this.state.matrix_B;
        let arr_x = this.state.matrix_X;
        arr_a.pop();
        arr_b.pop();
        arr_x.pop();
        for (let i = 0; i < n - 1; i++) {
            arr_a[i].pop();
        }
        this.setState({ matrix_A: arr_a });
        this.setState({ matrix_B: arr_b });
        this.setState({ matrix_X: arr_x });
        //console.log(arr_a);
    }
    find_x = e => {

        if (this.state.error === null) {
            this.setState({ ifer: (<div style={{ fontSize: '30px', color: 'red' }}>โปรดกรอกข้อมูลให้ครบ</div>) })
            return
        }
        try {
            this.setState({ ifer: null })
            let data = this.Calculate(this.state.n, this.state.matrix_A, this.state.matrix_B, this.state.error, this.state.matrix_X)
            let arr = []
            for (let i = 0; i < data.length; i++) {
                arr.push(<div style={{ marginTop: '10px', fontSize: '30px' }}>X{i + 1} = {data[i]}</div>)
            }
          
        
            
            this.setState({ dataSource: arr })
        } catch (error) {
            this.setState({ ifer: (<div style={{ color: 'red' }}>ใส่ฟังก์ชั่นไม่ถูกต้อง {error}</div>) })
        }

    }
    cloneMatrix(initMatrix) {
        let arr = initMatrix.map(x => [...x])
        return arr
    }
    Calculate(n, initMatrixA, initMatrixB, initError, initMatrixX) {

        let MatrixA = this.cloneMatrix(initMatrixA)
        let MatrixB = [...initMatrixB]
        let error = parseFloat(initError)
        let x = [...initMatrixX]
        let tmpX = [...x]
        let data = []
        let checkError = true
        let iteration = 1

       
        while (checkError) {


           
            checkError = false
            
            
            for (let i = 0; i < n; i++) {

                let sum = 0
                for (let j = 0; j < n; j++) {
                    if (i !== j) {
                        sum = sum + MatrixA[i][j] * x[j]
                    }
                }
                tmpX[i] = (MatrixB[i] - sum) / MatrixA[i][i]
                let tmpErr = Math.abs((tmpX[i] - x[i]) / tmpX[i])
            
            
      
                if (tmpErr > error) {
                    checkError = true
                }
            }
            if(iteration>=20){
                
                break;

            }
            x = tmpX.map(x => x)
            iteration = iteration + 1
        }
        x.map((x, i) => data.push(math.round(x, 15).toString()))
         
        return data 
    }
    render() {
        return (
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'left' }}>
                <h1 className="header-content" style={{ fontSize: '20px' }}>JacobiIteration Method</h1>

                <div>
                    <span style={{ marginLeft: '10px' }}><Button type="primary" onClick={this.del_dm} >-</Button></span>
                    <span style={{ marginLeft: '10px' }}>{this.state.n} x {this.state.n}</span>
                    <span style={{ marginLeft: '10px' }}><Button type="primary" onClick={this.add_dm} >+</Button></span>

                </div>

                <div style={{ display: 'flex', flexFlow: 'row', marginTop: '5px' }}>
                    <div style={{ alignItems: 'center' }}>{this.ShowMatrix_A()}</div>
                    <div style={{ alignItems: 'center', marginLeft: '30px' }}>{this.ShowMatrix_B()}</div>
                    <div style={{ alignItems: 'center', marginLeft: '30px' }}>{this.ShowMatrix_X()}</div>
                    <div style={{ alignItems: 'center', marginLeft: '30px' }}>{this.ShowMatrix_X_s()}</div>
                </div>
                <div>
                    Error =
                        <span><Input style={{ width: '100px', marginLeft: '5px', marginRight: '5px' }} placeholder='0.000001' onChange={this.onChangeError} value={this.state.error}></Input></span>

                </div>
                <div>
                    <Button style={{ marginLeft: '5px', width: '100px', marginTop: '5px' }} type='primary' onClick={this.onClickExample}>Example</Button>
                    <Button style={{ marginLeft: '5px', width: '100px', marginTop: '5px' }} type='primary' onClick={this.find_x}>Calculate</Button>
                </div>
                <div>{this.state.ifer}</div>
              {/*  <div>
                  _  <Table columns={this.state.columns} dataSource={this.state.data} />
              </div>*/} 
                <div>
                    {this.state.dataSource}
                </div>

            </div>
        )
    }
}


export default JacobiIterationMethod;
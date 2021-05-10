import React from 'react'
import {Button, Input} from 'antd'
import {equation_func, fixed_fx} from './Equation_Function'


class Cramer extends React.Component{
    state = {
        Arr:null,
        column:3,
        row:3,
        x:null
    }
    
    create_box (){
        let Row = this.state.row;
        let Col = this.state.column;
        let arr = [];
        for (let i = 0 ; i<Row ; i++){
            for(let j = 0 ;j<Col ;j++){
                arr.push(<div><Input style={{width:'30px'}} /></div>)

            }
            arr.push(<br/>);
        }
        this.setState({x:arr});
        return (this.state.x);
    }
    Handler_sub = e =>{
        let r = parseInt(this.state.column);
        let c = parseInt(this.state.row);
       
        if( (r-1>=2 && c-1>=2) && (r-1<=5 && c-1<=5)){
          
            this.setState({column:c-1,row:r-1});
        }
        let arr = [];
        for (let i = 0; i < r; i++) {
            arr[i] = [];
            for (let j = 0; j < c; j++) {
              arr[i][j] = <div><Input style={{width:'30px'}}/></div>;
            }
          }
        this.setState({x:arr})
    }
    Handler_plus = e =>{
        let r = parseInt(this.state.column);
        let c = parseInt(this.state.row);
        var arr = [...Array(r)].map(e => Array(c));
        if( (r+1>=2 && c+1>=2) && (r+1<=5 && c+1<=5)){
        
            this.setState({column:c+1,row:r+1});
        }
        
    }
    render(){
        return(
            <div>
                <div className="site-layout-background" style={{ padding: 24, textAlign: 'left' }}>
                <h1 className="header-content">Cramer</h1>
                <div> 
                    <span style={{marginLeft:'10px'}}><Button type="primary" onClick={this.Handler_sub} >-</Button></span>
                    <span style={{marginLeft:'10px'}}>{this.state.row} x {this.state.column}</span>
                    <span style={{marginLeft:'10px'}}><Button type="primary" onClick={this.Handler_plus} >+</Button></span>
                    
                </div>
                <div>
                    {this.state.x}
                </div>
                <div style={{marginTop:'20px'}}>
                   <span style={{marginLeft:'10px'}}><Input style={{width:'20px'}}></Input></span>
                </div>
                
                
                
            </div>
            
           
           </div>
        );

        
    }
}

export default Cramer;


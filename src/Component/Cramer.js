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
    
    create_box = e =>{
        let Row = this.state.row;
        let Col = this.state.column;
        let arr = [];
        for (let i = 0 ; i<Row ; i++){
            for(let j = 0 ;j<Col ;j++){
                arr.push(<div><Input style={{width:'57px'}} /></div>)
                
            }
            arr.push(<br/>);
        }
        this.setState({Arr:arr});
    }

    render(){
        return(
            <div>
            
            
           
           </div>
        );

        
    }
}

export default Cramer;


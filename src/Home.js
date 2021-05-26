//import {Input,Button} from 'antd';
//import { identity } from 'mathjs';
import React from 'react';

class Home extends React.Component {
  /*  state ={
        text:'',
        text2:' '
    }
    changetext = e=>{
        this.setState({text:e.target.value})
    }
    // case , ' "
    convert = e =>{
        let textinput = this.state.text;
        let ans = "";
        let alltext_ENG="1234567890-=qwertyuiop[]asdfghjkl;zxcvbnm./"
        let alltext2_ENG='!@#$%^&*()_+QERTYUIOP{ASDFGHJKL;ZXCVBNM<>?'
        let alltext_TH="ๅ/-ภถุึคตจขชๆไำพะัีรนยบลฟหกดเ้่าสวผปแอิืทใฝ"
        let alltext2_TH="+๑๒๓๔ู฿๕๖๗๘๙๐ฎฑธํ๊ณฯญฐฤฆฏโฌ็๋ษศซ()ฉฮฺ์?ฬฦ"
        console.log(alltext_TH.length);
        let all_ENG = alltext_ENG + alltext2_ENG;
        let all_TH = alltext_TH + alltext2_TH;
        for(let i=0;i<textinput.length;i++){
            for(let j=0;j< all_ENG.length;j++){
                console.log(all_ENG[j],textinput[i]);
                if(all_ENG[j] === textinput[i]){
                    //console.log(all_ENG[j],textinput[i]);
                    ans = ans + all_TH[j];
                    break;
                }
                else if(textinput[i]=== ','){ans = ans+'ม';break;}
                else if(textinput[i]=== '<'){ans = ans+'ฒ';break;}
                else if(textinput[i]=== "'"){ans = ans+'ง';break;}
                else if(textinput[i]=== '"'){ans = ans+'.';break;}
                else if(textinput[i]=== ' '){ans = ans+' ';break;}
            }
        }
        console.log(ans);
        this.setState({text2:ans})
    }*/
    render(){
        return(
            <div >
                <h1 style={{fontSize:'100px',textAlign:'center'}}>Hello</h1>
              {/*  <div style={{marginTop:'5px'}}><center><Input placeholder='kltkdy7uy[' style={{width:'300px',textAlign:'center'}} onChange={this.changetext}></Input></center></div>
                <div style={{marginTop:'5px'}}><center><Button type='primary' onClick={this.convert}>แปลง</Button></center></div>
        <div style={{marginTop:'5px' , fontSize:"30px"}}><center>{this.state.text2}</center></div> */}
            </div>
        );
    }
   
}


export default Home;

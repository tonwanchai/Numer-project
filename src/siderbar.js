import React,{Component} from 'react';
import { Layout, Menu } from 'antd';
import {Link} from 'react-router-dom';
const { SubMenu } = Menu;
const { Sider } = Layout;
class siderbar extends Component{
    render(){
        return(
           
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <Menu.Item key="1" >Home<Link to="/" /></Menu.Item>
                            <SubMenu key="sub1" title="Root of Equation">
                                <Menu.Item key="2">Bisection<Link to="/Bisection" /></Menu.Item>
                                <Menu.Item key="3">FalsePosition<Link to="/FalsePosition" /></Menu.Item>
                                <Menu.Item key="4">Onepoint<Link to="/Onepoint" /></Menu.Item>
                                <Menu.Item key="5">NewtonRaphson<Link to="/NewtonRaphson" /></Menu.Item>
                                <Menu.Item key="6">Secant <Link to="/Secant" /></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title="Matrix">
                                <Menu.Item key="7">Cramer <Link to="/Cramer"/></Menu.Item>
                                <Menu.Item key="8">option7</Menu.Item>
                                <Menu.Item key="9">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title="Interpolation">
                                <Menu.Item key="10">NewtonDivide <Link to="/NewtonDivide"/></Menu.Item>
                            </SubMenu>
                        </Menu>
                  
        )
    }
}

export default siderbar;
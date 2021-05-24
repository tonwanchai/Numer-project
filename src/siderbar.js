import React,{Component} from 'react';
import {  Menu } from 'antd';
import {Link} from 'react-router-dom';
const { SubMenu } = Menu;

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
                                <Menu.Item key="8">GaussElimination  <Link to="/GaussElimination" /></Menu.Item>
                                <Menu.Item key="9">GaussJordanMethod <Link to="/GaussJordanMethod" /></Menu.Item>
                                <Menu.Item key="10">LUdecomposition <Link to="/LUdecomposition" /></Menu.Item>
                                <Menu.Item key="11">JacobiIterationMethod <Link to="/JacobiIterationMethod" /></Menu.Item>
                                <Menu.Item key="12">GaussSeidel <Link to="/GaussSeidel" /></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title="Interpolation">
                                <Menu.Item key="10">NewtonDivide <Link to="/NewtonDivide"/></Menu.Item>
                                <Menu.Item key="11">Lagrange <Link to="/Lagrange"/></Menu.Item>
                                <Menu.Item key="12">Spline <Link to="/Spline"/></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub4" title="Regression">
                                <Menu.Item key="16">PolynomialRegression<Link to="/PolynomialRegression" /></Menu.Item>
                            </SubMenu>
                        </Menu>
                  
        )
    }
}

export default siderbar;
import { Layout } from 'antd';

import './lay.css'
import Siderbar from './siderbar';
import React, { Component } from 'react';
import 'antd/dist/antd.css';

import { HashRouter, Route } from 'react-router-dom';
import Home from './Home';
import Bisection from './Component/Bisection';
import Onepoint from './Component/Onepoint';
import FalsePosition from './Component/FalsePosition';
import NewtonRaphson from './Component/NewtonRaphson';
import Secant from './Component/Secant';
import Cramer from './Component/Cramer';
import NewtonDivide from './Component/NewtonDivide';
import SwaggerAPI from './Container/SwaggerAPI';
import Spline from './Component/Spline';
import Lagrange from './Component/Lagrange';
import GaussElimination from './Component/GaussElimination';
import GaussJordanMethod from './Component/GaussJordanMethod';
import GaussSeidel from './Component/GaussSeidel';
import JacobiIterationMethod from './Component/JacobiIterationMethod';
import LUdecomposition from './Component/LUdecomposition';
import PolymomialRegression from './Component/Regression';
const { Header, Content, Sider } = Layout;
class App extends Component {

    render() {

        return (
            <HashRouter>
                <Layout>
                    <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%', paddingLeft: '5px' }}>

                                <h1 style={{ color: 'white', textAlign: 'center' }}>Numerical Method</h1>
                                
                    </Header>
                    <Layout>
                        <Sider width={200} className="site-layout-background" style={{
                            overflow: 'auto',
                            height: '100vh',
                            marginTop: '64px',
                            position: 'fixed',
                            left: 0,

                        }}>
                            <Siderbar />
                        </Sider>
                        <Layout className="site-layout" style={{ marginLeft: 200, minHeight: '100vh' }}>
                            <Header className="site-layout-background" style={{ padding: 0 }} />
                            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                                <div>

                                    <Route path='/' exact component={Home} />
                                    <Route path='/Bisection' component={Bisection} />
                                    <Route path='/Onepoint' component={Onepoint} />
                                    <Route path='/FalsePosition' component={FalsePosition} />
                                    <Route path='/NewtonRaphson' component={NewtonRaphson} />
                                    <Route path='/Secant' component={Secant} />
                                    <Route path='/Cramer' component={Cramer} />
                                    <Route path='/NewtonDivide' component={NewtonDivide} />
                                    <Route path='/Spline' component={Spline} />
                                    <Route path='/Lagrange' component={Lagrange} />
                                    <Route path='/GaussElimination' component={GaussElimination} />
                                    <Route path='/GaussJordanMethod' component={GaussJordanMethod} />
                                    <Route path='/JacobiIterationMethod' component={JacobiIterationMethod} />
                                    <Route path='/GaussSeidel' component={GaussSeidel} />
                                    <Route path='/LUdecomposition' component={LUdecomposition} />
                                    <Route path='/PolynomialRegression' component={PolymomialRegression} />
                                    <Route path='/Swagger' component={SwaggerAPI} />
                                </div>

                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </HashRouter>
        )
    }

}

export default App;
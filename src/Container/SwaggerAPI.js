import React from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import { config } from './SwaggerConfig.js'

class SwaggerAPI extends React.Component{
    render(){
        return(
            <div className="site-layout-background">
                <SwaggerUI spec={config} />
            </div>
        )
    }
}

export default SwaggerAPI
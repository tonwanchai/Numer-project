import functionPlot from "function-plot";
import React from "react";

class test extends React.Component {

    plot() {
        const contentsBounds = document.body.getBoundingClientRect();
        let width = 800;
        let height = 500;
        let ratio = contentsBounds.width / width;
        width *= ratio;
        height *= ratio;

        functionPlot({
            target: "#root",
            width,
            height,
            yAxis: { domain: [-1, 9] },
            grid: true,
            data: [
                {
                    fn: "x^2",
                    derivative: {
                        fn: "2 * x",
                        updateOnMouseMove: true
                    }
                }
            ]
        });
    }
    render() {
        return (
            <div>
                {functionPlot({
                    target: '#quadratic',
                    data: [{
                        fn: 'x^2'
                    }]
                })}
            </div>
        )
    }
}

export default test;


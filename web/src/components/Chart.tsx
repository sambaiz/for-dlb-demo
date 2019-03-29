import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import DLBContainer from '../containers/DLBContainer'
import { BarChart, XAxis, Bar, Legend } from 'recharts'

class Chart extends Component {
    data(container: DLBContainer) {
        if (container.state.treatedScore && container.state.untreatedScore) {
            return [{
                name: "PMX非投与",
                生存率: Number.parseFloat(container.state.untreatedScore.toFixed(2))
            }, {
                name: "PMX投与",
                生存率: Number.parseFloat(container.state.treatedScore.toFixed(2))
            }]
        }
    }
    render() {
        return (
            <Subscribe to={[DLBContainer]}>
                {(container: DLBContainer) =>
                    <div>
                        <BarChart width={300} height={300} data={this.data(container)} margin={{ top: 20 }}>
                            <XAxis dataKey="name" />
                            <Bar dataKey="生存率" fill="#82ca9d" label={{ position: 'top' }} />
                            <Legend />
                        </BarChart>
                    </div>
                }
            </Subscribe>
        );
    }
}

export default Chart;

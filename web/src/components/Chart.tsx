import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import DLBContainer from '../containers/DLBContainer'
import { BarChart, XAxis, Bar, Legend } from 'recharts'

class Chart extends Component {
    data(container: DLBContainer) {
        if (container.shouldShowResult()) {
            return [{
                name: "PMX非投与",
                予想ICU滞在時間: container.state.BMI! * container.state.CRP!
            }, {
                name: "PMX投与",
                予想ICU滞在時間: container.state.BMI! + container.state.CRP!
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
                            <Bar dataKey="予想ICU滞在時間" fill="#82ca9d" label={{ position: 'top' }} />
                            <Legend />
                        </BarChart>
                    </div>
                }
            </Subscribe>
        );
    }
}

export default Chart;

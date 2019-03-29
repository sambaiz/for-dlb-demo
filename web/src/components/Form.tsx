import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Subscribe } from 'unstated';
import DLBContainer from '../containers/DLBContainer'

class Form extends Component {
    handleAge(container: DLBContainer) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            container.changeAge(Number.parseFloat(e.target.value))
        }
    }

    handleChangeBMI(container: DLBContainer) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            container.changeBMI(Number.parseFloat(e.target.value))
        }
    }

    handleHbA1c(container: DLBContainer) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            container.changeHbA1c(Number.parseFloat(e.target.value))
        }
    }

    handleWBC(container: DLBContainer) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            container.changeWBC(Number.parseFloat(e.target.value))
        }
    }

    handleCRP(container: DLBContainer) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            container.changeCRP(Number.parseFloat(e.target.value))
        }
    }

    handleLac(container: DLBContainer) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            container.changeLac(Number.parseFloat(e.target.value))
        }
    }

    handleSubmit(container: DLBContainer) {
        return (e: React.FormEvent<HTMLFormElement>) => {
            container.postEstimate()
            e.preventDefault()
        }
    }

    render() {
        return (
            <Subscribe to={[DLBContainer]}>
                {(container: DLBContainer) =>
                    <form onSubmit={this.handleSubmit(container)} noValidate autoComplete="off">
                        <div>
                            <div>
                                <TextField
                                    id="age"
                                    label="Age"
                                    type="number"
                                    value={container.state.age}
                                    onChange={this.handleAge(container)}
                                    margin="normal"
                                />
                            </div>
                            <div>
                                <TextField
                                    id="bmi"
                                    label="BMI"
                                    type="number"
                                    value={container.state.BMI}
                                    onChange={this.handleChangeBMI(container)}
                                    margin="normal"
                                />
                            </div>
                            <div>
                                <TextField
                                    id="hba1c"
                                    label="HbA1c"
                                    type="number"
                                    value={container.state.HbA1c}
                                    onChange={this.handleHbA1c(container)}
                                    margin="normal"
                                />
                            </div>
                            <div>
                                <TextField
                                    id="wbc"
                                    label="WBC"
                                    type="number"
                                    value={container.state.WBC}
                                    onChange={this.handleWBC(container)}
                                    margin="normal"
                                />
                            </div>
                            <div>
                                <TextField
                                    id="crp"
                                    label="CRP"
                                    type="number"
                                    value={container.state.CRP}
                                    onChange={this.handleCRP(container)}
                                    margin="normal"
                                />
                            </div>
                            <div>
                                <TextField
                                    id="lac"
                                    label="Lac"
                                    type="number"
                                    value={container.state.Lac}
                                    onChange={this.handleLac(container)}
                                    margin="normal"
                                />
                            </div>
                            <div>
                                <Button type="submit" variant="outlined" color="primary" disabled={!container.canSendRequest()}>
                                    Estimate
                                </Button>
                            </div>
                        </div>
                    </form>
                }
            </Subscribe>
        );
    }
}

export default Form;

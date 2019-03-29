import { Container } from 'unstated';
import axios from 'axios'

interface State {
  age?: number,
  BMI?: number,
  HbA1c?: number,
  WBC?: number,
  CRP?: number,
  Lac?: number,
  treatedScore?: number,
  untreatedScore?: number
}

interface Response { untreated: number, treated: number }

class DLBContainer extends Container<State> {
  state: State = {};

  changeAge(value: number) {
    this.setState({ age: value });
    this.postEstimate()
  }

  changeBMI(value: number) {
    this.setState({ BMI: value });
    this.postEstimate()
  }

  changeHbA1c(value: number) {
    this.setState({ HbA1c: value });
    this.postEstimate()
  }

  changeWBC(value: number) {
    this.setState({ WBC: value });
    this.postEstimate()
  }

  changeCRP(value: number) {
    this.setState({ CRP: value });
    this.postEstimate()
  }

  changeLac(value: number) {
    this.setState({ Lac: value });
    this.postEstimate()
  }



  async postEstimate() {
    if (this.shouldShowResult) {
      const resp = await axios.post<Response>(`http://localhost:3001/estimate`, {
        data: [this.state.age, this.state.HbA1c, this.state.BMI, this.state.WBC, this.state.CRP, this.state.Lac]
      })
      const data = resp.data
      this.setState({ untreatedScore: data.untreated, treatedScore: data.treated })
    }
  }

  shouldShowResult(): boolean {
    return typeof this.state.age !== 'undefined' &&
      typeof this.state.BMI !== 'undefined' &&
      typeof this.state.HbA1c !== 'undefined' &&
      typeof this.state.WBC !== 'undefined' &&
      typeof this.state.CRP !== 'undefined' &&
      typeof this.state.Lac !== 'undefined'
  }
}

export default DLBContainer
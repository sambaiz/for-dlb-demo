from flask import Flask
from flask_cors import CORS
import torch
import model
import json

app = Flask(__name__)
CORS(app)

vae = model.VAE(6, 2)
vae.load_state_dict(torch.load('./saved/vae'))
estimator = model.Estimator()
estimator.load_state_dict(torch.load('./saved/estimator'))

@app.route("/ping", methods=['GET'])
def ping():
    return 'ok'

@app.route("/estimate", methods=['POST'])
def estimate():
    data = request.data.decode('utf-8')
    data = json.loads(data) # {"data": [age, HbA1c, BMI, WBC, CRP, Lac]}
    _, z = vae(torch.Tensor([data['data']]))
    outcome_untreat = estimator(z, torch.Tensor([0].float())).cpu().detach().numpy()[0]
    outcome_treat = estimator(z, torch.Tensor([1].float())).cpu().detach().numpy()[0]
    return {"untreated": outcome_untreat, "treated": outcome_treat}

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=3001)
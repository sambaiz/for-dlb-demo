import torch
import torch.utils.data
import numpy as np
import model

def make_loader(size=70000, batch_size=1000):
    treat = np.random.binomial(1,0.5,size=size)
    beta2 = 0.8/5.
    beta3 = 2
    beta4 = 0.5

    beta5 = 0.4/20.
    beta6 = 0.3/5.
    beta7 = 0.5

    beta8 = 0.3
    beta9 = 0.2
    beta10 = 0.3
    beta11 = 0.5/2.
    beta12=0.4/5
    beta13=1.0/8.
    
    x2 = np.random.normal(50,14,size=size) #age
    x3 = np.random.normal(6,3,size=size) #HbA1c
    x4 = np.random.normal(24,4,size=size) #BMI
    x5 = np.random.normal(5,1, size=size) #WBC
    x6 = np.random.gamma(2,2,size=size) #CRP
    x7 = np.random.gamma(2,2,size=size) #Lac

    arterial_risk=(beta2*x2+beta3*x3+beta4*x4+beta5*x2*x3+beta6*x4*x3)/100
    sepsis_risk = (beta7*x3 + beta8*x5+beta9*x6+beta10*x7+beta11*x3*x5+beta12*x6*x7+beta13*x3*x7)/10000
    effect = arterial_risk*2.9+sepsis_risk*0.5-1.2
    outcome=np.random.normal(0.6*sepsis_risk+1.4*arterial_risk+effect*treat+12,3,size=size)

    data = np.array((x2,x3,x4,x5,x6,x7)).T
    train_data = torch.Tensor(data[:60000])#[:,1:-1]
    test_data = torch.Tensor(data[60000:])#[:,1:-1]

    train_loader = torch.utils.data.DataLoader(dataset=[
        {'data': train_data[i], 
        'treat': torch.Tensor([treat[i]]).float(),
        'outcome': torch.Tensor([outcome[i]]).float()
        } for i in range(60000)], batch_size = batch_size, shuffle=True)
    test_loader = torch.utils.data.DataLoader(dataset=[
        {'data': test_data[i], 
        'treat': torch.Tensor([treat[60000+i]]).float(),
        'outcome': torch.Tensor([outcome[60000+i]]).float()
        } for i in range(10000)], batch_size = batch_size, shuffle = False)

    return train_loader, test_loader

def main():
    train_loader, test_loader = make_loader()
    print("train VAE")
    vae = model.VAE(6, 2)
    vae_optimizer = torch.optim.Adam(vae.parameters(), lr=0.001)
    losses = []
    for i in range(3):
        for data in train_loader:
            vae.zero_grad()
            loss = vae.loss(data['data'])
            loss.backward()
            vae_optimizer.step()
            losses.append(loss.cpu().detach().numpy())
        print("EPOCH: {} loss: {}".format(i, np.average(losses)))
    torch.save(vae.state_dict(), './saved/vae')

    print("train Estimator")
    estimator = model.Estimator()
    estimator_optimizer = torch.optim.Adam(vae.parameters(), lr=0.001)
    losses = []
    for i in range(3):
        for data in train_loader:
            estimator.zero_grad()
            _, z = vae(data['data'])
            loss = estimator.loss(z, data['treat'], data['outcome'])
            loss.backward()
            estimator_optimizer.step()
            losses.append(loss.cpu().detach().numpy())
        print("EPOCH: {} loss: {}".format(i, np.average(losses)))
    torch.save(estimator.state_dict(), './saved/estimator')

if __name__ == '__main__':
    main()
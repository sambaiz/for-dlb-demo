import torch
import torch.nn as nn
import torch.nn.functional as F

class VAE(nn.Module):
    def __init__(self, data_dim, z_dim):
      super(VAE, self).__init__()
      self.dense_enc1 = nn.Linear(data_dim, 100)
      self.dense_enc2 = nn.Linear(100, 100)
      self.dense_enc3 = nn.Linear(100, 100)
      self.dense_encmean = nn.Linear(100, z_dim)
      self.dense_encvar = nn.Linear(100, z_dim)
      self.dense_dec1 = nn.Linear(z_dim, 100)
      self.dense_dec2 = nn.Linear(100, 100)
      self.dense_dec3 = nn.Linear(100, data_dim)
      self.mse = nn.MSELoss()
    
    def _encoder(self, x):
      x = F.relu(self.dense_enc1(x))
      x = F.relu(self.dense_enc2(x))
      mean = self.dense_encmean(x)
      var = F.softplus(self.dense_encvar(x))
      return mean, var
    
    def _sample_z(self, mean, var):
      epsilon = torch.randn(mean.shape)
      return mean + torch.sqrt(var) * epsilon
 
    def _decoder(self, z):
      x = F.relu(self.dense_dec1(z))
      x = F.relu(self.dense_dec2(x))
      x = F.relu(self.dense_dec3(x))
      return x

    def forward(self, x):
      mean, var = self._encoder(x)
      z = self._sample_z(mean, var)
      x = self._decoder(z)
      return x, z
    
    def loss(self, x):
      mean, var = self._encoder(x)
      KL = -0.5 * torch.mean(torch.sum(1 + torch.log(var) - mean**2 - var))
      z = self._sample_z(mean, var)
      y = self._decoder(z)
      reconstruction = self.mse(x, y)
      lower_bound = [-KL, reconstruction]                                      
      return -sum(lower_bound)

class Estimator(nn.Module):
    def __init__(self):
        super(Estimator, self).__init__()
        self.fc1 = nn.Linear(3, 100)
        self.fc2 = nn.Linear(100, 100)
        self.fc3 = nn.Linear(100, 1)
        self.mse = nn.MSELoss()
        
    def forward(self,z,y):
        h = F.relu(self.fc1(torch.cat([z,y],1)))
        h = F.relu(self.fc2(h))
        return self.fc3(h)
    
    def loss(self, z, y, outcome):
        outcome_est = self.forward(z, y)
        return self.mse(outcome_est.view(-1), outcome)

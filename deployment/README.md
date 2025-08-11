# Running the Cluster with Minikube

Follow the steps below to set up and run the cluster locally using Minikube.

## 1. Start the Minikube Cluster
```bash
minikube start
```
##  2. Enable the Ingress Add-on
```bash
minikube addons enable ingress
```

##  2.5 Enable the Metric-server Add-on
```bash
minikube addons enable metrics-server
```

## 3. Deploy Application Components
From the deployment directory, apply all Kubernetes manifests
```bash
kubectl apply -f .
```
## 4. Create Tunnel
This will expose the LoadBalancer services to your local machine:
```bash
minikube tunnel
```

## 5.
helm add prometheus repo

## 6.
helm install prothemus/kube-prometheus-stack

## 7.
port forward or node export prometheus and then query from it



Once the tunnel is running, the application will be accessible at:
http://dev.local
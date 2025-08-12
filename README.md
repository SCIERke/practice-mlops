# Structure of Folder in this project
In this project, there is many part of it which i seperate it into folder which look like this
---
  |= backend ( Contains the full source code for the API logic and server implementation, built with **FastAPI** )
  |- deploy-llm ( Experimental workspace where various AI deployment tools and frameworks are tested, including **vLLM**, **Triton**, and **TorchServe** )
  |- deployment ( Contains Kubernetes configuration files along with detailed instructions on how to build and deploy the project )
  |- frontend ( The web client implemented with **Vite + React**. This provides the chat-based user interface that connects to the backend API )
  |- inference-server ( Dedicated AI inference server that handles model serving and scales independently. This server communicates with the backend and frontend to deliver AI-powered features )

In backend ,frontend ,infernece , will have 2 Dockerfile that is for dev and deployment


Each of the `backend`, `frontend`, and `inference-server` folders includes two Dockerfiles: one for development and one for production deployment.


# Setting Up

## Development
For development, you don't need to interact with the individual Dockerfiles directly. Instead, run the following command from the root of the project:

```bash
docker compose -f docker-compose-dev.yml up -d
```
This will start all the necessary development containers in detached mode.

Once running, you will have access to ChatBase, an application that predicts your emotional tone from text input.

## Deployment (Production Setup Using Kubernetes)

This project is deployed using Kubernetes (k8s). Please note that all deployment instructions and testing have been done on a **single-node Minikube** environment.

> **Important:** The setup may differ if you want to deploy this project on cloud-managed Kubernetes services such as **Amazon EKS**, **Google GKE**, or others. Additional configuration and adjustments will likely be required for multi-node clusters, cloud-specific networking, storage, and security.

---

If you plan to deploy on cloud Kubernetes platforms, please consider:

- Configuring proper cloud storage classes and persistent volumes
- Adjusting load balancer and ingress controller settings
- Managing secrets and environment variables securely
- Scaling your cluster according to expected traffic and load

---

The detailed Kubernetes manifests and deployment instructions can be found in the [`deployment`](./deployment) folder.z
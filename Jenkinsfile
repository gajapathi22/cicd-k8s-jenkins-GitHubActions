pipeline {
    agent any
    
    environment {
        DOCKERHUB_USER = 'gajapathi22'
        BACKEND_IMAGE = "${DOCKERHUB_USER}/cicd-backend:latest"
        FRONTEND_IMAGE = "${DOCKERHUB_USER}/cicd-frontend:latest"
    }
    
    stages {
        stage('checkout'){
            steps {
                checkout scm
        }
    }
       stage('Build Backend IMage'){
         steps{
            sh 'docker build -t $BACKEND_IMAGE ./backend'
         }
       }

       stage('Build Frontend Image'){
         steps{
            sh 'docker build -t $FRONTEND_IMAGE ./frontend'
         }
       }

       stage('Docker Login & Push'){
        steps{
            withCredentials([usernamePassword(
                credentialsId: 'a806cdfc-0b3a-40ee-9406-0ebc4c6110dc', 
                usernameVariable: 'DOCKERHUB_USERNAME', 
                passwordVariable: 'DOCKERHUB_PASSWORD'
                )]) {
                sh 'echo $DOCKERHUB_PASSWORD | docker login -u $DOCKERHUB_USERNAME --password-stdin'
                sh 'docker push $BACKEND_IMAGE'
                sh 'docker push $FRONTEND_IMAGE'
            }
        }
       }

       stage('Deploy to Minikube'){
        steps{
            sh 'kubectl apply -f k8s/namespace.yaml'
            sh 'kubectl apply -f k8s/backend-deployment.yaml'
            sh 'kubectl apply -f k8s/frontend-deployment.yaml'
            sh 'kubectl apply -f k8s/backend-service.yaml'
            sh 'kubectl apply -f k8s/frontend-service.yaml'
        }
       }
    }
}
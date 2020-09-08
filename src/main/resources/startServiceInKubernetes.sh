echo ___ STOP AND DELETE MINIKUBE ___
echo

minikube stop
minikube delete

echo
echo ___ FINISHED STOPPING AND DELETING MINIKUBE ___
echo ___ START MINIKUBE ___
echo

minikube start

echo
echo ___ FINISHED STARTING MINIKUBE ___
echo ___ SETTING ENVIRONMENT VARIABLES OF MINIKUBE ___
echo

eval $(minikube docker-env)

echo
echo ___ FINISHED SETTING ENVIRONMENT VARIABLES OF MINIKUBE ___
echo ___ START BUILDING DOCKER IMAGE ___
echo

cd ../../..
./mvnw clean package -Dquarkus.container-image.build=true

echo
echo ___ FINISHED BUILDING DOCKER IMAGE ___
echo ___ START PUSHING SERVICE TO MINIKUBE CLUSTER ___
echo

kubectl apply -f target/kubernetes/minikube.json

echo
echo ___ FINISHED PUSHING SERVICE TO MINIKUBE CLUSTER ___
echo ___ START SERVICE IN MINIKUBE CLUSTER ___
echo

minikube service list
minikube service chat-microservice

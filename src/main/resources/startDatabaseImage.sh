echo ___ RUN DATABASE IN DOCKER CONTAINER ___
echo

docker run -ti --rm -p 5432:5432 -e POSTGRES_PASSWORD=password postgres:latest

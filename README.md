# Sprint Graph

## Run
mvn spring-boot:run 
or java -jar sprint-graph-X.X.X.jar

## Web
http://localhost:9000/

## API
http://localhost:9000/api

## Release
mvn -Dusername=your_scm_username release:prepare release:perform -Darguments="-Dmaven.deploy.skip=true"

## Deployment

# Build the docker image
docker build -t amauryleclerc/sprint-graph .

# Deploy the image within your container
docker run -p 9000:9000 amauryleclerc/sprint-graph

# Undeploy
docker stop <ID>
# Sprint Graph

## Run
mvn spring-boot:run 
or java -jar sprint-graph-X.X.X.jar

## Web
http://localhost:9000/

## API
http://localhost:9000/api

## API Documentation
http://localhost:9000/swagger-ui.html

## Release
mvn -Dusername=your_scm_username release:prepare release:perform -Darguments="-Dmaven.deploy.skip=true"

## Deployment

# Build the docker image
docker build -t amauryleclerc/sprint-graph .

# Deploy the image within your container
docker run -p 9000:9000 amauryleclerc/sprint-graph

# Undeploy
docker stop <ID>

## CI
Jenkins 2 runs the build.pipeline script after each commit (delayed to 5 minutes) : if the build is successfull, the artifact is deployed to FTP (credentials needed) 

## Trouble shooting
If the file QStory.java seems missing, you should configure your IDE to include target/generated-sources to the list of source directories

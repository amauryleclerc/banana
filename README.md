# Banana

## Run

### Run in prod mode
mvn clean install

cd dist/target/banana-dist-1.0.0-SNAPSHOT-bin/bin

./run-banana.sh or ./run-banana.bat

go to http://localhost:9000/

### Run in dev mode
cd backend

mvn spring-boot:run

in another console

cd frontend/src/main/frontend

npm start

go to http://localhost:4200/

### API
http://localhost:9000/api

### API Documentation
http://localhost:9000/swagger-ui.html

### Options
ctrl+maj+f for activate fullscreen mode

## Deployment

### Release
mvn -Dusername=your_scm_username release:prepare release:perform -Darguments="-Dmaven.deploy.skip=true"

### Build the docker image
docker build -t amauryleclerc/banana .

### Deploy the image within your container
docker run -p 9000:9000 amauryleclerc/banana

### Undeploy
docker stop <ID>

## CI
Jenkins 2 runs the build.pipeline script after each commit (delayed to 5 minutes) : if the build is successfull, the artifact is deployed to FTP (credentials needed) 

## Trouble shooting
If the file QStory.java seems missing, you should configure your IDE to include target/generated-sources to the list of source directories

# Banana
[![Build Status](https://travis-ci.org/amauryleclerc/banana.svg?branch=master)](https://travis-ci.org/amauryleclerc/banana)
## Run

### Run in prod mode
mvn clean install

cd dist/target/banana-dist-1.0.0-SNAPSHOT-bin/bin

> sh ./run-banana.sh 
or 
> run-banana.bat

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

## Use Jira feature

Use the encrypt/decrypt API to create a secure token of you Jira password.

http://localhost:9000/api/encrypt/your_password_url_encoded

The API will return a token like this one:

+x57Ni6eZI3VRiPMWrF2lA==

To check that your password has been encoded properly (using url encode), you can uncrypt it with the following call:

http://localhost:9000/api/decrypt/+x57Ni6eZI3VRiPMWrF2lA==

The string returned is your password as clear text (be careful !)

Once you have produced the secure token, you need to update the config file with this token.

Finally, restart Banana, and click on Jira menu. You should see the list of your backlogs, sprint and so on.

You can import a sprint by pushing the "orange" button on the right of the row.



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

FROM openjdk:9
MAINTAINER amauryleclerc@hotmail.fr
COPY ./dist/target/banana-dist-1.0.5-SNAPSHOT-bin /usr/src/banana
WORKDIR /usr/src/banana
CMD ./bin/run-banana.sh
FROM ubuntu:latest
MAINTAINER amauryleclerc@hotmail.fr
RUN apt-get -y update
RUN apt-get -y install software-properties-common python-software-properties
RUN add-apt-repository ppa:webupd8team/java
RUN apt-get -y update
RUN echo oracle-java9-installer shared/accepted-oracle-license-v1-1 select true | debconf-set-selections && apt-get -y install oracle-java9-installer && apt-get -y install oracle-java9-set-default
RUN java -version
RUN javac -version
ADD ./dist/target/banana-dist-1.0.5-SNAPSHOT-bin /opt/
WORKDIR /opt
EXPOSE 9000
VOLUME /opt
CMD ./bin/run-banana.sh
FROM debian:jessie

ADD target/sprint-graph-0.0.1-SNAPSHOT.jar /opt/

WORKDIR /opt

EXPOSE 9000

VOLUME /opt

CMD java -jar sprint-graph-0.0.1-SNAPSHOT.jar > sprint-graph.log

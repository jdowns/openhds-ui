FROM java:8
MAINTAINER munk <munk@protonmail.com>
ADD . /service
CMD mkdir /service/resources
COPY target/server.jar /service/server.jar
COPY resources/config.edn /service/resources/config.edn
WORKDIR /service
CMD ["java", "-jar", "server.jar"]

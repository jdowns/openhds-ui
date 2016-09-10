FROM java:8
MAINTAINER munk <munk@protonmail.com>
ADD . /service
COPY target/server.jar /service/server.jar
WORKDIR /service
CMD ["java", "-jar", "server.jar"]

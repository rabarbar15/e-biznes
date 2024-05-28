FROM ubuntu:22.04

ENV TZ = "Europe/Warsaw"

RUN apt-get update && \
    apt-get -y install software-properties-common tzdata curl

RUN add-apt-repository ppa:deadsnakes/ppa && \
    apt-get -y install python3.8 

RUN  apt-get -y install openjdk-8-jdk kotlin
RUN update-alternatives --set java /usr/lib/jvm/java-8-openjdk-arm64/jre/bin/java

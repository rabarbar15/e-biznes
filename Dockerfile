FROM ubuntu

ENV TZ = "Europe/Warsaw"

RUN apt-get update && \
    apt-get -y install software-properties-common tzdata curl

RUN add-apt-repository ppa:deadsnakes/ppa && \
    apt-get -y install python3.8 


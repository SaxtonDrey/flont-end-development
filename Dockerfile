FROM circleci/node:8.11
LABEL maintainer="SaxtonDrey <4phantomron@gmail.com>"

WORKDIR /tmp
RUN sudo apt-get update && sudo apt-get -y upgrade
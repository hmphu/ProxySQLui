#!/bin/bash

docker stop ProxySQLui
docker rm ProxySQLui

cp -r ../dist .

docker build -t proxysqlui .

docker run \
	--name ProxySQLui \
	-p 8080:8080 \
	-d proxysqlui

rm -fr ./dist

#!/bin/bash

docker stop ProxySQLui
docker rm ProxySQLui

cp -r ../dist .

docker build -t proxysql_ui .

docker run \
	--name ProxySQLui \
	-p 8080:8080 \
	-d proxysql_ui

rm -fr ./dist

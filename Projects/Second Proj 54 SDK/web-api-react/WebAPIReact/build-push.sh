#!/bin/bash

# ==== API ====

docker build -t web-api-react-native .
docker tag web-api-react-native:latest avalentyn/web-api-react-native:latest
docker push avalentyn/web-api-react-native:latest

echo "API DONE"
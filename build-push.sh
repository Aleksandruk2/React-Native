#!/bin/bash

# ==== API ====

cd Second Proj 54 SDK\web-api-react\WebAPIReact\WebAPIReact

docker build -t web-api-react-native .
docker tag web-api-react-nativei:latest avalentyn/web-api-react-native:latest
docker push avalentyn/web-api-react-native:latest

echo "DONE"
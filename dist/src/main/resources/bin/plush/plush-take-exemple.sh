#!/bin/sh
URL="http://localhost:9000/api/plush/minion/take/jenkins"
curl -X POST "${URL%?}"
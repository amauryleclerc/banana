#!/bin/sh
URL="http://localhost:9000/api/plush/minion/release/jenkins"
curl -X POST "${URL%?}"
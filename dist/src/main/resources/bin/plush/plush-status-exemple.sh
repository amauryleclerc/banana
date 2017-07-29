#!/bin/sh
URL="http://localhost:9000/api/plush/minion/status"
curl "${URL%?}" 

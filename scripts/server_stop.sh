#!/bin/bash

#APP_NAME = "backend"

#PID=$(pgrep -f "backend")

#if [ -z "$PID" ]; then
#  echo "Nest.js application is not running."
#else
#  echo "Stopping Nest.js application with PID: $PID"
#  kill -9 $PID

#  if [ $? -eq 0 ]; then
#    echo "Nest.js application stopped successfully."
#  else 
#    echo "Failed to stop the Nest.js application."
#  fi
#fi 

echo "Stopping Nest.js application..."
pm2 stop backend
pm2 delete backen
echo "Application stopped."
#!/bin/bash

APP_NAME = "backend"

PID=$(pgrep -f $APP_NAME)

if [ -z "$PID" ]; then
  echo "Nest.js application is not running."
else
  echo "Stopping Nest.js application with PID: $PID"
  kill -9 $PID

  if [ $? -eq 0 ]; then
    echo "Nest.js application stopped successfully."
  else 
    echo "Failed to stop the Nest.js application."
  fi
fi 
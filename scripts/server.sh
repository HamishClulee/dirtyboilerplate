#!/usr/bin/env bash
cd server
kill -9 $(lsof -t -i:5001)
yarn start
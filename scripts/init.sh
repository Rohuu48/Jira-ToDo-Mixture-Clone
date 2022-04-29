#!/bin/bash

modules="$PWD/node_modules/"
source="$PWD/webpack/modules.js"
destination="$PWD/node_modules/react-scripts/config/modules.js"

echo " === Checking if files exists  ==="

if [ -d "$modules" ] 
then
    echo "node_modules exists"
else
    echo "node_modules does not exists. Please install Node modules $modules" 
    exit 1
fi    
  
if [ -f "$source" ] 
then
    echo "source file exists"
else
    echo "source webpack module file does not exists" 
    exit 1
fi   


if [ -f "$destination" ] 
then
    echo "destination file exists"
else
    echo "destination webpack module file does not exists" 
    exit 1
fi   

echo "Overriding the webpack modules file"

cat "$source" > "$destination"
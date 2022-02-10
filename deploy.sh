#!/bin/bash

# check usage
if [ $# -ne 1 ]; then
    echo "deploy.sh: Deploy to Azure cloud"
    echo "You must specify --dev or --prod"
    exit 1
fi

# get container name
if [ $1 == '--dev' ]; then
    CONTAINER=demo-dev
elif [ $1 == '--prod' ]; then
    CONTAINER=demo
else
    echo "unrecognized deployment mode"
    exit 1
fi

# hard-coded parameters
INPUT_FNAME=index.html
OUTPUT_FNAME=online.html

# clear existing output
rm -f $OUTPUT_FNAME
touch $OUTPUT_FNAME

# read file line-by-line
cat $INPUT_FNAME | while read LINE
do
    if [[ "$LINE" == *"src=\"src"* ]]; then
        JS_FNAME=$(echo $LINE | sed 's/.*src=\"\(src.*\)\".*/\1/g')
        echo "<script type=\"text/javascript\">" >> $OUTPUT_FNAME
        echo "$(cat $JS_FNAME)" >> $OUTPUT_FNAME
        echo "</script>" >> $OUTPUT_FNAME
    else
        echo "$LINE" >> $OUTPUT_FNAME
    fi
done

# replace references to container
if [ "$CONTAINER" == "demo" ]; then
    sed -i $OUTPUT_FNAME -e 's/demo-dev/demo/g'
fi

# upload file
python -m ezazure --upload --container $CONTAINER $OUTPUT_FNAME

# clean up
rm $OUTPUT_FNAME

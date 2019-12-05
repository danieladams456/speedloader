#!/bin/bash
rm nohup*
for i in {1..5}
do
   nohup time node index.js > "nohup$i.out" &
done

echo started all processes
sleep 30

grep -o '[0-9:.]*elapsed' nohup*

docker-compose -f docker-compose.yml -p supply-store build --parallel --force-rm $1
docker-compose -f docker-compose.yml -p supply-store up -d $1
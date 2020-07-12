appName=$1
port=$2

docker stop $appName
docker build -t $appName .
docker run -it --rm --name $appName -d -p $port:$port $appName
# Connect Cloud Run to a Redis instance running on GCE

## Create a serverless VPC Access

```bash
gcloud compute networks vpc-access connectors \
  create redis-connector \ 
  --network default \
  --region europe-west1 \
  --range 10.8.0.0/28

```

## Configure firewall (Allow redis)

```bash
gcloud compute firewall-rules create allow-redis --network default --allow tcp:6379
```


## Create Compute Engine

```bash
--image=ubuntu-2004-focal-v20210415 --image-project=ubuntu-os-cloud \
--tags=allow-redis \
--zone=europe-west1-b \
--private-network-ip=10.132.0.2 \
--network default
```

## SSH and configure Redis

```bash
gcloud compute ssh redis-storm-db --zone=europe-west1-b
```

```bash
sudo apt update && sudo apt upgrade -y
```

```
sudo apt update
sudo apt install redis-server -y
sudo systemctl status redis-server
```

sudo `nano /etc/redis/redis.conf`
Locate the line that begins with bind 127.0.0.1 ::1 and comment it.

/etc/redis/redis.conf
# bind 0.0.0.0 ::1
# Deployment as a docker on a single rpi

Docker should already be installed

## Docker file

``` sh
pi@piensg015:~ $ mkdir osrm-backend
pi@piensg015:~ $ cd osrm-backend/
pi@piensg015:~/osrm-backend $ ls
pi@piensg015:~/osrm-backend $ git clone https://github.com/Nilct/Routing-as-a-Service.git
Clonage dans 'Routing-as-a-Service'...
remote: Counting objects: 42, done.
remote: Compressing objects: 100% (31/31), done.
remote: Total 42 (delta 8), reused 36 (delta 7), pack-reused 0
Dépaquetage des objets: 100% (42/42), fait.
Vérification de la connectivité... fait.
```

Build docker:
``` sh
pi@piensg015:~/osrm-backend/Routing-as-a-Service/rpidocker $ docker build -t docker-osrm-rpi .
``` 

Compiled and tested on debian (osrm v5.7.0) : 
``` sh
docker build -t osrm-backdeb .
Successfully built 41d2e9686c3a
``` 


docker build -t docker-osrm-rpi .


## TODO

Add a swap file during compilation and osrm data construction:
see : 
fallocate -l 100G /path/to/swapfile
chmod 600 /path/to/swapfile
mkswap /path/to/swapfile
swapon /path/to/swapfile

https://github.com/Project-OSRM/osrm-backend/wiki/Running-OSRM
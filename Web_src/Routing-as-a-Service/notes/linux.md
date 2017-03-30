# Notes on deployment from scratch

The target machine is : 172.31.57.114, user is : tsi, password is secret ;)
``` sh
$ ssh tsi@172.31.57.114
```

## Preparations

### Create user, add to relevant groups

``` sh
prof@ubuntu:/home$ sudo adduser tsi
prof@ubuntu:/home/tsi$ sudo usermod -aG sudo tsi
prof@ubuntu:/home/tsi$ sudo usermod -aG ssh tsi
```
### Install docker

See [docker docs](https://docs.docker.com/engine/installation/linux/ubuntu/)
then for post install :

* use [docker as a non root user](https://docs.docker.com/engine/installation/linux/linux-postinstall/)
* set [http proxy](https://docs.docker.com/engine/admin/systemd/#http-proxy)

> **ATTENTION** on ubuntu 14.04 LTS : follow instruction [here](http://stackoverflow.com/questions/26550360/docker-ubuntu-behind-proxy)

## Deploy and setup 

``` sh
tsi@ubuntu:~/demo-osrm$ git clone https://github.com/Nilct/Routing-as-a-Service.git
```
### OSRM servers 

Both server data can be generated via bash scripts. It takes a dozen of minutes !

The bash script launches the server automatically. 

``` sh
tsi@ubuntu:~/demo-osrm/Routing-as-a-Service$ bash server_noheat.sh 
tsi@ubuntu:~/demo-osrm/Routing-as-a-Service$ bash server_heatcentral.sh 
```


### Frontend


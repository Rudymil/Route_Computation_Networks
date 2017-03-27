# API Web

A des fins de tests et dev, une instance de l'API est disponible à l'adresse suivant (PC fixe Rmaziere) :
http://172.31.56.223/api/server.php

Le mode **DEBUG** est activable en ajoutant DEBUG dans l'URL, exemple : http://172.31.56.223/api/server.php?DEBUG&{...}

## GET data

Pour récupérer des données stockées en base, les différents paramètres disponibles sont les suivants :

- type=warning_zone : pour récupérer l'ensemble des warning zones
- type=anomaly_zone : pour récupérer l'ensemble des anomaly zones
- type=risk_type : la liste des types de risques,
- type=anomaly_type : la liste des types d'anomalies,

les appels sont effectués en $_GET.

## SEND data

Pour envoyer des données au backend et les stocker en base :



les appels sont effectués en $_POST.
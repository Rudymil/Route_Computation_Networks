# DataBase

## Prérequis 

Il faut préalablement créer la base de données, par exemple via psql :
```sql
CREATE DATABASE dbName;
```

et ensuite, ajouter l'extension Postgis

```sql
CREATE EXTENSION postgis;
```

Pour le reste de la chaîne de déploiement, il suffit de jouer les fichiers SQL via psql.

## Import des données en base via psql

```bash
psql -h host -d dbName -U user -f file
```

**Exemple :**
```bash
psql -h localhost -d database -U api -f ./dataInsertion.sql
```

## Fichiers 

### databaseModel.sql

Ce fichier contient les instructions permettant de créer la structure de la base, l'utilisateur, et d'affecter les droits.

### dataInsertion.sql

Ce fichier contient les données types et le contour des pays concernés.

### dataTest.sql

Ce fichier contient un jeu de données de test.
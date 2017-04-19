# DataBase

## Prerequisite 

To begin, it is necessary to create the database, for example via psql :
```sql
CREATE DATABASE dbName;
```
and after that, we have to add PostGis extension :

```sql
CREATE EXTENSION postgis;
```
Now, we just have to use the SQL files to create all tables and import data via psql.

## Structure creation using psql

For example :
```bash
psql -h host -d dbName -U user -f databaseModel.sql
```

## Data importation using psql

For example :
```bash
psql -h host -d dbName -U user -f dataInsertion.sql
```

## Files 

### databaseModel.sql

This file contains the instructions to create the database stucture, the user, and affects rigths.

### dataInsertion.sql

This file contains type data and the defaults countries.

### dataTest.sql

This file contains the data test.
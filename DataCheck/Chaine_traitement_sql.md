# Chaine de traitement

## Create_road_extremity_points.sql

Création Table avec start et end points des routes.

Résultat dans la table ** shp.road_extremity_points **.

## Table_traitement.sql

Calcul des entités :

- StartEndPoint / StartEndPoint
- StartEndPoint / Polylign
- Polylign / Polylign

Résultat dans la table ** shp.road_connexion **.

## Clean_Result.sql

Supprime les entités en doublons de la table ** shp.road_connexion **.

## Create_RoadNotConnected.sql

Import des routes en provenance de ** shp.road ** qui ne sont pas connectées (NOT IN shp.road_connexion) dans la table ** shp.road_not_connected **.

Résultat dans la table ** shp.road_not_connected **.

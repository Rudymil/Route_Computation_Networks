#OSM#

##Contrôle qualité des Routes##

###Données###

Entités considérées : Routes
Périmétrie de l'étude : [Anglola](http://download.geofabrik.de/africa/angola-latest-free.shp.zip), [Nigeria](http://download.geofabrik.de/africa/nigeria-latest-free.shp.zip)
Découpage selon les emprises [work_area_4326](https://tsi2016ensg.slack.com/files/rmaziere/F43VCHBGE/work_area_4326.tar.gz)

Voici le bilan par Pays du nombre de routes, du nombre d'entités en erreur et du taux d'erreur correspondant :

Pays|Global|Erreurs|Taux
--|--|--|--
Angola|38914|686|1.76%
Nigeria|3031|29|0.96%

On constate un taux d'erreur d'environ 1%.

Après analyse visuelle, sur pour l'Angola, ce taux s'explique par le report d'emprise de routes, de terre-pleins ou autres entités aberrantes, qui pour une majeure partie d'entre-elles sont isolées du réseau et donc ne perturberont pas le graphe, car non liées.
Il est aussi possible de les supprimer de la base de données.

Pour le Nigéria, la faible quantité d'erreur peut-être considérée comme étant des problèmes de saisie (non accrochage sur des nœuds). De plus les routes concernées sont des routes résidentielles ou des voies de service.


Voici le bilan par pays du cumul de longueur en mètre, des routes en erreur et de la longueur moyenne d'une route en erreur :

Pays|Cumul|Moyenne
--|--|--
Angola|144.087|210
Nigeria|16.574|571

Voici la répartition par type de voie, des erreurs et le ratio :

**Angola**

Catégorie|Quantité|Ratio
--|--|--
footway|373|54,37%
residential|118|17,20%
service|96|13,99%
unclassified|31|4,52%
living_street|19|2,77%
steps|13|1,90%
pedestrian|10|1,46%
path|10|1,46%
track|8|1,17%
unknown|3|0,44%
tertiary|3|0,44%
bridleway|1|0,15%
cycleway|1|0,15%

**Nigeria**

Catégorie|Quantité|Ratio
--|--|--
residential|22|75,86%
unclassified|3|10,34%
service|2|6,90%
primary|1|3,45%
path|1|3,45%
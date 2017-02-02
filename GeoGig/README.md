# GeoGig

*sources :*  
- [http://geogig.org/](http://geogig.org/)
- [https://sourceforge.net/projects/geogig/](https://sourceforge.net/projects/geogig/)
- [https://github.com/locationtech/geogig](https://github.com/locationtech/geogig)
- [http://geogig.org/docs/start/tutorial.html](http://geogig.org/docs/start/tutorial.html)
- [http://geogig.org/docs/start/installation.html](http://geogig.org/docs/start/installation.html)
- [http://geogig.org/docs/start/intro.html](http://geogig.org/docs/start/intro.html)


## In bref

Distributed Version Control System for Geospatial data

GeoGig is an open source tool that draws inspiration from Git, but adapts its core concepts to handle distributed versioning of geospatial data.
Track GeoSpatial Data Edits

Users are able to import raw geospatial data (currently from Shapefiles, PostGIS or SpatiaLite) in to a repository where every change to the data is tracked. These changes can be viewed in a history, reverted to older versions, branched in to sandboxed areas, merged back in, and pushed to remote repositories.

GeoGig is written in Java, and available under the Eclipse Distribution License (a BSD 3 Clause license).

Welcome to the GeoGig project, exploring the use of distributed management of spatial data. GeoGig draws inspiration from Git, but adapts its core concepts to handle versioning of geospatial data. Users are able to import raw geospatial data (currently from Shapefiles, PostGIS or SpatiaLite) in to a repository where every change to the data is tracked.


## How to get up and running with GeoGig


### Building from source code

Prerequisites :
- Java 8 (JDK) :
```
echo "deb http://ppa.launchpad.net/webupd8team/java/ubuntu xenial main" | sudo tee /etc/apt/sources.list.d/webupd8team-java.list
echo "deb-src http://ppa.launchpad.net/webupd8team/java/ubuntu xenial main" | sudo tee -a /etc/apt/sources.list.d/webupd8team-java.list
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys EEA14886
sudo apt-get update
sudo apt-get install oracle-java8-installer
```
- Maven : ```apt-get install maven```

Clone the GeoGig source code repository:
git clone https://github.com/locationtech/geogig.git

Move to the ```src/parent``` folder and type the following:
```
mvn clean install
```
or (speed up)

```
mvn clean install -DskipTests
```
Create PATH :
```
su
cd etc
nano profile
add at the end : PATH=$PATH:/(way since the root)/src/cli-app/target/geogig/bin
```
### Command lines

##### Configuration
```
geogig config --global user.name "Author"
geogig config --global user.email "author@example.com"
```
##### Initialization
```
geogig init
```
##### Add shapefile
```
geogig shp import snapshot1/parks.shp
```
The response will look like this:
```
Importing from shapefile snapshot1/parks.shp

Importing parks            (1/1)...
100%
snapshot1/parks.shp imported successfully.
```
The data from the shapefile is now in the working tree. This means it is not versioned yet, but it is now in a format that GeoGig can understand, so it can be aware of the data and the changes you might introduce.

Run the following command to verify that your data is actually in the working tree:
```
geogig ls -r
```
The response will look like this:
```
Root tree/
        2
        1
        3
```
##### Status
```
geogig status
```
##### Adding data
```
geogig add
```
The response will look like this:
```
Counting unstaged elements...4
Staging changes...
100%
3 features and 1 trees staged for commit
0 features and 0 trees not staged for commit
```
##### Committing
```

geogig commit -m "message"
```
The response will look like this:
```
100%
[592006f6b541557a203279be7b4a127fb9dbb2d9] first version
Committed, counting objects...3 features added, 0 changed, 0 deleted.
```
Viewing repository history by ordered in reverse chronological order (most recent first)
```
geogig log
```
##### Creating a branch
```
geogig branch nameBranch -c
```
The response will look like this:
```
Created branch refs/heads/nameBranch
```
The -c option tells GeoGig to not only create the branch, but also switch the repository to be working on that branch. Everything done now will be added to this new history line.
Note : The default branch is named master.

#####  Merging commits from a branch
```
geogig checkout master
```
The response will look like this:
```
Switched to branch 'master'
```
```
geogig merge myedits
```
The response will look like this:
```
100%
[c04d0a968696744bdc32bf865f9675a2e55bf447] added new feature
Committed, counting objects...1 features added, 0 changed, 0 deleted.
```

##### Handling merge conflicts
```
geogig merge fix
```
Response can be :
```
100%
CONFLICT: Merge conflict in parks/5
Automatic merge failed. Fix conflicts and then commit the result.
```
You can see that there is a conflict by running the status command:
```
geogig status

# On branch master
#
# Unmerged paths:
#   (use "geogig add/rm <path/to/fid>..." as appropriate to mark resolution
#
#      unmerged  parks/5
# 1 total.
```
An unmerged path represents a element with a conflict.

You can get more details about the conflict by running the conflicts command:
```
geogig conflicts --diff
```
The response will look like this (edited for brevity):
```
---parks/5---
Ours
area: 15297.503295898438 -> 164594.90384123762
the_geom: MultiPolygon -122.8559991285487,42.3325881068491 ...

Theirs
area: 15297.503295898438 -> 15246.59765625
the_geom: MultiPolygon -122.8559991285487,42.3325881068491 ...
```

The conflict has to be solved manually. You will have to merge both versions yourself, or just select one of the versions to be used.

Assume we want to use the changed feature in the fix branch. Since we are in the master branch, the fix branch is considered “theirs.” Run the following command:
```
geogig checkout -p parks/5 --theirs
```
The response will look like this:
```
Objects in the working tree were updated to the specifed version.
```
That puts the fix branch version in the working tree, overwriting what was there. Add this to remove the conflict.
```
geogig add
geogig commit
```

##### Tagging a version

```
geogig tag -m "First official version"
```

##### Exporting from a GeoGig repository

Data can be exported from a GeoGig repository into several formats, ready to be used by external applications.

```
geogig shp export parks parks.shp
```
```
Exporting parks...
100%
parks exported successfully to parks.shp
```
Past/other versions can be exported by prefixing the tree name with a commit ID and a colon:
```
geogig shp export c04d0a968696744bdc32bf865f9675a2e55bf447:parks parks.shp
```
Use “HEAD” notation to export changes relative to the current working revision. For example, HEAD~1 refers to the second-most recent commit, HEAD~2 refers to the commit prior to that, etc.
```
geogig shp export HEAD~1:parks parks.shp
```

##### Synchronizing repositories

A GeoGig repository can interact with other GeoGig repositories that are working with the same data. Other GeoGig repositories are know as remotes.

In our situation, we created a new repository from scratch using the init command. But if we wanted to start with a copy of an existing repository (referred to as the origin), use the clone command.
```
mkdir /path/to/newrepo
cd /path/to/newrepo
geogig clone /path/to/origrepo
```
The response will look like this:
```
Cloning into 'newrepo'...
100%
Done.
```
With the repository cloned, you can work here as you would normally do, and the changes will be placed on top of the changes that already exist from the original repository.

You can merge commits from the origin repository to this new repository by using the pull command. This will update the current branch with changes that have been made on that branch in the remote repository since the last time both repositories were synchronized.
```
geogig pull origin
```
To move your local changes from your repository into origin, use the push command:
```
geogig push origin
```




## QGIS GeoGig Plugin


## Example with OSM

[http://geogig.org/docs/interaction/osm.html](http://geogig.org/docs/interaction/osm.html)

## Use or not use ?

Finally, geogig is recommended for stocking geo data like the shapefile. The use is fast and efficient.
However, the installation is not obvious and Geogig needs certain requirements to be respected.
And the final question is : What server should we use for sharing geo data ?

# Use Nominatim service

```
FROM hbaltz/nominatim
MAINTAINER Hugo BALTZ <hugobaltz@gmail.com>

# Create working directory
RUN mkdir -p /app/

COPY start.sh /app/start.sh
CMD /app/start.sh
```
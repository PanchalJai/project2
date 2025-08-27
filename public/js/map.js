
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    style: 'mapbox://styles/mapbox/standard',
    config: {
        basemap: {
            theme: 'monochrome',
            lightPreset: 'day'
        }
    }, // style URL
    zoom: 7 // starting zoom
});

// console.log(listing.geometry.coordinates);

// const marker1 = new mapboxgl.Marker({color:"red"})
//     .setLngLat(listing.geometry.coordinates)                 //listing.geometry.coordinates
//     .setPopup(new mapboxgl.Popup({ offset: 25,  })
//         .setHTML(`<h4>${listing.location}</h4>`)
//         )
//     .addTo(map);

map.loadImage('./your-file-name.png', (error, image) => {
    if (error) throw error;
    // add image to the active style and make it SDF-enabled
    map.addImage('your-image-id', image, { sdf: true });
});
map.on('load', () => {
    // Load an image from an external URL.
    map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/ic_navux_main_home',
        (error, image) => {
            if (error) throw error;

            // Add the image to the map style.
            map.addImage('cat', image);

            // Add a data source containing one point feature.
            map.addSource('point', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': listing.geometry.coordinates
                            }
                        }
                    ]
                }
            });

            // Add a layer to use the image to represent the data.
            map.addLayer({
                'id': 'points',
                'type': 'symbol',
                'source': 'point', // reference the data source
                'layout': {
                    'icon-image': 'cat', // reference the image
                    'icon-size': 0.25
                }
            });
        }
    );
});


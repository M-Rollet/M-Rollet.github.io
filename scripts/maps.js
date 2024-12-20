function createMap(mapId, geoJsonUrl, popupFormatter, legendHtml, grey=false) {
    // Initialize the map in the specified container
    var map = L.map(mapId).setView([20, 0], 2);
    map.scrollWheelZoom.disable();
    map.doubleClickZoom.disable();

    // Add OpenStreetMap tiles
    if(grey){
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
        }).addTo(map);
    } else {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    }
    
    // Load GeoJSON data
    fetch(geoJsonUrl)
        .then(response => response.json())
        .then(data => {
            function onEachFeature(feature, layer) {
                if (feature.properties) {
                    var popupContent = popupFormatter(feature.properties);
                    layer.bindPopup(popupContent);
                }

                // Hover event listeners
                layer.on({
                    mouseover: function (e) {
                        var layer = e.target;
                        layer.setStyle({
                            fillOpacity: 1,
                            weight: 3
                        });
                        layer.bringToFront();
                    },
                    mouseout: function (e) {
                        geojsonLayer.resetStyle(e.target);
                    }
                });
            }

            function style(feature) {
                return {
                    fillColor: feature.properties.color,
                    weight: 1.5,
                    opacity: 1,
                    color: 'black',
                    fillOpacity: 0.7
                };
            }

            // Add the GeoJSON layer to the map
            var geojsonLayer = L.geoJSON(data, { style: style, onEachFeature: onEachFeature });
            geojsonLayer.addTo(map);
        })
        .catch(error => console.error('Error loading GeoJSON:', error));

    // Add Legend
    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function () {
        var div = L.DomUtil.create('div', 'legend');
        div.innerHTML = legendHtml;
        return div;
    };

    legend.addTo(map);
}

        // Popup formatter for Map 1
        function popupFormatter1(properties) {
            return `
                <b>${properties.name}</b><br>
                Western: ${properties.Western}<br>
                Eastern: ${properties.Eastern}<br>
                None: ${properties.None}
            `;
        }

        // Legend for Map 1
        var legendHtml1 = `
            <div style="font-weight: bold; text-align: center; margin-bottom: 3px;">
                Ratio of East. vs. West.-Oriented Films
            </div>
            <div><div class="color-box" style="background: rgb(255,0,0);"></div> Strongly East.-Orient.</div>
            <div><div class="color-box" style="background: rgb(255,100,100);"></div> Moderately East.-Orient.</div>
            <div><div class="color-box" style="background: rgb(255,150,150);"></div> Slightly Eastern-Orient.</div>
            <div><div class="color-box" style="background: rgb(255,255,255);"></div> Balanced</div>
            <div><div class="color-box" style="background: rgb(100,150,255);"></div> Slightly West.-Orient.</div>
            <div><div class="color-box" style="background: rgb(50,100,255);"></div> Moderately West.-Orient.</div>
            <div><div class="color-box" style="background: rgb(0,0,255);"></div> Strongly West.-Orient.</div>
        `;

        // Popup formatter for Map 2
        function popupFormatter2(properties) {
            return `
                <b>${properties.name}</b><br>
                Number of Films: ${properties.Total}
            `;
        }

        // Legend for Map 2
        var legendHtml2 = `
            <div style="font-weight: bold; text-align: center; margin-bottom: 3px;">
                Number of Films
            </div>
            <div><div class="color-box" style="background: rgb(255,255,255);"></div> 0</div>
            <div><div class="color-box" style="background: rgb(204,204,204);"></div> 500</div>
            <div><div class="color-box" style="background: rgb(153,153,153);"></div> 1000</div>
            <div><div class="color-box" style="background: rgb(102,102,102);"></div> 1500</div>
            <div><div class="color-box" style="background: rgb(51,51,51);"></div> 2000</div>
            <div><div class="color-box" style="background: rgb(0,0,0);"></div> > 2000</div>
        `;

        createMap('map1', '../data/map_country_side.json', popupFormatter1, legendHtml1, true);
        createMap('map2', '../data/map_films_nb.json', popupFormatter2, legendHtml2);

<template>
    <div id="mapContainer"></div>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { ref, watch, onBeforeUnmount, onMounted } from 'vue'

const emit = defineEmits()
const props = defineProps({
    markers: Array,
})

const map = ref( null );

const loadMap = () => {
    map.value = L.map("mapContainer").setView([36.05, -92.05], 5);

    L.tileLayer(
        "http://{s}.tile.osm.org/{z}/{x}/{y}.png", 
        {
            attribution:'',
        }
    ).addTo(map.value);

    //use a mix of renderers
    const customPane = map.value.createPane("customPane");
    const canvasRenderer = L.canvas({ pane: "customPane" });
    customPane.style.zIndex = 399; // put just behind the standard overlay pane which is at 400

    props.markers.forEach( location => {
        if (location.lat && location.lng) {

            const marker = L.marker(
                    [location.lat, location.lng],
                    {draggable: location.draggable}
            ).bindTooltip(
                location.title || 'Location', 
                {
                    permanent: false, 
                    direction: 'right'
                }
            )
            .addTo(map.value);
            
            if ( location.changeColor ) {
                const random_value = Math.floor(Math.random() * 360);
                marker._icon.style.webkitFilter = "hue-rotate(" + random_value + "deg)"; 
            }

            marker.on('dragend', function(event) {
                const latlng = event.target.getLatLng();
                emit('onLatLng', latlng);
            });
        }
    })

}

onMounted( () => {
    loadMap();
})

onBeforeUnmount( () => {
    if (map.value) {
        map.value.remove();
    }
})
</script>

<style>
#mapContainer {
  width: 100%;
  height: 450px;
}
</style>
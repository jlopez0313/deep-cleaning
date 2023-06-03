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

watch( 
    () => props.markers,
    newVal => {
        removeMap();
        loadMap();
    }
)


const loadMap = () => {
    map.value = L.map("mapContainer").setView([ props.markers[0]?.lat || 27.95, props.markers[0]?.lng  || -82.47], 10);

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

    const iconRetinaUrl = '/assets/images/marker-icon-2x.png';
    const iconUrl = '/assets/images/marker-icon.png';
    const shadowUrl = '/assets/images/marker-shadow.png';
    const iconDefault = L.icon({
        iconRetinaUrl,
        iconUrl,
        shadowUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
    });

    props.markers.forEach( location => {
        if (location.lat && location.lng) {

            const marker = L.marker(
                    [location.lat, location.lng],
                    {
                        draggable: location.draggable,
                        icon: iconDefault
                    }
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

const removeMap = () => {
    if (map.value) {
        map.value.remove();
    }
}

onMounted( () => {
    loadMap();
})

onBeforeUnmount( () => {
    removeMap();
})
</script>

<style>
#mapContainer {
  width: 100%;
  height: 450px;
}
</style>
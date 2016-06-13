/* globals L */
import LeafletMap from 'ember-leaflet/components/leaflet-map';


//site map is just an extended version of a normal leaflet map
export default LeafletMap.extend({
  L,
  leafletOptions: ['drawControl', 'editable']
});

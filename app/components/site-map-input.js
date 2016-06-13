/* globals L */
import Ember from 'ember';

let editableLayers = new L.FeatureGroup();
let options = {
  position: 'topright',
  draw: {
    polygon: {
      allowIntersection: false, // Restricts shapes to simple polygons
      drawError: {
        clickable: true,
        color: '#e1e100', // Color the shape will turn when intersects
        message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
      },
      shapeOptions: {
        color: '#00FF00'
      }
    },
    polyline: false,
    marker: false
  },
  edit: {
    featureGroup: editableLayers, //REQUIRED!!
    remove: true
  }
};

let drawControl = new L.Control.Draw(options);

let map = {};


export default Ember.Component.extend({
  lat: 45.519743,
  lng: -122.680522,
  zoom: 10,
  actions: {
    //init function gets called onLoad
    //can use it to get a hold of the map and set it up.
    init: function(e) {
      map = e.target;
      map.addLayer(editableLayers);
      map.addControl(drawControl);

      //can grab on to the leaflet draw events here and register whatever we want them to do.
      map.on('draw:created', function (e) {
        var type = e.layerType,
          layer = e.layer;

        if (type === 'marker') {
          // Do marker specific actions
        }

        // Do whatever else you need to. (save to db, add to map etc)
        editableLayers.addLayer(layer);
        console.log(layer.toGeoJSON()); //send geoJson to API maybe? Looks like postgis can use that and send it back.
        //could maybe even have it call this component's actions?  on draw:created -> this.createdPolygon
      });


    }
  }
});

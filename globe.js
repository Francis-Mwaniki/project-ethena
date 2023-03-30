import planetaryjs from './planetaryjs.min.js';


// Function to create a globe and configure it
function createGlobe() {
  var container = document.getElementById('rotatingGlobe');

  // Create a new Planetary.js globe with default settings
  var globe = planetaryjs.planet();

  // Load the world map as a TopoJSON file
  globe.loadPlugin(planetaryjs.plugins.earth({
    topojson: { url: 'https://unpkg.com/world-atlas@1.4.0/world/110m.json' },
    oceans:   { fill:   'rgba(50, 96, 143, .5)' },
    land:     { fill:   'rgba(204, 204, 204, .5)' },
    borders:  { stroke: '#fff' }
  }));

  // Add some rotation to the globe; 10° per second around the vertical axis
  globe.loadPlugin(planetaryjs.plugins.autorotate(10));

  // Add some custom styling to the globe and its features
  globe.loadPlugin(planetaryjs.plugins.pings());
  globe.loadPlugin(planetaryjs.plugins.zoom({
    scaleExtent: [100, 3000]
  }));

  // Set the globe's initial position and zoom level
  globe.projection.scale(250).translate([250, 250, 0]);

  // Set up a loop to update the globe's position each frame
  globe.onDraw(function() {
    globe.plugins.pings.add(Math.random() * 10 - 5, Math.random() * 10 - 5, { color: '#00ccff', ttl: 2000, angle: Math.random() * 10 });
  });

  // Add the globe to the HTML container
  globe.draw(container);
}

// Call the createGlobe function when the page has finished loading
window.onload = function() {
  createGlobe();
};

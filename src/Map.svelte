<script>
	import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
	import ArcGISMap from "@arcgis/core/Map";
	import DictionaryRenderer from "@arcgis/core/renderers/DictionaryRenderer";
	import MapView from "@arcgis/core/views/MapView";
	import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
	import esriConfig from "@arcgis/core/config";
	import Point from "@arcgis/core/geometry/Point";
	import { onMount } from "svelte";
	import { width, height } from './game.js';

	let startX = $width / 2;
	let startY = $height / 2;

	let moveSpeed = 0.2

	let mapStartX;
	let mapStartY;
	let mapEndX;
	let mapEndY;

	// Binded to in App.svelte
	export let latitude;
	export let longitude;

	// Matrix of mouse screen coordinates
	let mouse = null;
	let pointer;
	let view;
	let mouseDown = false;


	onMount(() => {
		/**
		 * Initialize application
		 */
		 const featureLayerUrl = "https://api.os.uk/maps/vector/v1/vts?key=YkfoTGHpgZueZ0ZbqzgVAphuc0yjUUeK";
		 const apiKey = "YkfoTGHpgZueZ0ZbqzgVAphuc0yjUUeK";

		esriConfig.request.interceptors.push({
		// set the `urls` property to the URL of the FeatureLayer so that this
		// interceptor only applies to requests made to the FeatureLayer URL
		urls: featureLayerUrl,
		// use the BeforeInterceptorCallback to check if the query of the
		// FeatureLayer has a maxAllowableOffset property set.
		// if so, then set the maxAllowableOffset to 0
		before: function(params) {
			if (params.requestOptions.query.maxAllowableOffset) {
				params.requestOptions.query.key = apiKey;
				params.requestOptions.query.srs = 3857;
				params.requestOptions.query.maxAllowableOffset = 0;
			}
		},
		// use the AfterInterceptorCallback to check if `ssl` is set to 'true'
		// on the response to the request, if it's set to 'false', change
		// the value to 'true' before returning the response
		after: function(response) {
			if (!response.ssl) {
			response.ssl = true;
			}
		}
		});

		var tileLayer = new VectorTileLayer({
          url: featureLayerUrl
        });

		const map = new ArcGISMap({
			layers: [ tileLayer ]
		});

        view = new MapView({
          container: "viewDiv",
          map: map,
          zoom: 13,
          center: [ -2.968, 54.425 ],
          constraints: {
            minZoom: 6,
            maxZoom: 18,
            rotationEnabled: false
            }
        });

	
		// Event Handlers
		
		// Setup Drag event listener 
		var viewDrag = view.on("drag", (value) => {
			viewDrag.remove();
			view.stopPropagation();
		})

		var viewClick = view.on("click", (value) => {
			// Can do stuff on view click event

		} )
	});
	// Need to work out some acceleration
	// Maybe import the characters location and compare coords
		function moveMap(x, y) {
			var point = view.toMap({ x: x, y: y });
			latitude = point.y;
			longitude = point.x;
			view.goTo(point);
		}

		function difference(a, b) { 
			return Math.abs(a - b); 
		}

		function handleMouseMove ({ clientX, clientY }) {
			mouse = [ clientX, clientY ];

			if(mouseDown)
			{
				if(difference(startX, clientX) > 20 || difference(startY, clientY) > 20)
					moveMap(clientX, clientY)
			}

		}

		// Creating a ScreenPoint based of clients X, Y values passed in the event and moving map
		function handleMouseMoveComplete({ clientX, clientY }) {
			mouse = [ clientX, clientY ];
			// window.alert(JSON.stringify(mouse));
			let goToX = clientX + (clientX * moveSpeed);
			let goToY = clientY + (clientY * moveSpeed);
			var point = view.toMap({ x: clientX, y: clientY });
			view.goTo(point);
		}

		
		function handleMouseDown ({ clientX, clientY }) {
			mouseDown = true;
			startX = clientX;
			startY = clientY;
			handleMouseMove({ clientX, clientY });
		}
		
		function handleMouseUp (ev) {
			mouseDown = false;
			handleMouseMoveComplete(ev);
		}

	
</script>

<style>
	main,
	#viewDiv {
		padding: 0;
		margin: 0;
		height: 100%;
		width: 100%;
		z-index: 11;
		opacity: 0.7;
		top: 0;
		left: 0;
		position: absolute;
	}
</style>

<!-- Adds action handlers for these events in svelte framework -->
<svelte:window
	on:mousedown={handleMouseDown}
	on:mouseup={handleMouseUp}
	on:mousemove={handleMouseMove} />

<!-- THis is the div where the map is rendered to -->
<main>
	<div id="viewDiv" />
</main>

<!-- The following allows this component to nest children -->
<slot></slot>

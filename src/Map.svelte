<script>
	import { createEventDispatcher } from 'svelte';
	import Statistics from './Statistics.svelte'
	import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
	import ArcGISMap from "@arcgis/core/Map";
	import DictionaryRenderer from "@arcgis/core/renderers/DictionaryRenderer";
	import MapView from "@arcgis/core/views/MapView";
	import Point from "@arcgis/core/geometry/Point";
	import { onMount } from "svelte";
	import { width, height } from './game.js';

	let startX = $width / 2;
	let startY = $height / 2;

	let mapStartX;
	let mapStartY;
	let mapEndX;
	let mapEndY;

	export let latitude;
	export let longitude;

	let mouse = null;
	let pointer;
	let view;
	let mouseDown = false;


	onMount(() => {
		/**
		 * Initialize application
		 */
		const map = new ArcGISMap({
			basemap: "gray-vector",
		});

		const view = new MapView({
			map,
			container: "viewDiv",
			extent: {
				spatialReference: {
					wkid: 102100,
				},
				xmax: -13581772,
				xmin: -13584170,
				ymax: 4436367,
				ymin: 4435053,
			},
		});

		const popupTemplate = {
			// autocasts as new PopupTemplate()
			title: "station: {Station_Name}",
			content: [
				{
					// It is also possible to set the fieldInfos outside of the content
					// directly in the popupTemplate. If no fieldInfos is specifically set
					// in the content, it defaults to whatever may be set within the popupTemplate.
					type: "fields",
					fieldInfos: [
						{
							fieldName: "Fuel_Type_Code",
							label: "Fuel type",
						},
						{
							fieldName: "EV_Network",
							label: "EV network",
						},
						{
							fieldName: "EV_Connector_Types",
							label: "EV connection types",
						},
						{
							fieldName: "Station_Name",
							label: "Station Name",
						},
					],
				},
			],
		};

		const scale = 36112;
		const layer1 = new FeatureLayer({
			url:
				"https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Alternative_Fuel_Station_March2018/FeatureServer",
			outFields: ["*"],
			popupTemplate,
			renderer: new DictionaryRenderer({
				url:
					"https://jsapi.maps.arcgis.com/sharing/rest/content/items/30cfbf36efd64ccf92136201d9e852af",
				fieldMap: {
					fuel_type: "Fuel_Type_Code",
				},
				config: {
					show_label: "false",
				},
				visualVariables: [
					{
						type: "size",
						valueExpression: "$view.scale",
						stops: [
							{ value: scale / 2, size: 20 },
							{ value: scale * 2, size: 15 },
							{ value: scale * 4, size: 10 },
							{ value: scale * 8, size: 5 },
							{ value: scale * 16, size: 2 },
							{ value: scale * 32, size: 1 },
						],
					},
				],
			}),
			minScale: 0,
			maxScale: 10000,
		});

		const layer2 = new FeatureLayer({
			url:
				"https://services1.arcgis.com/4yjifSiIG17X0gW4/arcgis/rest/services/Alternative_Fuel_Station_March2018/FeatureServer",
			outFields: ["*"],
			popupTemplate,
			renderer: new DictionaryRenderer({
				url:
					"https://jsapi.maps.arcgis.com/sharing/rest/content/items/30cfbf36efd64ccf92136201d9e852af",
				fieldMap: {
					fuel_type: "Fuel_Type_Code",
					connector_types: "EV_Connector_Types",
					network: "EV_Network",
					name: "Station_Name",
				},
				config: {
					show_label: "true",
				},
			}),
			minScale: 10000,
			maxScale: 0,
		});

		map.addMany([layer1, layer2]);

		// Event Handlers
		
		// Setup Drag event listener 
		var viewDrag = view.on("drag", (value) => {
			// window.alert(JSON.stringify(value));
			// viewDrag.remove();
			// view.stopPropagation();
		})

		var viewClick = view.on("click", (value) => {
			// window.alert(JSON.stringify(value));
			latitude = value.mapPoint.y;
			longitude = value.mapPoint.x;
			// Export values for Metric sustainability API to
			// get for that long,lat location

		} )
	});

		function handleMouseMove ({ clientX, clientY }) {
			mouse = [ clientX, clientY ];
		}

		// Creating a ScreenPoint based of clients X, Y values passed in the event
		function handleMouseMoveComplete({ clientX, clientY }) {
			mouse = [ clientX, clientY ];
		//	window.alert(JSON.stringify(view));
			// var point = view.toMap({ x: clientX, y: clientY });
			// view.goTo(point);
		}

		
		function handleMouseDown (ev) {
			handleMouseMove(ev);
			
			// let pt = new 
			// Point({
			// 	latitude: 49,
			// 	longitude: -126
			// 	});

			// 	// go to the given point
			// 	view.goTo(pt);
			mouseDown = true;
		}
		
		function handleMouseUp (ev) {
			handleMouseMoveComplete(ev);
			mouseDown = false;
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

<Statistics>
	longitude = "45.2"
	latitude = "60.1"
</Statistics>

<!-- The following allows this component to nest children -->
<slot></slot>

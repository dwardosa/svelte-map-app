<script>
	import { width, height } from './game.js';

	import Canvas from './Canvas.svelte';
	import Background from './Background.svelte';
	import DotGrid from './DotGrid.svelte';
	import Character from './Character.svelte';
	import Text from './Text.svelte';
	import FPS from './FPS.svelte';
	import Map from './Map.svelte';


	import { getLocationData, getNationalAverageData } from './data/data';

	getLocationData(-4.1427, 50.3755)
		.then(locationData => {
			console.log(locationData);
		});
	
	const nationalData = getNationalAverageData();
	console.log(nationalData);

	let longitude = '';
	let latitude = '';
</script>

<Canvas>
	<!-- The Map was being hidden by the canvas -->

	<Background color='hsla(0, 0%, 10%, 1)'>
		<!-- <DotGrid divisions={30} color='hsla(0, 0%, 100%, 0.1)' /> -->
	</Background>
	<Character size={10} />
	<Text
		text='Click and drag around the page to move the character.'
		fontSize={12}
		align='right'
		baseline='bottom'
		x={$width - 20}
		y={$height - 20} />
	<Text
		text='Longitude: {longitude}'
		fontSize={12}
		align='left'
		baseline='bottom'
		x={20}
		y={140} />
	<Text
		text='Latitude: {latitude}'
		fontSize={12}
		align='left'
		baseline='bottom'
		x={20}
		y={160} />
	<Text
		text='National Averages:'
		fontSize={12}
		align='left'
		baseline='bottom'
		x={20}
		y={200} />
	<Text
		text='All fuel domestic: {nationalData.All_fuels_Domestic}'
		fontSize={12}
		align='left'
		baseline='bottom'
		x={20}
		y={220} />
	<Text
		text='Petroleum domestic: {nationalData.Petroleum_Domestic}'
		fontSize={12}
		align='left'
		baseline='bottom'
		x={20}
		y={240} />
	<Text
		text='Petroleum domestic: {nationalData.Petroleum_Domestic}'
		fontSize={12}
		align='left'
		baseline='bottom'
		x={20}
		y={260} />
	<Text
		text='Gas domestic: {nationalData.Gas_Domestic}'
		fontSize={12}
		align='left'
		baseline='bottom'
		x={20}
		y={280} />
	<Text
		text='Electricity domestic: {nationalData.Electricity_Domestic}'
		fontSize={12}
		align='left'
		baseline='bottom'
		x={20}
		y={300} />

	<FPS />
	<Map bind:longitude bind:latitude></Map>
</Canvas>


<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
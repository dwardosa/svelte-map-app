<script>
    import Text from './Text.svelte';
    import { getLocationData, getNationalAverageData } from './data/data'    

    let longitude = 0;
    let latitude = 0;
    let text = `Longitude: ${longitude} Latitude: ${latitude}`;


</script>


<Text
    x = {0}
    y = {0}
	fontSize={64}
	baseline='top'
	bind:this={text}
/>

<!-- The following allows this component to nest children -->
<slot></slot>
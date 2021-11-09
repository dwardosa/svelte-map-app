<script>
    import { width, height } from './game.js';
	import Text from './Text.svelte';
	import GraphBar from './GraphBar.svelte';

	export let title = '';
	export let yPosition = 0;
	export let location = '';
	export let localData = 0;
	export let nationalData = 0;
</script>

<Text
    text={title}
    fontSize={12}
    align='right'
    baseline='bottom'
    x={$width - 20}
    y={yPosition} />
<GraphBar
    text='{location}: {localData.toFixed(2)} %'
    fontSize={12}
    align='right'
    baseline='bottom'
    x={$width - 20}
    y={yPosition + 20} 
    barWidth={localData}
    backgroundColor='red'/>
<GraphBar
    text='Nationally: {nationalData.toFixed(2)} %'
    fontSize={12}
    align='right'
    baseline='bottom'
    x={$width - 20}
    y={yPosition + 40}
    barWidth={nationalData}
    backgroundColor='blue' />
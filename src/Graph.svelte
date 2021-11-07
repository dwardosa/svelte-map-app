<script>
    import { width, height } from './game.js';
	import Text from './Text.svelte';

	export let title = '';
	export let yPosition = 0;
	export let localData = '';
	export let nationalData = '';
</script>

<Text
    text={title}
    fontSize={12}
    align='right'
    baseline='bottom'
    x={$width - 20}
    y={yPosition} />
<Text
    text='Locally: {localData}'
    fontSize={12}
    align='right'
    baseline='bottom'
    x={$width - 20}
    y={yPosition + 20} />
<Text
    text='Nationally: {nationalData}'
    fontSize={12}
    align='right'
    baseline='bottom'
    x={$width - 20}
    y={yPosition + 40} />
<script>
    import { onMount, afterUpdate } from 'svelte';
	import Graph from './Graph.svelte';
    import { getLocationData, getNationalAverageData } from './data/data';

	export let longitude;
	export let latitude;

    let locationData;
    let nationalData;

    const throttleRequestMs = 5000;
    let lastRequestTime = null;
    let requestTimeout;

    getLocalData();
    nationalData = getNationalAverageData();
    
	afterUpdate(() => {
        // Cancel any waiting request
        if (requestTimeout) {
            clearTimeout(requestTimeout);
        }
        // If it's been longer than the wait period get the data straight away
        const remainingWaitTime = throttleRequestMs - (new Date() - lastRequestTime);
        if (lastRequestTime === null || remainingWaitTime <= 0) {
            getLocalData();
            return;
        }
        // Otherwise wait for the remaining amount of time
        requestTimeout = setTimeout(() => {
            getLocalData();
        }, remainingWaitTime);
    })

    function getLocalData() {
        lastRequestTime = new Date();
        getLocationData(longitude, latitude)
            .then(res => {
                locationData = res;
            });
    }

</script>

<Graph
    title='Bioenergy Usage:'
    yPosition={20}
    location={locationData?.location}
    localData={locationData?.percentageBioenergy}
    nationalData={nationalData.percentageBioenergy} />
<Graph
    title='Coal Usage:'
    yPosition={90}
    location={locationData?.location}
    localData={locationData?.percentageCoal}
    nationalData={nationalData.percentageCoal} />
<Graph
    title='Electricity Usage:'
    yPosition={160}
    location={locationData?.location}
    localData={locationData?.percentageElectricity}
    nationalData={nationalData.percentageElectricity} />
<Graph
    title='Gas Usage:'
    yPosition={230}
    location={locationData?.location}
    localData={locationData?.percentageGas}
    nationalData={nationalData.percentageGas} />
<Graph
    title='Petroleum Usage:'
    yPosition={300}
    location={locationData?.location}
    localData={locationData?.percentagePetroleum}
    nationalData={nationalData.percentagePetroleum} />

<slot></slot>
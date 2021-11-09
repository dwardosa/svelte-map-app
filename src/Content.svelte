<script>
    import { getContext } from 'svelte';
    import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';      
    import Popup from './Popup.svelte';
  
    const { open } = getContext('simple-modal');
      
      let opening = false;
      let opened = false;
      let closing = false;
      let closed = false;
  
    const showPopup = () => {
          open(Popup, { message: "It's a popup!" });
      };

    onMount(async () => {
	});
      

  </script>

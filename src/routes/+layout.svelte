<script lang="ts">
	import type { LayoutData } from './$types';
	import TopAppBar from '@smui/top-app-bar';
	export let data: LayoutData;
</script>

<div>
	<TopAppBar variant="static">
		<h1>Welcome to the Data and Training Center Geocoder</h1>
	</TopAppBar>

	<slot />
	<!-- <footer>
		<p>Copyright 2023</p>
	</footer> -->
</div>

<!-- <style>
	footer {
		display: flex;
		justify-content: center;
		position: absolute;
		bottom: 0;	
		background-color: gray;
		color: white;
		height: 20px;
		width: 100%;
		padding: 20px;
	}
	
</style> -->

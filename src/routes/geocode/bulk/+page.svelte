<script lang="ts">
	import type { PageData } from '../bulk/$types';
	// import { data } from FormData;
	import List, { Item, PrimaryText, SecondaryText, Separator, Text } from '@smui/list';
	import TextField from '@smui/textfield';
	import Button from '@smui/button';
	import LinearProgress from '@smui/linear-progress';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	// export let data: PageData;

	let focused = false;
	// let value: string | null = null;
	let files: FileList;
	// let dataFile = null;
	// let address: { [index: string]: string } = {};
	let geo_res = doPost;
	let file_uploaded: boolean = false;

	$: if (files) {
		console.log(files);

		for (const file of files) {
			console.log(`file: ${file.name} is ${file.size} bytes.`);
		}
	}

	async function doPost() {
		const dataArray = new FormData();
		// dataArray.append('data_file', files[0].name);
		dataArray.append('data_file', files[0]);
		console.log(dataArray);
		file_uploaded = true;
		const res = await fetch('http://127.0.0.1:8000/geocode/file', {
			method: 'POST',
			body: dataArray
		});
		if (res.ok) {
			geo_res = await res.json();
			// return await res.json();
		} else {
			// Sometimes the API will fail!
			throw new Error('Request failed');
		}
		// console.log(geo_shape);
	}

	// const showFile = (event) => {
	// 	console.log(event.target.files[0]);
	// 	console.log(files);
	// }
</script>

<div style={'margin-top:20px'}>
	<form>
		<input class="file-input" bind:files type="file" />
		<button type="submit" on:click={doPost}>Geocode File</button>
		<!-- <Button variant="raised" on:click={doPost}>Geocode</Button> -->
	</form>
	<!-- <form method="POST" action="http://127.0.0.1:8000/geocode/address" enctype="application/json">
		<input type="text" name="street" />
		<input type="text" name="city" />
		<input type="text" name="postal_code" />
		<input type="text" name="state" />
		<button type="submit">Geowhat?</button>
	</form> -->

	<!-- <pre class="status">Focused: {focused}, Value: {street}</pre> -->
</div>
<div>
	{#if !file_uploaded}
		<p>Waiting for file upload...</p>
	{:else}
		<p>Geocoding...</p>
		<LinearProgress indeterminate />
		{#await geo_res then geo}
			<p>{JSON.stringify(geo)}</p>
		{/await}
	{/if}
</div>

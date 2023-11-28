<script lang="ts">
	import type { PageData } from '../bulk/$types';
	// import { geocodeFile } from '$lib/utils';
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
	let is_loading: boolean = false;
	let geo_res: JSON | Error;
	let blobURL: string | null = null;
	let geoFileName: string | null = 'geocoded_file.csv';
	let errorMsg = null;
	// let dataFile = null;
	// let address: { [index: string]: string } = {};
	let file_uploaded: boolean = false;
	let res_received: boolean = false;

	$: if (files) {
		console.log(files);

		for (const file of files) {
			console.log(`file: ${file.name} is ${file.size} bytes.`);
		}
	}

	async function geocodeFile(files: FileList) {
		try {
			if (files) {
				const dataArray = new FormData();
				dataArray.append('data_file', files[0]);
				await fetch('http://127.0.0.1:8000/geocode/file', {
					method: 'POST',
					body: dataArray
				})
					.then((res) => {
						geoFileName = res.headers.get('content-name');
						return res.blob();
					})
					.then((blob) => {
						blobURL = URL.createObjectURL(blob);
					})
					.catch((error) => {
						console.log('hit a snag');
						errorMsg = error;
						throw new Error('Request failed.', error);
					});
			} else {
				throw new Error('No files selected');
			}
		} catch (error) {
			console.error('Error:', error);
			return null;
		}
	}

	async function handleFormSubmit(event: Event) {
		event.preventDefault();
		file_uploaded = true;
		is_loading = true;
		await geocodeFile(files);
		is_loading = false;
		res_received = true;
		// return geo_res;
	}
</script>

<div style={'margin-top:20px'}>
	<form on:submit|preventDefault={handleFormSubmit}>
		<input class="file-input" bind:files type="file" />
		<!-- <button type="submit">Geocode File</button> -->
		<Button variant="raised" type="submit">Geocode File</Button>
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
<div style="margin-top: 20px;">
	{#if !file_uploaded}
		<p>Waiting for file upload...</p>
	{:else if file_uploaded && is_loading}
		<p>Geocoding...</p>
		<LinearProgress indeterminate />
	{:else if blobURL && !errorMsg}
		<!-- <p>{JSON.stringify(geo_res)}</p> -->
		<a href={blobURL} download={geoFileName}>Download Geocoded File</a>
	{:else if errorMsg}
		<p>{errorMsg}</p>
		<!-- 
		{#await geo_res}
			<p>Geocoding...</p>
			<LinearProgress indeterminate />
		{:then geo}
			<p>In then block...</p>
			<p>{JSON.stringify(geo)}</p>
		{/await} -->
	{/if}
</div>

<script lang="ts">
	import type { PageData } from './$types';
	// import { data } from FormData;
	import TextField from '@smui/textfield';
	export let data: PageData;

	let focused = false;
	let value: string | null = null;
</script>

<div>
	<form action="POST">
		<TextField
			type="email"
			updateInvalid
			label="To"
			bind:value
			style="min-width: 250px;"
			input$autocomplete="email"
			on:focus={() => (focused = true)}
			on:blur={() => (focused = false)}
		></TextField>
	</form>
	<pre class="status">Focused: {focused}, Value: {value}</pre>
</div>

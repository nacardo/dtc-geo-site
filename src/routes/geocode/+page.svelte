<script lang="ts">
	import type { PageData } from './$types';
	// import { data } from FormData;
	import List, { Item, PrimaryText, SecondaryText, Separator, Text } from '@smui/list';
	import TextField from '@smui/textfield';
	import Button from '@smui/button';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	// export let data: PageData;

	let focused = false;
	// let value: string | null = null;
	let street: string | null = '5478 pernod ave';
	let city: string | null = 'saint louis';
	let postal_code: string | null = '63139';
	let state: string | null = 'mo';
	let address: { [index: string]: string } = {};

	const handleSubmit = () => {
		let res = fetch('http://127.0.0.1:8000/geocode/address', {
			method: 'POST',
			body: JSON.stringify({ street, city, postal_code, state }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	};

	async function doPost() {
		const res = await fetch('http://127.0.0.1:8000/geocode/fromform', {
			method: 'POST',
			body: JSON.stringify({
				street,
				city,
				postal_code,
				state
			})
		});

		const geo_res = await res.json();
		address = geo_res;
		console.log(address);
	}
</script>

<div>
	<form>
		<TextField
			type="text"
			bind:value={street}
			label="Street"
			style="min-width: 250px;"
			input$autocomplete="text"
			on:focus={() => (focused = true)}
			on:blur={() => (focused = false)}
		></TextField>
		<TextField
			type="text"
			updateInvalid
			label="City"
			bind:value={city}
			style="min-width: 250px;"
			input$autocomplete="text"
			on:focus={() => (focused = true)}
			on:blur={() => (focused = false)}
		></TextField>
		<TextField
			type="text"
			updateInvalid
			label="Postal Code"
			bind:value={postal_code}
			style="min-width: 250px;"
			input$autocomplete="text"
			on:focus={() => (focused = true)}
			on:blur={() => (focused = false)}
		></TextField>
		<TextField
			type="text"
			updateInvalid
			label="State"
			bind:value={state}
			style="min-width: 250px;"
			input$autocomplete="text"
			on:focus={() => (focused = true)}
			on:blur={() => (focused = false)}
		></TextField>
		<Button variant="raised" on:click={doPost}>Geocode</Button>
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
	{#if Object.keys(address).length != 0}
		<h3>Geo result for {street}</h3>
		<LayoutGrid>
			<!-- {#each Array(2) as _unused, _i} -->
			<Cell span={6} class="demo-cell">
				<List class="demo-list">
					{#each Object.entries(address) as [add_key, value]}
						{#if add_key != 'address'}
							<Item>
								<Text>
									<PrimaryText>{add_key}</PrimaryText>
									<SecondaryText>{value}</SecondaryText>
								</Text>
							</Item>
							<!-- <p>{add_key}: {value}</p> -->
						{/if}
					{/each}
				</List>
			</Cell>
			<Cell span={6} class="demo-cell">
				<List class="demo-list">
					{#each Object.entries(address['address']) as [add_add_key, add_value]}
						<Item>
							<Text>
								<PrimaryText>{add_add_key}</PrimaryText>
								<SecondaryText>{add_value}</SecondaryText>
							</Text>
						</Item>
						<!-- <p>{add_add_key}: {add_value}</p> -->
					{/each}
				</List>
			</Cell>
			<!-- {/each} -->
		</LayoutGrid>
	{/if}
</div>

<style>
	.demo-cell {
		display: flex;
		justify-content: right;
		align-items: center;
		background-color: var(--mdc-theme-secondary, #333);
		border: #fff;
		color: var(--mdc-theme-on-secondary, #fff);
	}
</style>

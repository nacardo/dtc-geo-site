<script lang="ts">
	import type { LayoutData } from './$types';
	import TopAppBar, { Row, Section, Title as TABtitle } from '@smui/top-app-bar';
	import Drawer, { AppContent, Content, Header, Title, Subtitle, Scrim } from '@smui/drawer';
	import Button, { Label } from '@smui/button';
	import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list';
	import IconButton from '@smui/icon-button';

	let open = false;
	let active = 'IPH Data and Training Center';
	// let tabTitle = active ? active : 'IPH Data and Training Center'

	function setActive(value: string) {
		active = value;
		open = false;
	}

	let clicked = 'nothing yet';
	export let data: LayoutData;
</script>

<div class="drawer-container">
	<!-- Don't include fixed={false} if this is a page wide drawer.
		  It adds a style for absolute positioning. -->
	<Drawer variant="modal" fixed={false} bind:open>
		<Header>
			<Title>DTC Tools</Title>
			<Subtitle>Feel free to check them out!</Subtitle>
		</Header>
		<Content>
			<List>
				<Item
					href="/geocode/bulk"
					on:click={() => setActive('Bulk Geocoder')}
					activated={active === 'Bulk Geocoder'}
				>
					<Graphic class="material-icons" aria-hidden="true">my_location</Graphic>
					<Text>Bulk Geocoder</Text>
				</Item>
				<Item
					href="/geocode/single"
					on:click={() => setActive('Single Address Geocoder')}
					activated={active === 'Single Address Geocoder'}
				>
					<Graphic class="material-icons" aria-hidden="true">location_on</Graphic>
					<Text>Single Address Geocoder</Text>
				</Item>
				<Item
					href="/addresses/clean"
					on:click={() => setActive('Address Cleaner')}
					activated={active === 'Address Cleaner'}
				>
					<Graphic class="material-icons" aria-hidden="true">cleaning_services</Graphic>
					<Text>Address Cleaner</Text>
				</Item>

				<Separator />
				<Subheader tag="h6">Our Projects</Subheader>
				<Item
					href="javascript:void(0)"
					on:click={() => setActive('STI Platform')}
					activated={active === 'STI Platform'}
				>
					<Graphic class="material-icons" aria-hidden="true">chevron_right</Graphic>
					<Text>STI Platform</Text>
				</Item>
				<Item
					href="javascript:void(0)"
					on:click={() => setActive('LOV')}
					activated={active === 'LOV'}
				>
					<Graphic class="material-icons" aria-hidden="true">chevron_right</Graphic>
					<Text>LOV</Text>
				</Item>
				<Item
					href="javascript:void(0)"
					on:click={() => setActive('HVIP')}
					activated={active === 'HVIP'}
				>
					<Graphic class="material-icons" aria-hidden="true">chevron_right</Graphic>
					<Text>HVIP</Text>
				</Item>
			</List>
		</Content>
	</Drawer>

	<!-- Don't include fixed={false} if this is a page wide drawer.
		  It adds a style for absolute positioning. -->
	<Scrim fixed={false} />
	<AppContent class="app-content">
		<main class="main-content">
			<!-- <Button on:click={() => (open = !open)}>
				<Label>Toggle Drawer</Label>
			</Button> -->
			<div>
				<TopAppBar variant="static" dense>
					<Row>
						<Section>
							<IconButton class="material-icons" on:click={() => (open = !open)}>menu</IconButton>
							<TABtitle>{active}</TABtitle>
						</Section>
						<Section align="end" toolbar>
							<IconButton href="/" class="material-icons">home</IconButton>
							<IconButton class="material-icons">file_download</IconButton>
						</Section>
					</Row>
				</TopAppBar>

				<slot />
				<!-- <footer>
				<p>Copyright 2023</p>
				</footer> -->
			</div>
			<!-- <div style="height: 90vh;">&nbsp;</div> -->
		</main>
	</AppContent>
</div>

<style>
	/* These classes are only needed because the
	  drawer is in a container on the page. */
	.drawer-container {
		position: relative;
		display: flex;
		height: 350vh;
		/* max-width: 600px; */
		border: 1px solid var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
		overflow: hidden;
		z-index: 0;
	}

	* :global(.app-content) {
		flex: auto;
		overflow: auto;
		position: relative;
		flex-grow: 1;
	}

	.main-content {
		overflow: auto;
		padding: 16px;
		height: 100%;
		box-sizing: border-box;
	}
</style>

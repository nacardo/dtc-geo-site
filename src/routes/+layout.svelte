<script lang="ts">
	import type { LayoutData } from './$types';
	import TopAppBar, { Row, Section, Title as TABtitle } from '@smui/top-app-bar';
	import Drawer, { AppContent, Content, Header, Title, Subtitle, Scrim } from '@smui/drawer';
	import Button, { Label } from '@smui/button';
	import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list';
	import IconButton from '@smui/icon-button';

	let open = false;
	let active = 'Inbox';

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
			<Title>Super Mail</Title>
			<Subtitle>It's the best fake mail app drawer.</Subtitle>
		</Header>
		<Content>
			<List>
				<Item
					href="javascript:void(0)"
					on:click={() => setActive('Inbox')}
					activated={active === 'Inbox'}
				>
					<!-- <Graphic class="material-icons" aria-hidden="true">inbox</Graphic> -->
					<Text>Inbox</Text>
				</Item>
				<Item>
					<Graphic class="material-icons" aria-hidden="true">pets</Graphic>
					<Text>Star</Text>
				</Item>
				<Item
					href="javascript:void(0)"
					on:click={() => setActive('Sent Mail')}
					activated={active === 'Sent Mail'}
				>
					<Graphic class="material-icons" aria-hidden="true">send</Graphic>
					<Text>Sent Mail</Text>
				</Item>
				<Item
					href="javascript:void(0)"
					on:click={() => setActive('Drafts')}
					activated={active === 'Drafts'}
				>
					<Graphic class="material-icons" aria-hidden="true">drafts</Graphic>
					<Text>Drafts</Text>
				</Item>

				<Separator />
				<Subheader tag="h6">Labels</Subheader>
				<Item
					href="javascript:void(0)"
					on:click={() => setActive('Family')}
					activated={active === 'Family'}
				>
					<Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
					<Text>Family</Text>
				</Item>
				<Item
					href="javascript:void(0)"
					on:click={() => setActive('Friends')}
					activated={active === 'Friends'}
				>
					<Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
					<Text>Friends</Text>
				</Item>
				<Item
					href="javascript:void(0)"
					on:click={() => setActive('Work')}
					activated={active === 'Work'}
				>
					<Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
					<Text>Work</Text>
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
							<TABtitle>DTC Geocoder</TABtitle>
						</Section>
						<Section align="end" toolbar>
							<IconButton class="material-icons">file_download</IconButton>
						</Section>
					</Row>
				</TopAppBar>

				<slot />
				<!-- <footer>
			<p>Copyright 2023</p>
		</footer> -->
			</div>
			<br />
			<pre class="status">Active: {active}</pre>
			<div style="height: 90vh;">&nbsp;</div>
			And some stuff at the bottom.
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

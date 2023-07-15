<script>
	import '../app.postcss';
	import Header from './Header.svelte';
	import './styles.css';
	import { AppShell } from '@skeletonlabs/skeleton';
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-rocket.css';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';
							
</script>

<div class="app">
	<AppShell>
		<svelte:fragment slot="header">
			<Header />
		</svelte:fragment>

		<svelte:fragment slot="sidebarLeft">
			<ul>
				<li>点数計算</li>
				<li>オーラス条件確認</li>
			</ul>
		</svelte:fragment>

		<slot />
	
		<svelte:fragment slot="pageFooter">
			<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
		</svelte:fragment>
	</AppShell>

</div>

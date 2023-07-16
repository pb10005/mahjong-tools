<script lang="ts">
	import { fly } from 'svelte/transition';
	import { getScore, agariMap } from '$lib/score';
	import { SlideToggle } from '@skeletonlabs/skeleton';

	let isRoundUp = true;
	let isKazoeAvailable = true;

	let fu = 20;
	let yaku = 1;
	let isOya = true;
	let isTsumo = true;
	let isYakuman = false;
	let selectedBase = '';

	// 画面表示
	let switcher = true;
	let flyInOption = {
		duration: 300,
		x: 50,
		y: 0
	};
	let flyOutOption = {
		duration: 300,
		x: -50,
		y: 0
	};

	$: score =
		getScore(isOya, isTsumo, fu, yaku, isYakuman, {
			roundUpMangan: isRoundUp,
			kazoeAvailable: isKazoeAvailable
		}) || 'その点数はありません';

	$: agari = agariMap[selectedBase] || '';

	$: isFuFixed = ['pt', 'pr', 'ctt', 'ctr'].includes(selectedBase);

	function onSelectBase(base: string) {
		switch (base) {
			case 'pt':
				fu = 20;
				yaku = 2;
				isTsumo = true;
				break;
			case 'pr':
				fu = 30;
				yaku = 1;
				isTsumo = false;
				break;
			case 'ctt':
				fu = 25;
				yaku = 3;
				isTsumo = true;
				break;
			case 'ctr':
				fu = 25;
				yaku = 2;
				isTsumo = false;
				break;
			case 'ot':
				fu = 30;
				yaku = 1;
				isTsumo = true;
				break;
			case 'omr':
				fu = 40;
				yaku = 1;
				isTsumo = false;
				break;
			case 'onr':
				fu = 30;
				yaku = 1;
				isTsumo = false;
				break;
			case 'ymt':
				fu = 20;
				yaku = 13;
				isTsumo = true;
				isYakuman = true;
				break;
			case 'ymr':
				fu = 20;
				yaku = 13;
				isTsumo = false;
				isYakuman = true;
				break;
			default:
				fu = -1;
				yaku = -1;
				isTsumo = true;
				break;
		}
		selectedBase = base;
	}
	const clearInput = () => {
		fu = 20;
		yaku = 1;
		isOya = true;
		isTsumo = true;
		isYakuman = false;
		selectedBase = '';
	};
</script>

<div class="grid md:grid-cols-12 w-full">
	<div class="md:col-span-8 md:col-start-3">
		<h2 class="h2">点数計算</h2>
		<div>
			<h3 class="h3">ルール</h3>
			<SlideToggle name="roundUp" type="checkbox" size="sm" bind:checked={isRoundUp}
				>切り上げ満貫</SlideToggle
			>
			<SlideToggle name="roundUp" type="checkbox" size="sm" bind:checked={isKazoeAvailable}
				>数え役満あり</SlideToggle
			>
		</div>
		<h3 class="h3">役を入力</h3>
		<div>
			<SlideToggle name="oya" type="checkbox" size="sm" bind:checked={isOya}>親</SlideToggle>
		</div>
		{#if !selectedBase}
			<div class="btn-group-vertical variant-soft-primary w-full">
				<button on:click={() => onSelectBase('pt')}>ピンフツモ</button>
				<button on:click={() => onSelectBase('pr')}>ピンフロン</button>
				<button on:click={() => onSelectBase('ctt')}>七対子ツモ</button>
				<button on:click={() => onSelectBase('ctr')}>七対子ロン</button>
				<button on:click={() => onSelectBase('ot')}>その他ツモ</button>
				<button on:click={() => onSelectBase('omr')}>その他ロン(門前)</button>
				<button on:click={() => onSelectBase('onr')}>その他ロン(鳴き)</button>
				<button on:click={() => onSelectBase('ymt')}>役満ツモ</button>
				<button on:click={() => onSelectBase('ymr')}>役満ロン</button>
			</div>
		{/if}
		{#if selectedBase}
			<div>{agari}</div>
			<div class="grid gap-1">
				<div>
					<button
						class="btn variant-ghost-secondary w-full"
						on:click={() => {
							flyInOption.x = 0;
							flyInOption.y = -50;
							flyOutOption.x = 0;
							flyOutOption.y = 50;
							switcher = false;
							setTimeout(() => {
								yaku += 1;
								switcher = true;
							}, 300);
						}}
						aria-label="Increase the counter by one"
					>
						飜+
					</button>
				</div>

				<div class="flex">
					{#if !isFuFixed}
						<button
							class="btn variant-ghost-secondary"
							on:click={() => {
								flyInOption.x = -50;
								flyInOption.y = 0;
								flyOutOption.x = 50;
								flyOutOption.y = 0;
								switcher = false;
								setTimeout(() => {
									fu = Math.max(20, fu - 10);
									switcher = true;
								}, 300);
							}}
							aria-label="Decrease the counter by one"
						>
							符-
						</button>
					{/if}
					{#if switcher}
						<div class="text-2xl font-extrabold center" in:fly={flyInOption} out:fly={flyOutOption}>
							<strong>{fu}符{yaku}飜</strong>
							<strong>{score}</strong>
						</div>
					{/if}
					{#if !isFuFixed}
						<button
							class="btn variant-ghost-secondary"
							on:click={() => {
								flyInOption.x = 50;
								flyInOption.y = 0;
								flyOutOption.x = -50;
								flyOutOption.y = 0;
								switcher = false;
								setTimeout(() => {
									fu = Math.min(110, fu + 10);
									switcher = true;
								}, 300);
							}}
							aria-label="Increase the counter by one"
						>
							符+
						</button>
					{/if}
				</div>

				<div>
					<button
						class="btn variant-ghost-secondary w-full"
						on:click={() => {
							flyInOption.x = 0;
							flyInOption.y = 50;
							flyOutOption.x = 0;
							flyOutOption.y = -50;
							switcher = false;
							setTimeout(() => {
								yaku = Math.max(1, yaku - 1);
								switcher = true;
							}, 300);
						}}
						aria-label="Decrease the counter by one"
					>
						飜-
					</button>
				</div>

				<div>
					<button class="btn variant-ghost-tertiary" on:click={clearInput}>クリア</button>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.center {
		margin: auto;
	}
</style>

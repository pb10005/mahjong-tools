<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { calculateCurrentTop, calculateTsumoCondition, calculateRonCondition } from '$lib/condition';

	let isHanchan = true;
	let continuePoint = 30000;

	let homba = 0;
	let sharedPoint = 0;
	let points: { [key: string]: number } = {
		east: 25000,
		south: 25000,
		west: 25000,
		north: 25000
	};

	const nameMap: { [key: string]: string } = {
		east: '東家',
		south: '南家',
		west: '西家',
		north: '北家'
	};



	$: sharedPoint = 100000 - points.east - points.south - points.west - points.north;
	$: currentTop = nameMap[calculateCurrentTop(points, continuePoint).name];

	$: eastCondition = calculateTsumoCondition(true, 'east', points, continuePoint, sharedPoint, homba);
	$: southCondition = calculateTsumoCondition(false, 'south', points, continuePoint, sharedPoint, homba);
	$: westCondition = calculateTsumoCondition(false, 'west', points, continuePoint, sharedPoint, homba);
	$: northCondition = calculateTsumoCondition(false, 'north', points, continuePoint, sharedPoint, homba);

	$: eastRonCondition = calculateRonCondition(true, 'east', points, continuePoint, sharedPoint, homba);
	$: southRonCondition = calculateRonCondition(false, 'south', points, continuePoint, sharedPoint, homba);
	$: westRonCondition = calculateRonCondition(false, 'west', points, continuePoint, sharedPoint, homba);
	$: northRonCondition = calculateRonCondition(false, 'north', points, continuePoint, sharedPoint, homba);
</script>

<div class="grid md:grid-cols-12 w-full">
	<div class="md:col-start-3 md:col-span-8 space-y-2">
		<h2 class="h2">オーラス条件確認</h2>
		<div class="card p-4 text-token space-y-4">
			<div>
				<p>ルール</p>
				<SlideToggle name="isHanchan" size="sm" bind:checked={isHanchan}>半荘戦</SlideToggle>
				<label class="label">
					<span>{`${isHanchan ? '西' : '南'}入点数`}</span>
					<input
						class="input"
						type="number"
						placeholder={`${isHanchan ? '西' : '南'}入点数`}
						bind:value={continuePoint}
					/>
				</label>
			</div>
			<label class="label">
				<span>本場</span>
				<input class="input" type="number" placeholder="本場" min="0" bind:value={homba} />
			</label>
			<label class="label">
				<span>供託</span>
				<input class="input" type="number" placeholder="供託" bind:value={sharedPoint} disabled />
			</label>
			<label class="label">
				<span>東家</span>
				<input class="input" type="number" placeholder="東家" bind:value={points.east} />
			</label>
			<label class="label">
				<span>南家</span>
				<input class="input" type="number" placeholder="南家" bind:value={points.south} />
			</label>
			<label class="label">
				<span>西家</span>
				<input class="input" type="number" placeholder="西家" bind:value={points.west} />
			</label>
			<label class="label">
				<span>北家</span>
				<input class="input" type="number" placeholder="北家" bind:value={points.north} />
			</label>
			<p>現在のトップ: {currentTop}</p>
		</div>
		<div class="card p-4">
			<h3 class="h3">ツモ条件</h3>
			<p>
				東家のトップ条件:
				{eastCondition}
			</p>
			<p>
				南家のトップ条件:
				{southCondition}
			</p>
			<p>
				西家のトップ条件:
				{westCondition}
			</p>
			<p>
				北家のトップ条件:
				{northCondition}
			</p>
		</div>
		<div class="card p-4">
			<h3 class="h3">トップ直撃条件</h3>
			<p>
				東家のトップ条件:
				{eastRonCondition}
			</p>
			<p>
				南家のトップ条件:
				{southRonCondition}
			</p>
			<p>
				西家のトップ条件:
				{westRonCondition}
			</p>
			<p>
				北家のトップ条件:
				{northRonCondition}
			</p>
		</div>
	</div>
</div>

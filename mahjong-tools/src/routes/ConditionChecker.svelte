<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	let isHanchan = true;
	let continuePoint = 30000;

	let homba = 0;
	let sharedPoints = 0;
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

	const calculateCurrentTop = (points: { [key: string]: number }) => {
		let tmpTop = 'east';
		for (const key in points) {
			if (points[tmpTop] < points[key]) {
				tmpTop = key;
			}
		}
		return tmpTop;
	};

	const calculateTsumoCondition = (isOya: boolean, selfName: string) => {
		if (isOya) {
			if (simulateTsumo(isOya, points, selfName, homba, 0, 500) === selfName)
				return 'アガリ(500オール)';
			if (simulateTsumo(isOya, points, selfName, homba, 0, 700) === selfName)
				return 'ピンフツモ(700オール)';
			if (simulateTsumo(isOya, points, selfName, homba, 0, 1000) === selfName)
				return '2飜(1000オール)';
			if (simulateTsumo(isOya, points, selfName, homba, 0, 2000) === selfName)
				return '3飜(2000オール)';
			if (simulateTsumo(isOya, points, selfName, homba, 0, 4000) === selfName)
				return '満貫(4000オール)';
			if (simulateTsumo(isOya, points, selfName, homba, 0, 6000) === selfName)
				return '跳満(6000オール)';
			if (simulateTsumo(isOya, points, selfName, homba, 0, 8000) === selfName)
				return '倍満(8000オール)';
			if (simulateTsumo(isOya, points, selfName, homba, 0, 12000) === selfName)
				return '三倍満(12000オール)';
			if (simulateTsumo(isOya, points, selfName, homba, 0, 16000) === selfName)
				return '役満(16000オール)';

			return '目無し';
		} else {
			if (simulateTsumo(isOya, points, selfName, homba, 500, 300) === selfName)
				return 'アガリ(300-500)';
			if (simulateTsumo(isOya, points, selfName, homba, 1000, 500) === selfName)
				return '2飜(500-1000)';
			if (simulateTsumo(isOya, points, selfName, homba, 2000, 1000) === selfName)
				return '3飜(1000-2000)';
			if (simulateTsumo(isOya, points, selfName, homba, 4000, 2000) === selfName)
				return '満貫(2000-4000)';
			if (simulateTsumo(isOya, points, selfName, homba, 6000, 3000) === selfName)
				return '跳満(3000-6000)';
			if (simulateTsumo(isOya, points, selfName, homba, 8000, 4000) === selfName)
				return '倍満(4000-8000)';
			if (simulateTsumo(isOya, points, selfName, homba, 12000, 6000) === selfName)
				return '三倍満(6000-12000)';
			if (simulateTsumo(isOya, points, selfName, homba, 16000, 8000) === selfName)
				return '役満(8000-16000)';
			return '目無し';
		}
	};

	const simulateTsumo = (
		isOya: boolean,
		points: { [key: string]: number },
		selfName: string,
		homba: number,
		oyaPoint: number,
		koPoint: number
	) => {
		let tmpPoints = Object.assign({}, points);

		if (isOya) {
			for (const key in tmpPoints) {
				if (key === selfName)
					tmpPoints[key] = points[key] + 3 * koPoint + 100 * homba + sharedPoints;
				else tmpPoints[key] = points[key] - koPoint - 100 * homba;
			}
		} else {
			for (const key in tmpPoints) {
				if (key === selfName)
					tmpPoints[key] = points[key] + oyaPoint + 2 * koPoint + 100 * homba + sharedPoints;
				else if (key === 'east') tmpPoints[key] = points[key] - oyaPoint - 100 * homba;
				else tmpPoints[key] = points[key] - koPoint - 100 * homba;
			}
		}
		return calculateCurrentTop(tmpPoints);
	};

	const calculateRonCondition = (isOya: boolean) => {
		/*
			'アガリ(1500)',
			'2飜(2900)',
			'3飜(5800)',
			'満貫(12000)',
			'跳満(18000)',
			'倍満(24000)',
			'三倍満(36000)',
			'役満(48000)'
		*/
	};

	$: sharedPoints = 100000 - points.east - points.south - points.west - points.north;
	$: currentTop = nameMap[calculateCurrentTop(points)];
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
				<input class="input" type="number" placeholder="本場" bind:value={homba} />
			</label>
			<label class="label">
				<span>供託</span>
				<input class="input" type="number" placeholder="供託" bind:value={sharedPoints} disabled />
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
			<p>東家のトップ条件</p>
			<button
				class="btn variant-ghost-primary"
				on:click={() => {
					alert(JSON.stringify(calculateTsumoCondition(true, 'east')));
				}}>計算</button
			>
			<p>南家のトップ条件</p>
			<button
				class="btn variant-ghost-primary"
				on:click={() => {
					alert(JSON.stringify(calculateTsumoCondition(false, 'south')));
				}}>計算</button
			>
			<p>西家のトップ条件</p>
			<button
				class="btn variant-ghost-primary"
				on:click={() => {
					alert(JSON.stringify(calculateTsumoCondition(false, 'west')));
				}}
			>
				計算
			</button>
			<p>北家のトップ条件</p>
			<button
				class="btn variant-ghost-primary"
				on:click={() => {
					alert(JSON.stringify(calculateTsumoCondition(false, 'north')));
				}}
			>
				計算
			</button>
		</div>
	</div>
</div>

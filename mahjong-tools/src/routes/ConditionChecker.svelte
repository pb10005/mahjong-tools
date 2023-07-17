<script lang="ts">
    import { SlideToggle } from "@skeletonlabs/skeleton";
    let isHanchan = true;
    let continuePoint = 30000;

    let honba = 0;
    let sharedPoints = 0;
    let points = {
        east: 25000,
        south: 25000,
        west: 25000,
        north: 25000
    };

    const calculateTsumoCondition = (isOya: boolean) => {
        return ["アガリ(500オール)", "ピンフツモ(700オール)", "2飜(1000オール)", "3飜(2000オール)", "満貫(4000オール)"];
    };

    const calculateRonCondition = (isOya: boolean) => {
        return ["アガリ(1500)", "2飜(2900)", "3飜(5800)", "満貫(12000)", "跳満(18000)", "倍満(24000)", "三倍満(36000)", "役満(48000)"]
    };

    $: sharedPoints = 100000 - points.east - points.south - points.west - points.north
</script>

<div class="grid md:grid-cols-12 w-full">
	<div class="md:col-start-3 md:col-span-8 space-y-2">
		<h2 class="h2">オーラス条件確認</h2>
		<div class="card p-4 text-token space-y-4">
            <div>
                <p>ルール</p>
                <SlideToggle name="isHanchan" size="sm" bind:checked={isHanchan}>半荘戦</SlideToggle>
                <label class="label">
                    <span>{`${isHanchan ? '西': '南'}入点数`}</span>
                    <input class="input" type="number" placeholder={`${isHanchan ? '西': '南'}入点数`} bind:value={continuePoint}/>
                </label>
            </div>
            <label class="label">
                <span>本場</span>
                <input class="input" type="number" placeholder="本場" bind:value={honba} />
            </label>
            <label class="label">
                <span>供託</span>
                <input class="input" type="number" placeholder="供託" bind:value={sharedPoints} />
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
        </div>
        <div class="card p-4">
            <p>東家のトップ条件</p>
            <p>南家のトップ条件</p>
            <p>西家のトップ条件</p>
            <p>北家のトップ条件</p>
        </div>
	</div>
</div>

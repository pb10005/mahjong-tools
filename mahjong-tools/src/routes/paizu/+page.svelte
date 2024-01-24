<script lang="ts">
    import { PaizuBuilder } from "$lib/image";
	const hand = [
		'1m',
		'1m',
		'1m',
		'2m',
	];
    let handString = '19m19p19s12345677z';
    $: paizu = new PaizuBuilder(handString).build();
</script>

<div>
    <div class="flex justify-center items-center gap-0 overflow-x-scroll w-full">
        {#each paizu as pai}
            <img src={pai} alt="pai" />
        {/each}
    </div>
    <label class="label">
        <span>手牌をmpsz表記で入力</span>
        <input class="input" type="text" placeholder="手牌" bind:value={handString} />
    </label>
</div>

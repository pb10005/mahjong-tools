<script lang="ts">
	import { PaizuBuilder } from '$lib/image';

	let handString = '19m19p19s12345677z';
	$: paizu = new PaizuBuilder(handString).build();

	let hands: string[] = [];
	$: savedPaizus = hands.map((h) => new PaizuBuilder(h).build());

	const handleClick = () => {
		hands = [...hands, handString];
	};
</script>

<div class="flex flex-col items-center gap-2 py-2">
	<label class="label">
		<span>手牌をmpsz表記で入力</span>
		<input class="input" type="text" placeholder="手牌" bind:value={handString} />
        <div class="flex justify-center items-center gap-0 overflow-x-auto w-full">
            {#each paizu as pai}
                <img src={pai} alt="pai" width={24} />
            {/each}
        </div>
	</label>

	<button class="btn variant-ghost-primary" on:click={handleClick}> 保存 </button>
	<ul class="flex flex-col items-center gap-2">
		{#each savedPaizus as savedPaizu, index}
			<li class="flex gap-2">
                {index}
				<div class="flex overflow-x-scroll">
					{#each savedPaizu as pai}
						<img src={pai} alt="pai" width="24" />
					{/each}
                </div>
			</li>
		{/each}
	</ul>
</div>

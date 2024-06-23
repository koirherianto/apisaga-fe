<script lang="ts">
	import { createLabel, melt } from '@melt-ui/svelte';

	const {
		elements: { root }
	} = createLabel();
</script>

<form>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
	<div class="md:col-6">
			<div class="flex flex-col items-start justify-center">
				<label
					use:melt={$root}
					for="markdown"
					class="mb-0.5 font-medium text-magnum-900"
					data-melt-part="root"
				>
					<span>Markdown</span>
				</label>
				<textarea
					id="email"
					name="markdown"
					class="h-10 w-[240px] rounded-md bg-white px-3 py-2 text-magnum-700"
					placeholder="some markdown here"
				></textarea>
			</div>
    </div>
    <div class="md:col-6">
      <div class="flex flex-col items-start justify-center">
				<label
					use:melt={$root}
					for="Html"
					class="mb-0.5 font-medium text-magnum-900"
					data-melt-part="root"
				>
					<span>Html</span>
				</label>
				<textarea
					id="email"
					name="Html"
					class="h-10 w-[240px] rounded-md bg-white px-3 py-2 text-magnum-700"
					placeholder="some Html here"
				></textarea>
			</div>
    </div>
  </div>
</form>

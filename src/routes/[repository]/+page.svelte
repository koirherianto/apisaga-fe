<script lang="ts">
  import { createLabel, melt } from '@melt-ui/svelte';
  const { elements: { root } } = createLabel();

  import { writable } from 'svelte/store';
  type TextContent = string;
  let markdown = writable<TextContent>('');
  let htmlContent = writable<string>('');

  $: markdown.subscribe((value) => {
    console.log('Markdown value:', value); // Debugging log
    add(value);

    async function add(mk: string) {
      try {
        const response = await fetch('/api/markdown/tohtml', {
          method: 'POST',
          body: JSON.stringify({ markdown: mk }), // Make sure the key is 'markdown'
          headers: {
            'content-type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const hasil = await response.json();
        console.log('Response from server:', hasil); // Debugging log
        if (hasil.success) {
          htmlContent.set(hasil.html); // Ensure 'html' key is used
        } else {
          console.error('Server did not return success');
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
  });
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
          id="markdown"
          name="markdown"
          class="h-10 w-[240px] rounded-md bg-white px-3 py-2 text-magnum-700"
          placeholder="some markdown here"
          bind:value={$markdown}
        />
      </div>
    </div>
    <div class="md:col-6">
      <div class="flex flex-col items-start justify-center">
        <label
          use:melt={$root}
          for="html"
          class="mb-0.5 font-medium text-magnum-900"
          data-melt-part="root"
        >
          <span>HTML</span>
        </label>
        <textarea
          id="html"
          name="html"
          class="h-10 w-[240px] rounded-md bg-white px-3 py-2 text-magnum-700"
          placeholder="some HTML here"
          bind:value={$htmlContent}
        ></textarea>
      </div>
    </div>
  </div>
</form>

<style>
  textarea {
    height: 200px;
    width: 100%;
  }
</style>
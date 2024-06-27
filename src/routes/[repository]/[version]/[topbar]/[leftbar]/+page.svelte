<!-- route/[repository]/[version]/[topbar]/[leftbar] -->
<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import Popover from '../../../left/pop.svelte';
	import Tabs from '../../../tabs.svelte';
</script>

<div class="flex justify-center w-full min-h-screen p-0 bg-gray-200">
	<div class="w-64 flex flex-col overflow-y-scroll bg-gray-900 rounded-md">
		<div class="px-6 pt-8">
			<div class="flex items-center justify-between">
				<a
					href="/{data.param.repository}"
					class="bg-blue-600 p-1.5 rounded flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
				>
					{data.param.repository}
				</a>
				<button
					class="flex items-center justify-center p-0.5 rounded bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500"
				>
					<svg class="w-3 h-3 text-gray-300 stroke-current" fill="none" viewBox="0 0 24 24">
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10.25 6.75L4.75 12L10.25 17.25"
						></path>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19.25 12H5"
						></path>
					</svg>
				</button>
			</div>
		</div>
		<!-- search -->
		<div class="px-6 pt-4">
			<div class="relative">
				<div class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
					<svg class="w-4 h-4 text-gray-500 stroke-current" fill="none" viewBox="0 0 24 24">
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"
						></path>
					</svg>
				</div>
				<input
					type="text"
					class="w-full rounded pl-8 pr-4 py-2.5 text-xs font-light bg-gray-800 text-gray-400 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800"
					placeholder="search"
				/>
			</div>
		</div>
		<div class="px-6 pt-4">
			<Popover />
		</div>
		<!-- Garis Pemisah -->
		<div class="px-6 pt-4">
			<hr class="border-gray-700" />
		</div>
		<!-- Menu Sidebar -->
		<div class="px-6 pt-4 flex-grow">
			<ul class="flex flex-col space-y-2">
				<!-- dashboard menu-->
				{#each data.leftbars as leftbar}
					<li class="relative text-gray-500 hover:text-white focus-within:text-white">
						<div class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
							<svg class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5"
									d="M4.75 6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H17.25C18.3546 4.75 19.25 5.64543 19.25 6.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V6.75Z"
								></path>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5"
									d="M9.75 8.75V19"
								></path>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5"
									d="M5 8.25H19"
								></path>
							</svg>
						</div>
						<a
							href="/"
							class="inline-block w-full py-2 pl-8 pr-4 text-xs rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800"
							>{leftbar.name}</a
						>
					</li>
				{/each}
			</ul>
		</div>

		<div class="px-6 pt-8">
			<hr class="border-gray-700" />
		</div>
		<div class="pl-6 pr-4 py-4 bg-[/232529] flex items-center justify-between mt-auto">
			<div class="flex items-center">
				<div
					class="relative w-8 h-8 rounded-full before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:right-0 before:bottom-0 before:ring-1 before:ring-white"
				>
					<img
						class="rounded-full"
						src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
						alt=""
					/>
				</div>
				<div class="flex flex-col pl-3">
					<div class="text-sm text-gray-50">Jane Doeson</div>
					<span class="text-xs text-[/acacb0] font-light tracking-tight">
						janedoeson@gmail.com
					</span>
				</div>
			</div>
			<button
				class="text-gray-400 bg-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white"
			>
				<svg class="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24">
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						d="M15.25 10.75L12 14.25L8.75 10.75"
					></path>
				</svg>
			</button>
		</div>
	</div>
	<main class="flex-grow bg-white">
		<Tabs />
	</main>
</div>

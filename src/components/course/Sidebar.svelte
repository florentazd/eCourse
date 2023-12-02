<script>
  import config from "../../config.json";
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import Icon from "@iconify/svelte";
  import { scrollToModules } from "../../lib/scroll.js";
  import {
    isSidebarVisible,
    isSearchVisible,
    isLoading,
  } from "../../lib/store.js";
  import { pb, modules, currentUser } from "../../lib/pocketbase.js";

  const { links } = config;
  export let isModulesVisible = true;

  function logout() {
    pb.authStore.clear();
  }
</script>

{#if $isSidebarVisible}
  <aside
    transition:slide={{
      duration: 300,
      easing: quintOut,
      axis: "x",
    }}
    class="flex h-full w-80 flex-none flex-col justify-between border-r-[1.5px] border-r-white/5 bg-white/5 p-5 lg:w-full lg:border-none"
  >
    <div class="space-y-5">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <img
            src={`https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${$currentUser.id}`}
            alt={`${$currentUser.username} avatar`}
            class="h-8 w-8 rounded-full"
          />
          <div>
            <h3>{$currentUser.username}</h3>
            <h4 class="text-white/50">{$currentUser.email}</h4>
          </div>
        </div>
        <button
          on:click={() => ($isSidebarVisible = !$isSidebarVisible)}
          class="group hidden rounded-full bg-transparent p-2 transition hover:bg-white/10 lg:block"
        >
          <Icon
            class="text-lg text-white/50 transition group-hover:text-white"
            icon="ph:arrow-line-left"
          />
        </button>
      </div>
      <button
        on:click={() => ($isSearchVisible = !$isSearchVisible)}
        class="flex w-full items-center gap-2 rounded-md bg-none p-2 text-white/50 outline outline-[1.5px] outline-white/10 transition hover:bg-white/10"
      >
        <Icon class="text-base" icon="ph:magnifying-glass" />
        Search
      </button>
      {#if isModulesVisible}
        <div class="lg:hidden">
          <h3
            class="mb-2 flex items-center gap-2 text-xs tracking-[2px] text-white/50"
          >
            <Icon class="text-base" icon="ph:stack" />
            MODULES
          </h3>
          {#if $isLoading}
            <div class="w-full space-y-4 px-2 py-4">
              <div
                class="w-1/2 animate-pulse rounded-full bg-white/10 p-1"
              ></div>
              <div
                class="w-1/3 animate-pulse rounded-full bg-white/10 p-1"
              ></div>
              <div
                class="w-1/2 animate-pulse rounded-full bg-white/10 p-1"
              ></div>
              <div
              class="w-1/3 animate-pulse rounded-full bg-white/10 p-1"
            ></div>
            </div>
          {:else}
            {#each $modules as module (module.id)}
              <div>
                <button
                  aria-hidden="true"
                  on:click={() => scrollToModules(module.title)}
                  class="w-full rounded-md bg-transparent p-2 text-start text-white/50 transition hover:bg-white/10 hover:text-white"
                >
                  {module.title}
                </button>
              </div>
            {/each}
          {/if}
        </div>
      {/if}
      <div class="space-y-2">
        <h3
          class="flex items-center gap-2 text-xs tracking-[2px] text-white/50"
        >
          <Icon class="text-base" icon="ph:link" />
          LINKS
        </h3>
        <div class="flex flex-col text-white/50">
          {#each links as link}
            <a
              class="p-2 text-white/50 transition hover:text-white"
              href={link.url}
              target="_blank">{link.name}</a
            >
          {/each}
        </div>
      </div>
    </div>

    <button
      on:click={logout}
      class="flex w-full items-center justify-center gap-2 rounded-md bg-transparent py-2 text-red-400 outline outline-[1.5px] outline-red-400/20 transition hover:bg-red-400/20"
    >
      <Icon class="text-base" icon="ph:sign-out" />
      Logout</button
    >
  </aside>
{/if}

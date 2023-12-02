<script>
  import { onMount, onDestroy } from "svelte";
  import { modules, lessons } from "../../lib/pocketbase.js";
  import { fly } from "svelte/transition";
  import Icon from "@iconify/svelte";
  import { isSearchVisible, isSidebarVisible } from "../../lib/store.js";
  import { navigate } from "svelte-routing";
  import { toSlug } from "../../lib/strConverter.js";

  let searchTerm = "";

  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
  });

  onDestroy(() => {
    window.removeEventListener("keydown", handleKeydown);
  });

  const handleKeydown = (event) => {
    if (event.key === "Escape") {
      $isSearchVisible = false;
    }
  };

  $: filteredLessons = $lessons.filter((lesson) => {
    return lesson.title.toLowerCase().includes(searchTerm.toLowerCase());
  });
</script>

{#if $isSearchVisible}
  <div
    aria-hidden="true"
    on:click={() => ($isSearchVisible = false)}
    on:keydown={handleKeydown}
    class="fixed inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-sm"
  >
    <div
      aria-hidden="true"
      on:click|stopPropagation
      transition:fly={{ duration: 300, y: 50 }}
      class="hide-scrollbar relative mx-5 h-[400px] w-[500px] overflow-y-scroll rounded-md bg-dark outline outline-[1.5px] outline-white/10"
    >
      <div
        class="sticky inset-x-0 top-0 flex w-full items-center justify-between gap-2 border-b-[1.5px] border-b-white/10 bg-dark py-2 pl-3 pr-2"
      >
        <Icon class="text-xl text-white/50" icon="ph:magnifying-glass" />
        <input
          bind:value={searchTerm}
          class="flex-1 bg-transparent py-2 placeholder:text-white/50 focus:outline-none"
          type="text"
          placeholder="Find a lesson..."
        />
        <button
          on:click={() => ($isSearchVisible = false)}
          class="group rounded-full bg-transparent p-2 text-xl transition hover:bg-white/10"
        >
          <Icon
            class="rotate-45 text-white/50 transition group-hover:text-white"
            icon="ph:plus"
          />
        </button>
      </div>
      <div class="w-full p-3">
        <p class="my-1 text-white/50">
          {#if filteredLessons.length === 0}
            No lessons found.
          {:else}
            Showing <span class="text-main">{filteredLessons.length}</span>
            {filteredLessons.length === 1 ? "lesson" : "lessons"}
          {/if}
        </p>
        {#each $modules as module (module.id)}
          {#each filteredLessons as lesson (lesson.id)}
            {#if module.id === lesson.module}
              <button
                on:click={() => {
                  navigate(`/course/${toSlug(lesson.title)}`);
                  $isSearchVisible = false;
                  if (window.innerWidth <= 1024) {
                    $isSidebarVisible = false;
                  }
                }}
                class="flex w-full items-center justify-between rounded-md bg-transparent p-3 transition hover:bg-white/5"
              >
                <div>
                  <h3 class="text-start">{lesson.title}</h3>
                  <h4 class="text-start text-white/50">{module.title}</h4>
                </div>
                <h3 class="text-main">View</h3>
              </button>
            {/if}
          {/each}
        {/each}
      </div>
    </div>
  </div>
{/if}

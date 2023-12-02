<script>
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import config from "../../config.json";
  import Icon from "@iconify/svelte";
  import { modules, lessons } from "../../lib/pocketbase.js";
  import { isLoading } from "../../lib/store.js";

  const { curriculum } = config;
  let isOpen = {};

  function lessonsLength(moduleId) {
    return $lessons.filter((lesson) => lesson.module === moduleId).length;
  }
</script>

<section id="Curriculum" class="mt-5 w-full space-y-5 p-5">
  <div class="space-y-3 text-center">
    <h1 class="text-2xl leading-none">{curriculum.headline}</h1>
    <p class="mx-auto w-[600px] leading-relaxed text-white/50 sm:w-full">
      {curriculum.subheading}
    </p>
  </div>

  <div class="mx-auto w-[700px] space-y-4 md:w-full">
    {#if $isLoading}
      <div class="w-full rounded-md bg-white/5 p-5">
        <div class="w-1/2 space-y-3">
          <div class="animate-pulse rounded-full bg-white/10 p-1"></div>
          <div class="w-1/2 animate-pulse rounded-full bg-white/10 p-1"></div>
        </div>
      </div>
      <div class="w-full rounded-md bg-white/5 p-5">
        <div class="w-1/2 space-y-3">
          <div class="animate-pulse rounded-full bg-white/10 p-1"></div>
          <div class="w-1/2 animate-pulse rounded-full bg-white/10 p-1"></div>
        </div>
      </div>
      <div class="w-full rounded-md bg-white/5 p-5">
        <div class="w-1/2 space-y-3">
          <div class="animate-pulse rounded-full bg-white/10 p-1"></div>
          <div class="w-1/2 animate-pulse rounded-full bg-white/10 p-1"></div>
        </div>
      </div>
    {:else}
      {#each $modules as module, i (module.id)}
        <div
          aria-hidden="true"
          on:click={() => (isOpen[module.id] = !isOpen[module.id])}
          class="group w-full cursor-pointer space-y-5 rounded-md bg-white/5 p-5 transition hover:bg-white/10"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-5">
              <h3 class="rounded-md bg-main p-1 text-xs tracking-[2px]">
                MODULE {i + 1}
              </h3>

              <div>
                <h2 class="text-base">{module.title}</h2>
                <h3 class="text-white/50">
                  {lessonsLength(module.id)} lessons
                </h3>
              </div>
            </div>
            <button>
              <Icon
                class={isOpen[module.id]
                  ? "rotate-180 text-lg text-white/50 transition group-hover:text-white"
                  : "text-lg text-white/50 transition group-hover:text-white"}
                icon="ph:caret-down"
              />
            </button>
          </div>
          {#each $lessons as lesson (lesson.id)}
            {#if module.id === lesson.module}
              {#if isOpen[module.id]}
                <div
                  transition:slide={{
                    duration: 300,
                    easing: quintOut,
                  }}
                  class="flex items-center gap-2"
                >
                  <Icon class="text-2xl text-main" icon="ph:play-circle-fill" />
                  <h3 class="line-clamp-1 text-base">{lesson.title}</h3>
                </div>
              {/if}
            {/if}
          {/each}
        </div>
      {/each}
    {/if}
  </div>
</section>

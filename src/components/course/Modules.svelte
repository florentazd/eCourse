<script>
  import { lessons, modules } from "../../lib/pocketbase.js";
  import Icon from "@iconify/svelte";
  import {
    isSidebarVisible,
    isLessonComplete,
    isLoading,
  } from "../../lib/store.js";
  import { navigate } from "svelte-routing";
  import { toSlug } from "../../lib/strConverter.js";
</script>

<section class="flex-1 space-y-5 overflow-y-scroll bg-dark p-5">
  <div class="flex w-full items-center justify-between">
    <h1 class="flex items-center gap-2 text-xl">
      <button
        on:click={() => ($isSidebarVisible = !$isSidebarVisible)}
        class="group rounded-full bg-transparent p-2 transition hover:bg-white/10"
      >
        <Icon
          class="text-white/50 transition group-hover:text-white"
          icon="ph:list"
        />
      </button>
      Modules
    </h1>
    {#if $isLoading}
      <div class="w-16 animate-pulse rounded-full bg-white/10 p-1"></div>
    {:else}
      <h2 class="text-white/50">
        {$lessons.length}
        {$lessons.length === 1 ? "Lesson" : "Lessons"}
      </h2>
    {/if}
  </div>

  {#if $isLoading}
    <div class="w-full rounded-md outline outline-[1.5px] outline-white/10">
      <div class="w-full space-y-3 bg-white/5 p-5">
        <div class="w-1/3 animate-pulse rounded-full bg-white/10 p-1"></div>
        <div class="w-1/2 animate-pulse rounded-full bg-white/10 p-1"></div>
      </div>
      <div
        class="flex w-full items-center gap-3 border-t-[1.5px] border-t-white/10 p-5"
      >
        <Icon class="text-4xl text-main" icon="ph:play-circle-fill" />
        <div class="w-1/4 animate-pulse rounded-full bg-white/10 p-1"></div>
      </div>
      <div
        class="flex w-full items-center gap-3 border-t-[1.5px] border-t-white/10 p-5"
      >
        <Icon class="text-4xl text-main" icon="ph:play-circle-fill" />
        <div class="w-1/3 animate-pulse rounded-full bg-white/10 p-1"></div>
      </div>
      <div
        class="flex w-full items-center gap-3 border-t-[1.5px] border-t-white/10 p-5"
      >
        <Icon class="text-4xl text-main" icon="ph:play-circle-fill" />
        <div class="w-1/4 animate-pulse rounded-full bg-white/10 p-1"></div>
      </div>
    </div>
    <div class="w-full rounded-md outline outline-[1.5px] outline-white/10">
      <div class="w-full space-y-3 bg-white/5 p-5">
        <div class="w-1/3 animate-pulse rounded-full bg-white/10 p-1"></div>
        <div class="w-1/2 animate-pulse rounded-full bg-white/10 p-1"></div>
      </div>
      <div
        class="flex w-full items-center gap-3 border-t-[1.5px] border-t-white/10 p-5"
      >
        <Icon class="text-4xl text-main" icon="ph:play-circle-fill" />
        <div class="w-1/4 animate-pulse rounded-full bg-white/10 p-1"></div>
      </div>
      <div
        class="flex w-full items-center gap-3 border-t-[1.5px] border-t-white/10 p-5"
      >
        <Icon class="text-4xl text-main" icon="ph:play-circle-fill" />
        <div class="w-1/3 animate-pulse rounded-full bg-white/10 p-1"></div>
      </div>
      <div
        class="flex w-full items-center gap-3 border-t-[1.5px] border-t-white/10 p-5"
      >
        <Icon class="text-4xl text-main" icon="ph:play-circle-fill" />
        <div class="w-1/4 animate-pulse rounded-full bg-white/10 p-1"></div>
      </div>
    </div>
    <div class="w-full rounded-md outline outline-[1.5px] outline-white/10">
      <div class="w-full space-y-3 bg-white/5 p-5">
        <div class="w-1/3 animate-pulse rounded-full bg-white/10 p-1"></div>
        <div class="w-1/2 animate-pulse rounded-full bg-white/10 p-1"></div>
      </div>
      <div
        class="flex w-full items-center gap-3 border-t-[1.5px] border-t-white/10 p-5"
      >
        <Icon class="text-4xl text-main" icon="ph:play-circle-fill" />
        <div class="w-1/4 animate-pulse rounded-full bg-white/10 p-1"></div>
      </div>
      <div
        class="flex w-full items-center gap-3 border-t-[1.5px] border-t-white/10 p-5"
      >
        <Icon class="text-4xl text-main" icon="ph:play-circle-fill" />
        <div class="w-1/3 animate-pulse rounded-full bg-white/10 p-1"></div>
      </div>
      <div
        class="flex w-full items-center gap-3 border-t-[1.5px] border-t-white/10 p-5"
      >
        <Icon class="text-4xl text-main" icon="ph:play-circle-fill" />
        <div class="w-1/4 animate-pulse rounded-full bg-white/10 p-1"></div>
      </div>
    </div>
  {:else}
    {#each $modules as module (module.id)}
      <div
        id={module.title}
        class="w-full rounded-md outline outline-[1.5px] outline-white/10"
      >
        <div class="w-full space-y-1 bg-white/5 p-5">
          <h1 class="text-base">{module.title}</h1>
          <h3 class="text-white/50">
            {module.description}
          </h3>
        </div>
        {#each $lessons as lesson (lesson.id)}
          {#if module.id === lesson.module}
            <div
              class="flex w-full items-center justify-between gap-5 border-t-[1.5px] border-t-white/10 p-5"
            >
              <div class="flex items-center gap-3">
                <Icon class="text-4xl text-main" icon="ph:play-circle-fill" />
                <h3 class="line-clamp-1 text-base">{lesson.title}</h3>
              </div>
              {#if $isLessonComplete[lesson.id]}
                <button
                  on:click={() => navigate(`/course/${toSlug(lesson.title)}`)}
                  class="flex items-center justify-center rounded-md bg-green-400/10 px-4 py-2 outline outline-[1.5px] outline-green-400/20 transition hover:bg-green-400/20"
                >
                  <Icon class="text-base text-green-400" icon="ph:check" />
                </button>
              {:else}
                <button
                  on:click={() => navigate(`/course/${toSlug(lesson.title)}`)}
                  class="rounded-md bg-white/10 px-4 py-2 outline outline-[1.5px] outline-white/20 transition hover:bg-white/20"
                  >Start</button
                >
              {/if}
            </div>
          {/if}
        {/each}
      </div>
    {/each}
  {/if}
</section>

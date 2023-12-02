<script>
  import { afterUpdate } from "svelte";
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { lessons, currentUser } from "../lib/pocketbase.js";
  import {
    toStr,
    toSlug,
    cleanFileName,
    formatDuration,
  } from "../lib/strConverter.js";
  import { navigate } from "svelte-routing";
  import Sidebar from "../components/course/Sidebar.svelte";
  import {
    isSidebarVisible,
    isLessonComplete,
    isAuthVisible,
    isLogin,
    isLoading,
  } from "../lib/store.js";
  import Plyr from "plyr";
  import Icon from "@iconify/svelte";
  import Search from "../components/course/Search.svelte";
  import Home from "./Home.svelte";

  export let lessonTitle;

  let videoDuration = 0;
  let lessonVideo;

  afterUpdate(() => {
    lessonVideo = new Plyr("#lessonVideo", {
      invertTime: false,
      toggleInvert: false,
    });
  });
</script>

{#if $currentUser}
  <Search />
  <main class="flex h-screen justify-between lg:overflow-x-hidden">
    <Sidebar isModulesVisible={false} />
    {#if $isLoading}
      <div class="flex w-full flex-col gap-5 p-5">
        <div class="w-1/3 animate-pulse rounded-full bg-white/10 p-1"></div>
        <div
          class="flex flex-1 animate-pulse items-center justify-center rounded-md bg-white/10"
        >
          <Icon class="text-6xl text-white/20" icon="ph:play-circle-fill" />
        </div>
      </div>
    {:else}
      {#each $lessons as lesson (lesson.id)}
        {#if toSlug(lesson.title) === toSlug(lessonTitle)}
          <section class="flex-1 space-y-5 overflow-y-scroll bg-dark p-5">
            <button
              on:click={() => navigate("/course")}
              class="flex items-center gap-2 text-white/50 transition hover:text-white"
            >
              <Icon icon="ph:arrow-left" />
              Modules</button
            >
            <div
              class="flex items-center justify-between sm:flex-col sm:items-start sm:gap-2"
            >
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
                <h4
                  class="w-fit rounded-md bg-white/5 px-2 py-1 text-sm text-white/50"
                >
                  {formatDuration(videoDuration)}
                </h4>
                {toStr(lessonTitle)}
              </h1>
              <button
                on:click={() => {
                  navigate("/course");
                  $isLessonComplete = {
                    ...$isLessonComplete,
                    [lesson.id]: !$isLessonComplete[lesson.id],
                  };
                }}
                class={$isLessonComplete[lesson.id]
                  ? "rounded-md bg-white/10 px-4 py-2 outline outline-[1.5px] outline-white/20 transition hover:bg-white/20 sm:w-full sm:px-0"
                  : "rounded-md bg-main px-4 py-2 transition hover:bg-main/80 sm:w-full sm:px-0"}
              >
                {$isLessonComplete[lesson.id]
                  ? "Reset status"
                  : "Complete lesson"}
              </button>
            </div>

            <video
              on:loadedmetadata={(event) => {
                if (event.target instanceof HTMLVideoElement) {
                  videoDuration = event.target.duration;
                }
              }}
              id="lessonVideo"
              data-poster={`${import.meta.env.VITE_PB_URL}/api/files/lessons/${
                lesson.id
              }/${lesson.thumbnail}`}
            >
              <source
                src={`${import.meta.env.VITE_PB_URL}/api/files/lessons/${
                  lesson.id
                }/${lesson.video}`}
              />
              <track
                kind="captions"
                label="English captions"
                src={`${import.meta.env.VITE_PB_URL}/api/files/lessons/${
                  lesson.id
                }/${lesson.captions}`}
                srclang="en"
                default
              />
            </video>

            <div class="space-y-2">
              <h3 class="flex items-center gap-2 text-base">
                <Icon icon="ph:text-align-left" />
                Summary
              </h3>
              <p class="text-white/50">
                {lesson.summary}
              </p>
            </div>

            <div
              class="flex w-full items-start justify-between gap-5 lg:flex-col"
            >
              <div class="flex-1 space-y-4 lg:w-full">
                <h2 class="flex items-center gap-2 text-base">
                  <Icon icon="ph:chats" />
                  FAQs
                </h2>
                {#each lesson.faqs as faq}
                  <button
                    on:click={() => (faq.isOpen = !faq.isOpen)}
                    class="w-full space-y-2 rounded-md bg-white/10 p-2 outline outline-[1.5px] outline-white/20 transition hover:bg-white/20"
                  >
                    <div class="flex items-center justify-between text-start">
                      <h3>{faq.question}</h3>
                      <Icon
                        class={faq.isOpen
                          ? "rotate-45 transition"
                          : "transition"}
                        icon="ph:plus"
                      />
                    </div>
                    {#if faq.isOpen}
                      <p
                        transition:slide={{
                          duration: 300,
                          easing: quintOut,
                        }}
                        class="text-start text-white/60"
                      >
                        {faq.answer}
                      </p>
                    {/if}
                  </button>
                {/each}
              </div>

              <div class="flex-[0.5] space-y-4 lg:w-full">
                <h2 class="flex items-center gap-2 text-base">
                  <Icon icon="ph:link" />
                  Resources
                </h2>
                {#each lesson.resources as resource}
                  <a
                    href={resource.link}
                    target="_blank"
                    class="block w-full rounded-md bg-white/10 p-2 outline outline-[1.5px] outline-white/20 transition hover:bg-white/20"
                  >
                    <div class="flex items-center justify-between">
                      <h3>{resource.name}</h3>
                      <Icon icon="ph:arrow-up-right" />
                    </div>
                  </a>
                {/each}
              </div>
              <div class="flex-[0.5] space-y-4 lg:w-full">
                <h2 class="flex items-center gap-2 text-base">
                  <Icon icon="ph:file" />
                  Downloads
                </h2>
                {#each lesson.downloads as download}
                  <a
                    href={`${import.meta.env.VITE_PB_URL}/api/files/lessons/${
                      lesson.id
                    }/${download}`}
                    download
                    class="block w-full rounded-md bg-white/10 p-2 outline outline-[1.5px] outline-white/20 transition hover:bg-white/20"
                  >
                    <div class="flex items-center justify-between">
                      <h3>{cleanFileName(download)}</h3>
                      <Icon icon="ph:download-simple" />
                    </div>
                  </a>
                {/each}
              </div>
            </div>
          </section>
        {/if}
      {/each}
    {/if}
  </main>
{:else}
  {(navigate("/"), isAuthVisible.set(true), isLogin.set(true))}
  <svelte:component this={Home} />
{/if}

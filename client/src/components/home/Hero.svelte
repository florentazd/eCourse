<script>
  import config from "../../config.json";
  import { scrollToCurriculum } from "../../lib/scroll.js";
  import { isAuthVisible, isLogin } from "../../lib/store.js";
  const { tech_stack_visible, tech_stack, hero, cta } = config;
</script>

<section
  class="mt-28 flex w-full flex-col items-center justify-center gap-5 p-5 text-center"
>
  {#if tech_stack_visible}
    <div
      class="flex items-center gap-3 rounded-full px-4 py-2 outline outline-[1px] outline-white/10"
    >
      {#each tech_stack as tech}
        <div class="flex items-center gap-1">
          <img class="w-5" src={tech.icon} alt={tech.name} />
          <h3 class="text-white/50">{tech.name}</h3>
        </div>
      {/each}
    </div>
  {/if}

  <div class="space-y-5">
    <h1 class="w-[600px] text-4xl sm:w-full sm:text-3xl">
      {hero.headline}
    </h1>
    <div class="space-x-2">
      <button
        on:click={() => {
          $isAuthVisible = !$isAuthVisible;
          $isLogin = false;
        }}
        class="rounded-md bg-main px-4 py-2 transition hover:bg-main/80"
        >{cta.primary}</button
      >
      <button
        on:click={() => scrollToCurriculum("Curriculum")}
        class="rounded-md bg-white/10 px-4 py-2 outline outline-[1.5px] outline-white/20 transition hover:bg-white/20"
        >{cta.secondary}</button
      >
    </div>
  </div>

  <div
    class="mt-5 flex w-[1000px] items-center justify-center rounded-md bg-main p-8 lg:w-full sm:p-5"
  >
    <video class="w-full rounded-md" autoplay loop muted>
      <source src={hero.video} type="video/mp4" />
      <track
        kind="captions"
        label="English captions"
        src={hero.video_captions}
        srclang="en"
        default
      />
    </video>
  </div>
</section>

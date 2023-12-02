<script>
  import config from "../../config.json";
  import { navigate } from "svelte-routing";
  import { isAuthVisible, isLogin } from "../../lib/store.js";
  import { currentUser } from "../../lib/pocketbase.js";
  const { logo, logo_text, cta } = config;
</script>

<header
  class="fixed inset-x-0 top-0 flex w-full items-center justify-between border-b-[1.5px] border-b-white/10 bg-dark p-5"
>
  <div class="flex items-center gap-2">
    <img class="w-7" src={logo} alt={logo_text} />
    <h3 class="text-xl">{logo_text}</h3>
  </div>

  <div class="flex items-center gap-5">
    <button
      on:click={() => {
        if ($currentUser) {
          navigate("/course");
        } else {
          $isAuthVisible = !$isAuthVisible;
          $isLogin = true;
        }
      }}
      class="text-white/50 transition hover:text-white">Login</button
    >
    <button
      on:click={() => {
        $isAuthVisible = !$isAuthVisible;
        $isLogin = false;
      }}
      class="rounded-md bg-white/10 px-4 py-2 outline outline-[1.5px] outline-white/20 transition hover:bg-white/20"
      >{cta.primary}</button
    >
  </div>
</header>

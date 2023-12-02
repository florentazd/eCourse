<script>
  import { Link } from "svelte-routing";
  export let location;
</script>

<main class="flex h-screen w-full items-center justify-center">
  <div class="flex flex-col items-center gap-4 p-5 text-center">
    <h3
      class="rounded-md bg-red-400/10 p-2 leading-none text-red-400 outline outline-[1.5px] outline-red-400/20"
    >
      404 Not Found
    </h3>
    <p class="text-base leading-none">
      The page at <span class="text-main">{location.pathname}</span> does not exist.
    </p>
    <Link
      class="rounded-md bg-main px-4 py-2 transition hover:bg-main/80"
      to="/">Back to home</Link
    >
  </div>
</main>

<script>
  import { navigate } from "svelte-routing";
  import { currentUser } from "../lib/pocketbase.js";
  import { isAuthVisible, isLogin } from "../lib/store.js";
  import Sidebar from "../components/course/Sidebar.svelte";
  import Modules from "../components/course/Modules.svelte";
  import Search from "../components/course/Search.svelte";
  import Home from "./Home.svelte";
</script>

{#if $currentUser}
  <Search />
  <main class="flex h-screen justify-between lg:overflow-x-hidden">
    <Sidebar />
    <Modules />
  </main>
{:else}
  {(navigate("/"), isAuthVisible.set(true), isLogin.set(true))}
  <svelte:component this={Home} />
{/if}

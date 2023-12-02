<script>
  import { onMount, onDestroy } from "svelte";
  import { fly, slide } from "svelte/transition";
  import Icon from "@iconify/svelte";
  import { isAuthVisible, isLogin } from "../../lib/store.js";
  import { pb } from "../../lib/pocketbase.js";
  import { navigate } from "svelte-routing";

  let username = "";
  let email = "";
  let password = "";

  let isLoading = false;
  let isUsernameValid = false;
  let isEmailValid = false;
  let isPasswordValid = false;

  let isFormSubmitted = false;
  let createAccountError = false;
  let loginError = false;

  $: isUsernameValid = username.length >= 3 && !/\s/.test(username);
  $: isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  $: isPasswordValid = password.length >= 8;

  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
  });

  onDestroy(() => {
    window.removeEventListener("keydown", handleKeydown);
  });

  const handleKeydown = (event) => {
    if (event.key === "Escape") {
      $isAuthVisible = false;
    }
  };

  const toggleForm = () => {
    $isLogin = !$isLogin;
    isFormSubmitted = false;
    createAccountError = false;
    loginError = false;
  };

  function submitForm() {
    isFormSubmitted = true;
  }

  async function login() {
    if (isUsernameValid && isPasswordValid) {
      isLoading = true;
      try {
        await pb.collection("users").authWithPassword(username, password);
        navigate("/course");
        $isAuthVisible = false;
      } catch (err) {
        loginError = true;
      }
      isLoading = false;
    }
  }

  async function createAccount() {
    if (isUsernameValid && isPasswordValid && isEmailValid) {
      isLoading = true;
      try {
        const data = {
          username,
          email,
          password,
          passwordConfirm: password,
        };
        await pb.collection("users").create(data);
        await pb.collection("users").authWithPassword(username, password);
        navigate("/course");
        $isAuthVisible = false;
      } catch (err) {
        createAccountError = true;
      }
      isLoading = false;
    }
  }
</script>

{#if $isAuthVisible}
  <div
    aria-hidden="true"
    on:click={() => {
      $isAuthVisible = false;
      isFormSubmitted = false;
      createAccountError = false;
      loginError = false;
    }}
    on:keydown={handleKeydown}
    class="fixed inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-sm"
  >
    <div
      aria-hidden="true"
      on:click|stopPropagation
      transition:fly={{ duration: 300, y: 50 }}
      class="mx-5 w-[500px] space-y-5 rounded-md bg-dark p-5 outline outline-[1.5px] outline-white/10"
    >
      <div class="flex w-full items-center justify-between">
        <h2 class="text-xl">
          {$isLogin ? "Welcome back" : "Create your account"}
        </h2>
        <button
          on:click={() => {
            $isAuthVisible = false;
            isFormSubmitted = false;
            createAccountError = false;
            loginError = false;
          }}
        >
          <Icon
            class="rotate-45 text-2xl text-white/50 transition hover:text-white "
            icon="ph:plus"
          />
        </button>
      </div>

      {#if createAccountError}
        <h3 transition:slide={{ duration: 150 }} class="text-red-400">
          Account creation failed. Please try again later
        </h3>
      {/if}

      {#if loginError}
        <h3 transition:slide={{ duration: 150 }} class="text-red-400">
          Login failed. Please check your credentials and try again
        </h3>
      {/if}

      <form class="flex flex-col gap-4" on:submit|preventDefault>
        <input
          bind:value={username}
          class={!isUsernameValid && isFormSubmitted
            ? "rounded-md bg-red-400/5 p-2 text-red-400 outline outline-[1.5px] outline-red-400/10 transition placeholder:text-red-400/50 focus:outline-red-400/20"
            : "rounded-md bg-white/5 p-2 outline outline-[1.5px] outline-white/10 transition placeholder:text-white/50 focus:outline-white/20"}
          placeholder="Username"
          type="text"
        />
        {#if !isUsernameValid && isFormSubmitted}
          <h3 transition:slide={{ duration: 150 }} class="text-red-400">
            Username must be 3+ characters and cannot contain spaces
          </h3>
        {/if}
        {#if !$isLogin}
          <input
            bind:value={email}
            transition:slide={{ duration: 150 }}
            class={!isEmailValid && isFormSubmitted
              ? "rounded-md bg-red-400/5 p-2 text-red-400 outline outline-[1.5px] outline-red-400/10 transition placeholder:text-red-400/50 focus:outline-red-400/20"
              : "rounded-md bg-white/5 p-2 outline outline-[1.5px] outline-white/10 transition placeholder:text-white/50 focus:outline-white/20"}
            placeholder="Email"
            type="text"
          />
          {#if !isEmailValid && isFormSubmitted}
            <h3 transition:slide={{ duration: 150 }} class="text-red-400">
              Email address in invalid
            </h3>
          {/if}
        {/if}

        <input
          bind:value={password}
          class={!isPasswordValid && isFormSubmitted
            ? "rounded-md bg-red-400/5 p-2 text-red-400 outline outline-[1.5px] outline-red-400/10 transition placeholder:text-red-400/50 focus:outline-red-400/20"
            : "rounded-md bg-white/5 p-2 outline outline-[1.5px] outline-white/10 transition placeholder:text-white/50 focus:outline-white/20"}
          placeholder="Password"
          type="password"
        />
        {#if !isPasswordValid && isFormSubmitted}
          <h3 transition:slide={{ duration: 150 }} class="text-red-400">
            Password must be 8+ characters
          </h3>
        {/if}
        {#if !$isLogin}
          <button
            on:click={() => {
              submitForm();
              createAccount();
            }}
            class={isLoading
              ? "pointer-events-none flex items-center justify-center gap-2 rounded-md bg-main p-2 opacity-50"
              : "rounded-md bg-main p-2 transition hover:bg-main/80"}
          >
            {#if isLoading}
              <Icon
                class="animate-spin text-base"
                icon="fluent:spinner-ios-20-filled"
              />
            {/if}
            {isLoading ? "Creating account..." : "Create account"}</button
          >
        {:else}
          <button
            on:click={() => {
              submitForm();
              login();
            }}
            class={isLoading
              ? "pointer-events-none flex items-center justify-center gap-2 rounded-md bg-main p-2 opacity-50"
              : "rounded-md bg-main p-2 transition hover:bg-main/80"}
          >
            {#if isLoading}
              <Icon
                class="animate-spin text-base"
                icon="fluent:spinner-ios-20-filled"
              />
            {/if}
            {isLoading ? "Logging in..." : "Login"}</button
          >
        {/if}

        <button on:click={toggleForm} class="text-white/50">
          {#if !$isLogin}
            Already have an account? <span class="text-white underline"
              >Login</span
            >
          {:else}
            Don't have an account? <span class="text-white underline"
              >Create one</span
            >
          {/if}
        </button>
      </form>
    </div>
  </div>
{/if}

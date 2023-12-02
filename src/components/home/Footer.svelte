<script>
  import config from "../../config.json";
  const { logo_text } = config;
</script>

<footer class="mt-10 w-full border-t-[1.5px] border-t-white/10 p-5 text-center">
  <h5 class="text-white/50">
    © Copyright {new Date().getFullYear()}
    {logo_text}
  </h5>
</footer>

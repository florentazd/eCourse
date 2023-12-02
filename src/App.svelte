<script>
  import { onMount } from "svelte";
  import { fetchRecords } from "./lib/pocketbase.js";
  import { isLoading } from "./lib/store.js";
  import { Router, Route } from "svelte-routing";
  import NotFound from "./routes/NotFound.svelte";
  import Home from "./routes/Home.svelte";
  import Course from "./routes/Course.svelte";
  import Lesson from "./routes/Lesson.svelte";

  onMount(async () => {
    await fetchRecords();
    $isLoading = false;
  });
</script>

<Router>
  <Route path="/" component={Home} />
  <Route path="/course" component={Course} />
  <Route path="/course/:lessonTitle" component={Lesson} />
  <Route>
    <NotFound {location} />
  </Route>
</Router>

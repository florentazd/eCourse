import PocketBase from "pocketbase";
import { writable } from "svelte/store";
export const pb = new PocketBase(import.meta.env.VITE_PB_URL);

export const currentUser = writable(pb.authStore.model);
export const modules = writable([]);
export const lessons = writable([]);

pb.authStore.onChange((auth) => {
  currentUser.set(pb.authStore.model);
});

export const fetchRecords = async () => {
  const moduleRecords = await pb.collection("modules").getFullList({
    sort: "created",
  });

  const lessonRecords = await pb.collection("lessons").getFullList({
    sort: "created",
  });

  modules.set(moduleRecords);
  lessons.set(lessonRecords);
};

import { writable } from "svelte/store";

export const isLoading = writable(true);

const sidebarValue = localStorage.getItem("isSidebarVisible");
export const isSidebarVisible = writable(
  sidebarValue !== null ? JSON.parse(sidebarValue) : true,
);

isSidebarVisible.subscribe((value) => {
  localStorage.setItem("isSidebarVisible", JSON.stringify(value));
});

const searchValue = localStorage.getItem("isSearchVisible");
export const isSearchVisible = writable(
  searchValue !== null ? JSON.parse(searchValue) : false,
);

isSearchVisible.subscribe((value) => {
  localStorage.setItem("isSearchVisible", JSON.stringify(value));
});

const authValue = localStorage.getItem("isAuthVisible");
export const isAuthVisible = writable(
  authValue !== null ? JSON.parse(authValue) : false,
);

isAuthVisible.subscribe((value) => {
  localStorage.setItem("isAuthVisible", JSON.stringify(value));
});

const loginValue = localStorage.getItem("isLogin");
export const isLogin = writable(
  loginValue !== null ? JSON.parse(loginValue) : false,
);

isLogin.subscribe((value) => {
  localStorage.setItem("isLogin", JSON.stringify(value));
});

const lessonStatuses = localStorage.getItem("isLessonComplete");
export const isLessonComplete = writable(
  lessonStatuses !== null ? JSON.parse(lessonStatuses) : {},
);

isLessonComplete.subscribe((value) => {
  localStorage.setItem("isLessonComplete", JSON.stringify(value));
});

window.addEventListener("resize", () => {
  if (window.innerWidth <= 1024) {
    isSidebarVisible.set(false);
  } else {
    isSidebarVisible.set(sidebarValue);
  }
});

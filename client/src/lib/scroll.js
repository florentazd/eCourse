export function scrollToCurriculum(target) {
  const curriculum = document.getElementById(target);

  if (curriculum) {
    const offset = curriculum.offsetTop;

    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });
  }
}

export function scrollToModules(target) {
  const modules = document.getElementById(target);

  if (modules) {
    const modulesContainer = findModulesContainer(modules);

    if (modulesContainer) {
      const offset = modules.offsetTop;

      modulesContainer.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  }
}

function findModulesContainer(element) {
  let parent = element.parentElement;

  while (parent) {
    if (parent.classList.contains("overflow-y-scroll")) {
      return parent;
    }
    parent = parent.parentElement;
  }

  return null;
}

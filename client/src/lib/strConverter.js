export function toSlug(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export function toStr(slug) {
  const words = slug.split("-");
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);

  return words.join(" ");
}

export function formatDuration(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  const minutesStr = minutes.toString().padStart(2, "0");
  const secondsStr = seconds.toString().padStart(2, "0");
  return `${minutesStr}:${secondsStr}`;
}

export function cleanFileName(inputFileName) {
  let cleanedFileName =
    inputFileName.charAt(0).toUpperCase() + inputFileName.slice(1);

  cleanedFileName = cleanedFileName.replace(/_/g, " ");

  const dotIndex = cleanedFileName.lastIndexOf(".");
  if (dotIndex !== -1 && dotIndex >= 11) {
    cleanedFileName =
      cleanedFileName.slice(0, dotIndex - 11) + cleanedFileName.slice(dotIndex);
  }

  return cleanedFileName;
}

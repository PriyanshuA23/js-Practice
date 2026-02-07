export const delay = (time) => {
  return new Promise((res) => {
    setTimeout(() => res(), time);
  });
};
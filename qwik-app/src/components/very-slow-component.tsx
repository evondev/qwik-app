import { component$ } from "@builder.io/qwik";
const wait = (ms: number) => {
  const start = Date.now();
  let now = start;

  while (now - start < ms) now = Date.now();
};
export const VerySlowComponent = component$(() => {
  wait(5000);
  return <div>VerySlowComponent</div>;
});

import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Layout } from "~/components/layout";

export default component$(() => {
  return (
    <Layout>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe repellendus dolorem sunt necessitatibus, autem corporis fuga eos, illum deserunt cumque nisi maxime iure minus id. Nemo accusamus pariatur corporis sunt.
    </Layout>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};

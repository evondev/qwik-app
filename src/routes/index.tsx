import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Layout } from "~/components/layout";
import { CourseItem } from "~/modules/course/components/course-item";

export default component$(() => {
  return (
    <Layout>
      <h1 class="text-textPrimary relative mb-8 flex w-max items-center gap-2 text-2xl font-extrabold lg:text-3xl dark:text-white">
        Khám phá
      </h1>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-8">
        {Array.from({ length: 10 }).map((_, index) => (
          <CourseItem key={index} />
        ))}
      </div>
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

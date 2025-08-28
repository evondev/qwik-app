/* eslint-disable qwik/jsx-img */
import { component$ } from "@builder.io/qwik";

interface MovieCardProps {
  poster_path: string;
  title: string;
}

export const MovieCard = component$((props: MovieCardProps) => {
  return (
    <div>
      <div class="h-[480px] overflow-hidden rounded-xl">
        <img
          src={`https://image.tmdb.org/t/p/w500${props.poster_path}`}
          alt={props.title}
          class="size-full object-cover"
          sizes="(max-width: 320px) 100vw, 320px"
          loading="lazy"
        />
      </div>
      <h3 class="p-2 text-xl font-bold">{props.title}</h3>
    </div>
  );
});

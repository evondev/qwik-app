/* eslint-disable qwik/jsx-img */
import { $, component$, useSignal } from "@builder.io/qwik";

interface MovieCardProps {
  poster_path: string;
  title: string;
}

export const MovieCard = component$((props: MovieCardProps) => {
  const isViewInModal = useSignal(false);
  const handleViewImage = $(() => {
    isViewInModal.value = true;
  });
  return (
    <>
      <div>
        <div class="h-[480px] overflow-hidden rounded-xl">
          <img
            src={`https://image.tmdb.org/t/p/w500${props.poster_path}`}
            alt={props.title}
            class="size-full cursor-zoom-in object-cover"
            sizes="(max-width: 320px) 100vw, 320px"
            loading="lazy"
            onClick$={handleViewImage}
          />
        </div>
        <h3 class="p-2 text-xl font-bold">{props.title}</h3>
      </div>
      {isViewInModal.value && (
        <div class="modal fixed inset-0 z-20 flex items-center justify-center p-5">
          <img
            src={`https://image.tmdb.org/t/p/w500${props.poster_path}`}
            alt={props.title}
            class="object-cover"
            loading="lazy"
            onClick$={() => (isViewInModal.value = false)}
          />
        </div>
      )}
    </>
  );
});

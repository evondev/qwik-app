/* eslint-disable qwik/jsx-img -- needed */
import {
  $,
  component$,
  Resource,
  useResource$,
  useSignal,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { MovieCard } from "~/components/movie-card";
import { Skeleton } from "~/components/skeleton";
import {
  fetchGenres,
  fetchMoviesByGenre,
  fetchSearchMovies,
  Genre,
  tmdbAPI,
} from "~/config";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

export const usePopularMovies = routeLoader$(async () => {
  const response = await fetch(tmdbAPI.getMovieList("popular", 1));
  const data = await response.json();
  return (data.results as Movie[]) || [];
});

export const useUpcomingMovies = routeLoader$(async () => {
  const response = await fetch(tmdbAPI.getMovieList("upcoming", 1));
  const data = await response.json();
  return (data.results as Movie[]) || [];
});

export default component$(() => {
  const mode = useSignal<string>("light");
  const searchQuery = useSignal<string>("");
  const debouncedSearchTerm = useSignal("");
  const selectedGenre = useSignal<number>(0);
  const genresResource = useResource$<Genre[]>(async () => await fetchGenres());

  useTask$(({ track, cleanup }) => {
    track(() => searchQuery.value);

    const timer = setTimeout(() => {
      debouncedSearchTerm.value = searchQuery.value;
    }, 500);

    cleanup(() => clearTimeout(timer));
  });

  const moviesResource = useResource$<Movie[]>(async ({ track }) => {
    track(() => debouncedSearchTerm.value);
    track(() => selectedGenre.value);

    if (debouncedSearchTerm.value) {
      return await fetchSearchMovies(debouncedSearchTerm.value);
    } else if (selectedGenre.value) {
      return await fetchMoviesByGenre(selectedGenre.value);
    }
    return [];
  });

  useVisibleTask$(({ track }) => {
    track(() => debouncedSearchTerm.value);
    track(() => selectedGenre.value);
  });

  const popularMoviesResource = usePopularMovies();
  const upcomingMoviesResource = useUpcomingMovies();

  const handleDarkMode = $(() => {
    document.documentElement.classList.add("dark");
    mode.value = "dark";
  });

  const handleLightMode = $(() => {
    document.documentElement.classList.remove("dark");
    mode.value = "light";
  });

  return (
    <div class="mx-auto max-w-[1440px]">
      <div class="relative mb-10 h-screen max-h-[1000px] w-full overflow-hidden rounded-b-4xl">
        <div class="absolute top-5 left-5 z-10 font-black text-white uppercase">
          {mode.value} MODE
        </div>
        <div class="absolute top-5 right-5 z-10">
          <div class="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              class="h-6 w-6 cursor-pointer"
              onClick$={handleLightMode}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              class="h-6 w-6 cursor-pointer"
              onClick$={handleDarkMode}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
          </div>
        </div>
        <div class="absolute inset-0 bg-black/50"></div>
        <div
          class="h-full w-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(/public/spiderman.jpg)`,
          }}
        ></div>
      </div>
      <div class="flex flex-col gap-10 px-5">
        <section class="flex flex-col gap-5">
          <h2 class="text-3xl font-bold">Explore more</h2>
          <input
            placeholder="Search for a movie"
            class="mb-5 rounded-lg border border-gray-200 p-2 outline-none dark:border-gray-200/20"
            value={searchQuery.value}
            onInput$={(e) => {
              searchQuery.value = (e.target as HTMLInputElement).value;
              selectedGenre.value = 0;
            }}
          />
          <Resource
            value={genresResource}
            onPending={() => <div>Đang tải...</div>}
            onResolved={(genres) => (
              <div class="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <span
                    key={genre.id}
                    class={`cursor-pointer rounded-full border border-gray-200 px-3 py-1 text-sm font-semibold dark:border-gray-200/20 dark:text-white ${selectedGenre.value === genre.id ? "bg-blue-400" : ""}`}
                    onClick$={() => {
                      selectedGenre.value = genre.id;
                      searchQuery.value = "";
                    }}
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
          />
          <Resource
            value={moviesResource}
            onPending={() => <Skeleton />}
            onResolved={(movies) => (
              <div class="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    poster_path={movie.poster_path}
                    title={movie.title}
                  />
                ))}
              </div>
            )}
          />
        </section>
        <section class="flex flex-col gap-5">
          <h2 class="text-3xl font-bold">Popular</h2>
          <Resource
            value={popularMoviesResource}
            onPending={() => <Skeleton />}
            onResolved={(movies) => (
              <div class="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    poster_path={movie.poster_path}
                    title={movie.title}
                  />
                ))}
              </div>
            )}
          />
        </section>
        <section class="flex flex-col gap-5">
          <h2 class="text-3xl font-bold">Upcoming</h2>
          <Resource
            value={upcomingMoviesResource}
            onPending={() => <Skeleton />}
            onResolved={(movies) => (
              <div class="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    poster_path={movie.poster_path}
                    title={movie.title}
                  />
                ))}
              </div>
            )}
          />
        </section>
      </div>
    </div>
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

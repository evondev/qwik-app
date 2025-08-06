import { $, component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { menuLinks } from "~/shared/constants/common.constants";
import { MenuLink } from "./menu-link";

export const Sidebar = component$(() => {
  const location = useLocation();
  const isActiveLink = $((url: string) => url === location.url.pathname);

  return (
    <div class="border-r border-r-gray-200 bg-white px-5">
      <Link href="/" class="mb-5 flex h-20 items-center gap-2 py-3">
        <div class="bg-primary flex size-10 flex-shrink-0 items-center justify-center rounded-full p-3 font-black text-white">
          Q
        </div>
        <span class="text-xl font-bold">QwikApp</span>
      </Link>
      <ul class="flex flex-col gap-3">
        {menuLinks.map((link) => {
          return (
            <li key={link.title}>
              <MenuLink link={link} isActiveLink={isActiveLink}></MenuLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

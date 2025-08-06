import { component$, QRL, useSignal, useTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { cn } from "~/shared/lib/utils";
import { MenuLinkItemProps } from "~/shared/types/common.types";

interface MenuLinkProps {
  link: MenuLinkItemProps;
  isActiveLink: QRL<(url: string) => boolean>;
}

export const MenuLink = component$(({ link, isActiveLink }: MenuLinkProps) => {
  const isActive = useSignal(false);

  useTask$(async ({ track }) => {
    track(() => link.url);
    isActive.value = await isActiveLink(link.url);
  });

  return (
    <Link
      href={link.url}
      class={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium transition-all",
        isActive.value
          ? "bg-primary/10 text-primary svg-animate font-semibold"
          : "text-gray70 hover:bg-primary hover:bg-opacity-10 hover:text-primary dark:hover:text-primary dark:text-slate-500",
      )}
    >
      <div class="flex size-5 items-center justify-center">{link.icon}</div>
      <span>{link.title}</span>
    </Link>
  );
});

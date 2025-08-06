import { component$ } from "@builder.io/qwik";

export const CourseItem = component$(() => {
  return (
    <div class="dark:bg-grayDarkest relative flex flex-col rounded-lg border border-white bg-white/30 p-3 backdrop-blur-xl transition-all dark:border-white/10">
      <div class="dark:bg-grayDarker flex h-full flex-col gap-3 rounded-lg bg-white p-3">
        <div class="group relative block h-[180px] rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1754265222750-687ab87f5549?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            width={600}
            height={360}
            class="h-full w-full rounded-lg object-cover transition-all"
            sizes="300px"
          />
        </div>
        <div class="flex flex-1 flex-col">
          <h3 class="mb-5 line-clamp-3 block text-base font-bold lg:text-lg">
            Khóa học Qwik cơ bản dành cho người mới bắt đầu
          </h3>
          <div class="mt-auto">
            <div class="dark:bg-grayDarkest rounded-xl border border-[#f6f6f8] bg-[#f6f6f8]/30 p-1 backdrop-blur-xl dark:border-white/10">
              <button class="bg-primary button-styles inline-flex h-12 w-full min-w-[120px] flex-shrink-0 items-center justify-center rounded-lg px-5 text-center text-sm font-bold text-white transition-all">
                Xem chi tiết
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

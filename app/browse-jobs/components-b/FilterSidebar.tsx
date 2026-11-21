"use client"; // browser-এ চলবে

import { useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { Counts } from "@/lib/api/jobs";

// filter এর তালিকা (লেখা MongoDB-র সাথে হুবহু মিলতে হবে)
const GROUPS = [
  {
    key: "jobType",
    title: "Job Type",
    options: [
      { value: "full-time", label: "Full-time" },
      { value: "part-time", label: "Part-time" },
      { value: "contract", label: "Contract" },
      { value: "internship", label: "Internship" },
    ],
  },
  {
    key: "category",
    title: "Job Category",
    options: [
      { value: "Engineering & Tech", label: "Engineering & Tech" },
      { value: "Design", label: "Design" },
      { value: "Product", label: "Product" },
      { value: "Marketing", label: "Marketing" },
      { value: "Infrastructure", label: "Infrastructure" },
      { value: "Quality", label: "Quality" },
    ],
  },
  {
    key: "workMode",
    title: "Work Arrangement",
    options: [
      { value: "Remote", label: "Remote" },
      { value: "On-site", label: "On-site" },
    ],
  },
] as const;

// এই গ্রুপগুলোতে একসাথে একটাই টিক থাকবে
const SINGLE_SELECT: string[] = ["jobType","category", "category", "workMode"];

export default function FilterSidebar({ counts }: { counts: Counts }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    // নতুন query দিয়ে URL বদলানোর সহায়ক function
    const push = (params: URLSearchParams) => {
        const qs = params.toString();
        startTransition(() => {
            router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
        });
    };

    // টিক থাকলে সরাও, না থাকলে যোগ করো
    // ⬇️ এই toggle টা পুরনোটার জায়গায়
    const toggle = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const current = params.getAll(key);

        params.delete(key);

        let next: string[];
        if (SINGLE_SELECT.includes(key)) {
            next = current.includes(value) ? [] : [value];
        } else {
            next = current.includes(value)
                ? current.filter((v) => v !== value)
                : [...current, value];
        }

        next.forEach((v) => params.append(key, v));
        push(params);
    };

    

    // সব filter মোছো (search রেখে)
    const clearAll = () => {
        const params = new URLSearchParams(searchParams.toString());
        GROUPS.forEach((g) => params.delete(g.key));
        push(params);
    };

     // কোনো filter চালু আছে কি না
    const hasFilters = GROUPS.some((g) => searchParams.getAll(g.key).length > 0);

    // toggle, clearAll ফাংশন এখানে থাকবে ...


    return (
        <aside
            className={`h-fit rounded-2xl border border-white/10 bg-white/5 p-5 transition-opacity ${
                isPending ? "opacity-60" : ""
            }`}
        >
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                {hasFilters && (
                    <button
                        onClick={clearAll}
                        className="text-xs text-zinc-400 underline hover:text-white"
                    >
                        Clear all
                    </button>
                )}
            </div>

          {GROUPS.map((group) => {
    const selected = searchParams.getAll(group.key);
    const groupCounts = (counts[group.key as keyof Counts] ?? {}) as Record<string, number>;

    return (
        <div key={group.key} className="mb-6 last:mb-0">
            <h3 className="mb-3 text-sm font-medium">{group.title}</h3>
            <div className="space-y-2">
                {group.options.map((option) => {
                    const count = groupCounts[option.value] ?? 0;
                    const isChecked = selected.includes(option.value);
                    const isDisabled = count === 0 && !isChecked;
 
                    return (
                        <label
                            key={option.value}
                            className={`flex items-center justify-between text-sm transition-opacity ${
                                isDisabled
                                    ? "cursor-not-allowed opacity-40"
                                    : "cursor-pointer text-zinc-300 hover:text-white"
                            }`}
                        >
                            <span className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    disabled={isDisabled}
                                    onChange={() => toggle(group.key, option.value)}
                                    className="h-4 w-4 accent-blue-500"
                                />
                                {option.label}
                            </span>
                            <span className="text-xs text-zinc-500">{count}</span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
})}
</aside>
    );
}
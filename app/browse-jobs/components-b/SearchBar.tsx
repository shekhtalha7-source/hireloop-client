"use client"; // browser-এ চলবে

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function SearchBar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // বক্সের লেখা মনে রাখো, শুরুতে URL থেকে নাও
    const [value, setValue] = useState(searchParams.get("search") ?? "");

    // "Search Jobs" চাপলে বা Enter দিলে
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // পেজ reload আটকাও

        // বর্তমান URL এর কপি (অন্য filter ঠিক রাখতে)
        const params = new URLSearchParams(searchParams.toString());

        // লেখা থাকলে বসাও, খালি হলে সরাও
        if (value.trim()) params.set("search", value.trim());
        else params.delete("search");

        // নতুন URL এ যাও
        const qs = params.toString();
        router.push(qs ? `${pathname}?${qs}` : pathname);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-8 flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
        >
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search by job title, keywords..."
                className="w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-white/20"
            />
            <button
                type="submit"
                className="whitespace-nowrap rounded-xl bg-white px-5 py-3 text-sm font-medium text-black hover:bg-zinc-200"
            >
                Search Jobs
            </button>
        </form>
    );
}
import { Suspense } from "react";
import { getJobs, getJobCounts } from "@/lib/api/jobs";
import SearchBar from "./components-b/SearchBar";
import FilterSidebar from "./components-b/FilterSidebar";
import JobCard from "./components-b/JobCard";
import type { Job } from "./components-b/JobCard";

export default async function BrowseJobsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    // ১. URL থেকে searchParams পড়ো
    const sp = await searchParams;

    // ২. urlSearch বানাও
    const urlSearch = new URLSearchParams();
    Object.entries(sp).forEach(([key, value]) => {
        if (typeof value === "string") urlSearch.set(key, value);
        else if (Array.isArray(value)) value.forEach((v) => urlSearch.append(key, v));
    });

    // ৩. এবার query বানাও (urlSearch এখন আছে)
    const query = urlSearch.toString();

    // ৪. jobs আর counts আনো
    const [jobs, counts]: [Job[], Awaited<ReturnType<typeof getJobCounts>>] =
        await Promise.all([getJobs(query), getJobCounts(query)]);


    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <div className="mx-auto max-w-6xl p-6">
                <Suspense fallback={<div className="mb-8 h-20 animate-pulse rounded-2xl bg-white/5" />}>
                    <SearchBar />
                </Suspense>

                <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
                    <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-white/5" />}>
                        <FilterSidebar counts={counts} />
                    </Suspense>

                    <section>
                        <h1 className="mb-4 text-2xl font-bold">
                            Found {jobs.length} Professional Jobs
                        </h1>

                        {jobs.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-white/20 p-10 text-center text-zinc-400">
                                No jobs match your filters.
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {jobs.map((job) => (
                                    <JobCard key={job._id} job={job} />
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}


import Link from "next/link";
import { notFound } from "next/navigation";
import { getJobById } from "@/lib/api/jobs";
import type { Job } from "../components-b/JobCard";

// requirements array, string বা খালি যাই হোক, সবসময় array বানাও
const toList = (v: unknown): string[] => {
    if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean);
    if (typeof v === "string") {
        return v.split(/\r?\n|;|•/).map((s) => s.trim()).filter(Boolean);
    }
    return [];
};

// যেকোনো মানকে নিরাপদে লেখা বানাও (object হলে min-max ধরো)
const show = (v: unknown): string | undefined => {
    if (v === null || v === undefined || v === "") return undefined;
    if (typeof v === "object") {
        const o = v as Record<string, unknown>;
        if ("min" in o || "max" in o) {
            return `${o.min ?? ""} - ${o.max ?? ""} ${o.currency ?? ""}`.trim();
        }
        return undefined;
    }
    return String(v);
};

export default async function JobDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const job: Job | null = await getJobById(id);

    if (!job) notFound();

    const requirements = toList(job.requirements);

    const overview = [
        { label: "Job type", value: show(job.jobType) },
        { label: "Category", value: show(job.category) },
        { label: "Location", value: show(job.location) },
        { label: "Work mode", value: job.isRemote ? "Remote" : "On-site" },
        { label: "Salary", value: show(job.salary) },
        {
            label: "Posted",
            value: job.postedAt
                ? new Date(job.postedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                  })
                : undefined,
        },
    ].filter((row) => row.value);

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <div className="mx-auto max-w-5xl p-6">
              <Link
    href="/browse-jobs"
    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30 active:translate-y-0 active:scale-95"
>
    <span className="text-base">←</span>
    Back to Jobs
</Link>

                <header className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-6">
                    <h1 className="text-3xl font-bold">{job.title}</h1>
                    <p className="mt-2 text-zinc-400">
                        {job.companyName} · {job.location}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs">
                        <span className="rounded-full bg-white/10 px-3 py-1 capitalize text-zinc-300">
                            {job.jobType}
                        </span>
                        {job.category && (
                            <span className="rounded-full bg-white/10 px-3 py-1 text-zinc-300">
                                {job.category}
                            </span>
                        )}
                        <span
                            className={`rounded-full px-3 py-1 ${
                                job.isRemote
                                    ? "bg-green-500/15 text-green-400"
                                    : "bg-white/10 text-zinc-300"
                            }`}
                        >
                            {job.isRemote ? "Remote" : "On-site"}
                        </span>
                    </div>
                </header>

                <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
                    <main className="space-y-6">
                        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
                            <h2 className="mb-3 text-lg font-semibold">About the role</h2>
                            {typeof job.description === "string" && job.description ? (
                                <p className="whitespace-pre-line leading-relaxed text-zinc-300">
                                    {job.description}
                                </p>
                            ) : (
                                <p className="text-zinc-500">
                                    No description has been added for this job yet.
                                </p>
                            )}
                        </section>

                        {requirements.length > 0 && (
                            <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
                                <h2 className="mb-3 text-lg font-semibold">Requirements</h2>
                                <ul className="list-disc space-y-2 pl-5 text-zinc-300">
                                    {requirements.map((req, i) => (
                                        <li key={`${i}-${req}`}>{req}</li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </main>

                    <aside className="h-fit rounded-2xl border border-white/10 bg-white/5 p-6">
                        <h2 className="mb-4 text-lg font-semibold">Job overview</h2>
                        <dl className="space-y-3 text-sm">
                            {overview.map((row) => (
                                <div key={row.label} className="flex justify-between gap-4">
                                    <dt className="text-zinc-500">{row.label}</dt>
                                    <dd className="text-right capitalize text-zinc-200">{row.value}</dd>
                                </div>
                            ))}
                        </dl>
                        <button className="mt-6 w-full rounded-xl bg-white px-4 py-3 text-sm font-medium text-black hover:bg-zinc-200">
                            Apply now
                        </button>
                    </aside>
                </div>
            </div>
        </div>
    );
}
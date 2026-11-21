import Link from "next/link";

export type Job = {
    _id: string;
    title: string;
    companyName: string;
    location: string;
    jobType: string;
    category?: string;
    isRemote: boolean;
    description?: string;
    salary?: string;
    requirements?: string[] | string;
    postedAt?: string;
};

export default function JobCard({ job }: { job: Job }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/10">
            {/* উপরের সারি: নাম + বাটন */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="mt-1 text-sm text-zinc-400">
                        {job.companyName} · {job.location}
                    </p>
                </div>

                <Link
                    href={`/browse-jobs/${job._id}`}
                    className="w-full shrink-0 rounded-xl border border-white/20 px-4 py-2 text-center text-sm transition hover:bg-white hover:text-black sm:w-auto"
                >
                    View details
                </Link>
            </div>

            {/* নিচের সারি: ট্যাগ */}
            <div className="mt-4 flex flex-wrap gap-2 border-t border-white/10 pt-4 text-xs">
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
        </div>
    );
}
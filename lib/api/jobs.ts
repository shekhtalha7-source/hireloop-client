const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

// সংখ্যার তালিকা দেখতে কেমন হবে (TypeScript এর জন্য)
export type Counts = {
    jobType: Record<string, number>;
    category: Record<string, number>;
    workMode: Record<string, number>;
};

// filter অনুযায়ী job আনো
export async function getJobs(query: string = "") {
    const res = await fetch(`${BASE_URL}/jobs${query ? `?${query}` : ""}`, {
        cache: "no-store", // প্রতিবার নতুন data
    });
    if (!res.ok) throw new Error(`Failed to fetch jobs: ${res.status}`);
    return res.json();
}

// sidebar এর পাশের সংখ্যা আনো
export async function getJobCounts(query: string = ""): Promise<Counts> {
    const res = await fetch(`${BASE_URL}/jobs/counts${query ? `?${query}` : ""}`, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error(`Failed to fetch counts: ${res.status}`);
    return res.json();
}

export async function getJobById(id: string) {
    const res = await fetch(`${BASE_URL}/jobs/${id}`, { cache: "no-store" });
    if (res.status === 404 || res.status === 400) return null;
    if (!res.ok) throw new Error(`Failed to fetch job: ${res.status}`);
    return res.json();
}
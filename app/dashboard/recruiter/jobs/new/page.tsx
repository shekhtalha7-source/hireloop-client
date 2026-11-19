"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Briefcase, Calendar, Loader2, MapPin } from "lucide-react"
import { createJob } from "@/lib/actions/jobs"

type JobType = "full-time" | "part-time" | "contract" | "internship"

// Flat form data, keys mirror the Figma layer names (isRemote, deadline, minSalary…).
export type JobFormData = {
    title: string
    companyName: string
    category: string
    jobType: JobType
    isRemote: boolean
    location: string
    deadline: string
    minSalary: string
    maxSalary: string
    salaryFrequency: string
    responsibilities: string
    requirements: string
     status: string
  posted: string
}


const JOB_CATEGORIES = [
    "Engineering & Tech",
    "Design",
    "Product",
    "Marketing",
    "Infrastructure",
    "Quality",
]

const JOB_TYPES: JobType[] = ["full-time", "part-time", "contract", "internship"]

const SALARY_FREQUENCIES = ["per hour", "per day", "per week", "per month", "per year"]

const inputClass =
    "bg-[#1A1A1F] border-white/10 focus-visible:border-[#5C53FE]/60 focus-visible:ring-[#5C53FE]/30 aria-invalid:border-destructive/60"
const sectionClass =
    "rounded-2xl border border-white/10 bg-[#101010]/95 p-6 shadow-[inset_0_3px_10px_rgba(255,255,255,0.04)]"
const sectionHeadingClass =
    "mb-6 flex items-center gap-3 font-heading text-lg font-semibold tracking-[-0.02em] text-white"
const sectionBulletClass =
    "flex size-7 items-center justify-center rounded-lg bg-[#5C53FE]/15 text-sm font-semibold text-[#8B85FF]"

export default function NewJobPage() {
    const router = useRouter()
    const [form, setForm] = useState<JobFormData>({
        title: "",
        companyName: "",
        category: "",
        jobType: "full-time",
        isRemote: false,
        location: "",
        deadline: "",
        minSalary: "",
        maxSalary: "",
        salaryFrequency: "per hour",
        responsibilities: "",
        requirements: "",
           status: "active",
    posted: "Just now",

    })
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    // Generic flat setter so every field is just setField("key")(value).
    const set =
        <K extends keyof JobFormData>(key: K) =>
            (value: JobFormData[K]) =>
                setForm((prev) => ({ ...prev, [key]: value }))

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError(null)

        startTransition(async () => {
            const result = await createJob(form)

            console.log( 'creat job',result);
            if (result.success) {
                router.push("/dashboard/recruiter")
            } else {
                setError(result.message)
            }
        })
    }



    

return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-1.5">
                <p className="text-xs font-medium tracking-wide text-[#8B85FF] uppercase">
                    Create New Listing
                </p>

                <h1 className="font-heading text-[28px] leading-[1.15] font-bold tracking-[-0.02em] text-white">
                    Post a New Job
                </h1>

                <p className="text-sm text-white/60">
                    Fill in the position specifications to attract qualified talent across
                    our network.
                </p>
            </div>
        </header>

        <form
            id="new-job-form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
        >
            {/* 1. Basic Information */}
            <section className={sectionClass}>
                <h2 className={sectionHeadingClass}>
                    <span className={sectionBulletClass}>1</span>
                    Basic Information
                </h2>

                <div className="flex flex-col gap-5">

                    {/* Job Title */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="title" className="text-sm font-medium text-white/90">
                            Job title
                        </Label>

                        <Input
                            id="title"
                            name="title"
                            required
                            minLength={3}
                            maxLength={80}
                            value={form.title}
                            onChange={(e) => set("title")(e.target.value)}
                            placeholder="e.g. Senior Product Designer"
                            className={`${inputClass} text-white placeholder:text-white/45`}
                        />
                    </div>

                    {/* Company Name & Job Category */}
                    <div className="grid gap-5 sm:grid-cols-2">

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="companyName" className="text-sm font-medium text-white/90">
                                Company name
                            </Label>

                            <div className="relative">
                                <Briefcase
                                    aria-hidden
                                    className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/50"
                                />

                                <Input
                                    id="companyName"
                                    name="companyName"
                                    required
                                    value={form.companyName}
                                    onChange={(e) => set("companyName")(e.target.value)}
                                    placeholder="Acme Inc."
                                    className={`${inputClass} pl-9 text-white placeholder:text-white/45`}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="category" className="text-sm font-medium text-white/90">
                                Job category
                            </Label>

                            <Select
                                value={form.category || ""}
                                onValueChange={(value) => set("category")(value ?? "")}
                            >
                                <SelectTrigger
                                    id="category"
                                    className={`${inputClass} w-full text-white`}
                                >
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>

                                <SelectContent className="border-white/10 bg-[#1A1A1F] text-white">
                                    {JOB_CATEGORIES.map((category) => (
                                        <SelectItem
                                            key={category}
                                            value={category}
                                            className="text-white focus:bg-white/10 focus:text-white"
                                        >
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Job Type */}
                    <fieldset className="flex flex-col gap-2">
                        <legend className="text-sm font-medium text-white/90 mb-3">
                            Job type
                        </legend>

                        <RadioGroup
                            value={form.jobType}
                            onValueChange={(value) => set("jobType")(value as JobType)}
                            className="grid grid-cols-2 gap-2 sm:grid-cols-4"
                        >
                            {JOB_TYPES.map((type) => {
                                const selected = form.jobType === type

                                return (
                                    <Label
                                        key={type}
                                        htmlFor={`job-type-${type}`}
                                        className={
                                            "flex h-11 cursor-pointer items-center justify-center rounded-lg border text-sm capitalize transition-colors has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-[#5C53FE]/60 " +
                                            (selected
                                                ? "border-[#5C53FE] bg-[#5C53FE]/15 text-white"
                                                : "border-white/10 bg-[#1A1A1F] text-white/80 hover:border-white/25 hover:text-white")
                                        }
                                    >
                                        <RadioGroupItem
                                            value={type}
                                            id={`job-type-${type}`}
                                            className="sr-only"
                                        />
                                        {type}
                                    </Label>
                                )
                            })}
                        </RadioGroup>
                    </fieldset>
                </div>
            </section>

            {/* 2. Location, Compensation & Timeline */}
            <section className={sectionClass}>
                <h2 className={sectionHeadingClass}>
                    <span className={sectionBulletClass}>2</span>
                    Location, Compensation &amp; Timeline
                </h2>

                <div className="flex flex-col gap-5">

                    {/* Remote Work Allowed */}
                    <div className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-[#1A1A1F] p-4">
                        <div className="flex flex-col gap-1">
                            <Label
                                htmlFor="isRemote"
                                className="text-sm font-medium text-white/90"
                            >
                                Remote work allowed
                            </Label>

                            <p className="text-xs text-white/60">
                                Enable worldwide or distributed candidate applications
                            </p>
                        </div>

                        <Switch
                            id="isRemote"
                            checked={form.isRemote}
                            onCheckedChange={(checked) => set("isRemote")(checked)}
                        />
                    </div>

                    {/* Job Location & Application Deadline */}
                    <div className="grid gap-5 sm:grid-cols-2">

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="location" className="text-sm font-medium text-white/90">
                                Job location <span className="text-destructive">*</span>
                            </Label>

                            <div className="relative">
                                <MapPin
                                    aria-hidden
                                    className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/50"
                                />

                                <Input
                                    id="location"
                                    name="location"
                                    required={!form.isRemote}
                                    value={form.location}
                                    onChange={(e) => set("location")(e.target.value)}
                                    placeholder="e.g. New York, USA"
                                    className={`${inputClass} pl-9 text-white placeholder:text-white/45`}
                                />
                            </div>

                            <p className="text-xs text-white/50">
                                Required unless remote work is allowed
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="deadline" className="text-sm font-medium text-white/90">
                                Application deadline
                            </Label>

                            <div className="relative">
                                <Input
                                    id="deadline"
                                    name="deadline"
                                    type="date"
                                    value={form.deadline}
                                    onChange={(e) => set("deadline")(e.target.value)}
                                    className={`${inputClass} pr-10 text-white [color-scheme:dark]`}
                                />

                                <Calendar
                                    aria-hidden
                                    className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-white/60"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Salary Range */}
                    <div className="grid gap-5 sm:grid-cols-[1fr_1fr_auto] sm:items-start">

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="minSalary" className="text-sm font-medium text-white/90">
                                Min salary / rate
                            </Label>

                            <Input
                                id="minSalary"
                                name="minSalary"
                                type="number"
                                min={0}
                                required
                                placeholder="25"
                                value={form.minSalary}
                                onChange={(e) => set("minSalary")(e.target.value)}
                                className={`${inputClass} text-white placeholder:text-white/45`}
                            />
                        </div>           

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="maxSalary" className="text-sm font-medium text-white/90">
                                Max salary / rate
                            </Label>

                            <Input
                                id="maxSalary"
                                name="maxSalary"
                                type="number"
                                min={0}
                                required
                                placeholder="40"
                                value={form.maxSalary}
                                onChange={(e) => set("maxSalary")(e.target.value)}
                                className={`${inputClass} text-white placeholder:text-white/45`}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="salaryFrequency" className="text-sm font-medium text-white/90">
                                Frequency
                            </Label>

                            <Select
                                value={form.salaryFrequency}
                                onValueChange={(value) => set("salaryFrequency")(value ?? "")}
                            >
                                <SelectTrigger
                                    id="salaryFrequency"
                                    className={`${inputClass} w-full text-white`}
                                >
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent className="border-white/10 bg-[#1A1A1F] text-white">
                                    {SALARY_FREQUENCIES.map((frequency) => (
                                        <SelectItem
                                            key={frequency}
                                            value={frequency}
                                            className="text-white focus:bg-white/10 focus:text-white"
                                        >
                                            {frequency}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Responsibilities & Requirements */}
            <section className={sectionClass}>
                <h2 className={sectionHeadingClass}>
                    <span className={sectionBulletClass}>3</span>
                    Responsibilities &amp; Requirements
                </h2>

                <div className="flex flex-col gap-5">

                    {/* Responsibilities */}
                    <div className="flex flex-col gap-2">
                        <Label
                            htmlFor="responsibilities"
                            className="text-sm font-medium text-white/90"
                        >
                            Key responsibilities
                        </Label>

                        <Textarea
                            id="responsibilities"
                            name="responsibilities"
                            required
                            rows={5}
                            maxLength={2000}
                            placeholder="Describe the key responsibilities of the role…"
                            value={form.responsibilities}
                            onChange={(e) => set("responsibilities")(e.target.value)}
                            className={`${inputClass} min-h-32 resize-y text-white placeholder:text-white/45`}
                        />
                    </div>

                    {/* Requirements */}
                    <div className="flex flex-col gap-2">
                        <Label
                            htmlFor="requirements"
                            className="text-sm font-medium text-white/90"
                        >
                            Qualifications &amp; requirements
                        </Label>

                        <Textarea
                            id="requirements"
                            name="requirements"
                            required
                            rows={5}
                            maxLength={2000}
                            placeholder={"• 3+ years of experience with…\n• Solid understanding of…"}
                            value={form.requirements}
                            onChange={(e) => set("requirements")(e.target.value)}
                            className={`${inputClass} min-h-32 resize-y text-white placeholder:text-white/45`}
                        />
                    </div>
                </div>
            </section>

            {/* Submit */}
            <section className="flex flex-col gap-3">
                {error && (
                    <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                        {error}
                    </p>
                )}

                <Button
                    type="submit"
                    form="new-job-form"
                    disabled={isPending}
                    className="w-fit bg-[#5C53FE] text-white hover:bg-[#7B74FF]"
                >
                    {isPending ? (
                        <Loader2 aria-hidden className="animate-spin" />
                    ) : (
                        <Briefcase aria-hidden />
                    )}

                    {isPending ? "Publishing…" : "Publish Job"}
                </Button>
            </section>
        </form>
    </div>
)

}
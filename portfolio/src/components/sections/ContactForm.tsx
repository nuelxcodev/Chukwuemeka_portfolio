"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { SITE } from "@/data/site";

const field =
  "w-full rounded-xl border border-line-strong bg-surface/60 px-4 py-3 text-fg placeholder:text-muted/70 transition-colors focus:border-accent";

/**
 * A recruiter-friendly enquiry form. It has no backend by design: submitting
 * opens the visitor's email app with a drafted message, so nothing is stored
 * or sent through this site.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Opportunity${role ? `: ${role}` : ""}${company ? ` at ${company}` : ""}`;
    const body = [
      `Hi ${SITE.name.split(" ")[0]},`,
      "",
      message || "I came across your portfolio and would like to talk.",
      "",
      name,
      company,
    ]
      .filter((l, i, arr) => l !== "" || arr[i - 1] !== "")
      .join("\n");
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form
      onSubmit={onSubmit}
      className="glass rounded-[2rem] border border-line p-6 md:p-8"
      aria-labelledby="enquiry-title"
    >
      <h3 id="enquiry-title" className="text-2xl font-semibold tracking-tight">
        Send a quick enquiry
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Tell me about the role or project. This opens your email app with a ready-to-send draft, so
        nothing is stored on this site.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Your name
          <input
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={field}
            placeholder="Jane Doe"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Company
          <input
            autoComplete="organization"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={field}
            placeholder="Acme Inc."
          />
        </label>
        <label className="grid gap-2 text-sm font-medium sm:col-span-2">
          Role or project
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={field}
            placeholder="Senior Backend Engineer"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium sm:col-span-2">
          Message
          <textarea
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${field} resize-y`}
            placeholder="A few lines about what you're hiring for or building…"
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-accent-ink transition-transform duration-300 hover:scale-[1.03]"
      >
        Compose email <Send size={16} aria-hidden />
      </button>
    </form>
  );
}

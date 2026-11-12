import { SITE } from "@/data/site";

/** Builds a vCard 3.0 and triggers a download so recruiters can save me in one tap. */
export function downloadVCard() {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Ekine;Chukwuemeka Emmanuel;;;",
    `FN:${SITE.fullName}`,
    `ORG:${SITE.company}`,
    `TITLE:${SITE.role}`,
    ...SITE.phones.map((p) => `TEL;TYPE=CELL:${p.replace(/\s/g, "")}`),
    `EMAIL;TYPE=INTERNET:${SITE.email}`,
    `URL:${SITE.url}`,
    `URL:${SITE.socials.linkedin}`,
    "ADR;TYPE=WORK:;;;Lagos;;;Nigeria",
    "END:VCARD",
  ];
  const blob = new Blob([lines.join("\r\n")], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Chukwuemeka_Ekine.vcf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

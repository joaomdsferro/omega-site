// llms.txt (https://llmstxt.org), built from the same copy as the page so the two never drift.
import type { APIRoute } from "astro";
import { en as t } from "../i18n/en";

export const GET: APIRoute = () => {
  const apps = t.apps
    .map(
      (app) =>
        `### ${app.name}: ${app.title}\n\n${app.body}\n\n` +
        `- Platforms: ${app.platforms}\n` +
        `- Status: ${app.version}\n` +
        `- [Download](${app.download})\n` +
        `- [Source](${app.source})`,
    )
    .join("\n\n");

  const faq = t.faq.items.map((item) => `### ${item.q}\n\n${item.a}`).join("\n\n");

  const facts = t.about.facts.map((fact) => `- ${fact.label}: ${fact.value}`).join("\n");

  const links = t.footer.links.map((link) => `- [${link.label}](${link.href})`).join("\n");

  const body = `# Omega

> ${t.meta.description}

${t.about.first}

${t.intro.statement}

${t.about.second}

${facts}

## Apps

${apps}

## FAQ

${faq}

## Links

${links}

## Optional

- [Home page](https://omega.wisething.app/): the human-facing version of this file
- Credits: ${t.footer.credits}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};

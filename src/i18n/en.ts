// English copy for omega.wisething.app. Other languages copy this shape into their own file.
export const en = {
  lang: "en",
  meta: {
    title: "Omega · small, native, open-source apps by Wisething",
    description:
      "Omega is a family of open-source desktop apps by Wisething. Small, native and private by default. One mark, a colour per app.",
  },
  nav: { apps: "Apps", about: "About", faq: "Questions", source: "Source", action: "Get the apps" },
  hero: {
    // The live Ω in the hero cycles through these. `id` matches an entry in `apps` or "next".
    states: [
      { id: "zap", line: "Teal is Omega Zap: WhatsApp, WhatsApp Business, Signal and Telegram in one native window." },
      { id: "notch", line: "Amber is Omega Notch: your AI coding limits, in a notch." },
      { id: "next", line: "This colour is free. It belongs to the next app." },
    ],
    lead: "Small, native, open-source apps by Wisething. Every app wears the same Ω. Only the colour changes.",
    action: "See the apps",
  },
  intro: {
    statement:
      "Every Omega app runs on your own computer. Nothing goes to a server of ours and all your data is yours and private, as it should be.",
    captions: [
      "Omega Centauri, the largest star cluster in our galaxy, seen by ESO's VLT Survey Telescope.",
      "Its core, by Hubble: about ten million stars, one name.",
      "The same cluster from a backyard in Georgia.",
    ],
  },
  apps: [
    {
      id: "zap",
      name: "Omega Zap",
      title: "Your messengers, one window",
      body:
        "Links to your phone like WhatsApp Web, Signal Desktop or Telegram Desktop, but runs natively: a small Tauri window over a Rust core. History is encrypted on your disk with SQLCipher, the key sits in your desktop keyring, and closed it waits in the tray using a fraction of the memory.",
      platforms: "Linux · .deb, .rpm and AppImage",
      version: "v0.0.x, early test version",
      download: "https://github.com/joaomdsferro/omega-zap/releases",
      source: "https://github.com/joaomdsferro/omega-zap",
    },
    {
      id: "notch",
      name: "Omega Notch",
      title: "Your AI limits, in a notch",
      body:
        "A small notch fused to an edge of your screen. One ring per tool shows how much of its limit is gone, a white arc orbits while a session works, and the ring breathes amber when one is waiting on you. Claude Code, Cursor, Claude Desktop, GitHub Copilot, Codex and Grok Bot.",
      platforms: "macOS 14+ with Homebrew · KDE Plasma 6 on Wayland",
      version: "v0.0.x, early test version",
      download: "https://github.com/joaomdsferro/omega-notch/releases",
      source: "https://github.com/joaomdsferro/omega-notch",
    },
  ],
  appLinks: { download: "Download", source: "Source" },
  about: {
    first:
      "Omega is a family of open-source apps by Wisething and anyone who wants to help. Each one is small, native and private: Rust inside, the desktop's own toolkit outside.",
    second:
      "Ω is the last letter of the Greek alphabet, the symbol for the ohm and the name of the biggest star cluster in the Milky Way. The mark never changes. Each app gets one colour, and keeps it.",
    facts: [
      { label: "Licence", value: "MIT" },
      { label: "Made by", value: "Wisething and contributors" },
      { label: "Apps so far", value: "Two, both in test" },
    ],
  },
  faq: {
    heading: "Before you install",
    items: [
      {
        q: "Do the apps cost anything?",
        a: "No. Every Omega app is free and open source under the MIT licence. There is no account to create and no paid tier.",
      },
      {
        q: "Do they send my data anywhere?",
        a: "Not to us: there is no Omega server. Zap talks to WhatsApp, WhatsApp Business, Signal and Telegram as a linked device. Notch only calls each AI tool's own usage endpoint, with the sign-in that tool already saved.",
      },
      {
        q: "Which systems do they run on?",
        a: "Omega Zap runs on Linux (.deb, .rpm and AppImage). Omega Notch runs on macOS 14 or later and on KDE Plasma 6 under Wayland.",
      },
      {
        q: "Are they ready for everyday use?",
        a: "They are early test versions (v0.0.x). We use them every day, but expect bugs and settings that change between versions.",
      },
      {
        q: "Are they official clients?",
        a: "No. Omega Zap is not affiliated with WhatsApp, Meta, Signal or Telegram, and Omega Notch is not affiliated with Anthropic, Cursor, GitHub, OpenAI or xAI.",
      },
      {
        q: "Can I help, or propose an app?",
        a: "Yes. Each repository has a contributing guide, and issues are open for bugs and ideas. A new app gets the same Ω and a colour of its own.",
      },
    ],
  },
  cta: {
    before: "I'd use an Omega app that",
    placeholder: "reads my RSS feeds",
    // The empty field cycles through these until someone types.
    ideas: ["reads my RSS feeds", "syncs my notes", "plays my music", "watches my servers", "reads my email"],
    button: "Suggest it",
    after: "This opens a GitHub issue with your idea filled in. Nothing is sent until you press submit there.",
  },
  footer: {
    invite: "Pick a colour. Build the next one.",
    yours: "your app?",
    action: "Read the contributing guide",
    links: [
      { label: "GitHub", href: "https://github.com/joaomdsferro" },
      { label: "Omega Zap", href: "https://github.com/joaomdsferro/omega-zap" },
      { label: "Omega Notch", href: "https://github.com/joaomdsferro/omega-notch" },
      { label: "Wisething", href: "https://wisething.app" },
    ],
    credits: "Photographs of Omega Centauri: ESO/INAF-VST/OmegaCAM (CC BY 4.0); ESA/Hubble & NASA, M. Häberle (CC BY 4.0); Stephen Rahn (CC0). Via Wikimedia Commons.",
    legal: "© 2026 Wisething · MIT licence",
  },
};

export type Copy = typeof en;

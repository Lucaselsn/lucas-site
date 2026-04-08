"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Category = "Music Videos" | "Vlogs" | "Show Recaps";

type WorkItem = {
  title: string;
  artist: string;
  year: string;
  link: string;
  category: Category;
  platform: "vimeo" | "youtube";
};

const SHOW_SHOP = false;
const SHOW_SHOW_RECAPS = false;

const allWork: WorkItem[] = [
  {
    title: "2 Seater",
    artist: "Jack London",
    year: "2026",
    link: "https://vimeo.com/1180881347",
    category: "Music Videos",
    platform: "vimeo",
  },
  {
    title: "La Hoes",
    artist: "Sicksisdead",
    year: "2025",
    link: "https://vimeo.com/1180777940",
    category: "Music Videos",
    platform: "vimeo",
  },
  {
    title: "I Need You",
    artist: "xasperwtf",
    year: "2025",
    link: "https://vimeo.com/1180778617",
    category: "Music Videos",
    platform: "vimeo",
  },
  {
    title: "Nobody",
    artist: "msTrim",
    year: "2025",
    link: "https://vimeo.com/1180779048",
    category: "Music Videos",
    platform: "vimeo",
  },
  {
    title: "FANSSS",
    artist: "Sniper2004",
    year: "2025",
    link: "https://vimeo.com/1180780398",
    category: "Music Videos",
    platform: "vimeo",
  },
  {
    title: "2 Da Maxx",
    artist: "Lebxanon x Lil-Shine",
    year: "2024",
    link: "https://vimeo.com/1180881405",
    category: "Music Videos",
    platform: "vimeo",
  },
  {
    title: "Sexyy Red",
    artist: "Marjety",
    year: "2024",
    link: "https://vimeo.com/1180881369",
    category: "Music Videos",
    platform: "vimeo",
  },

  {
    title: "How to make money without a job",
    artist: "geologyshi",
    year: "2025",
    link: "https://www.youtube.com/watch?v=61WiVJQp638",
    category: "Vlogs",
    platform: "youtube",
  },
  {
    title: "I got Robbed on stream",
    artist: "geologyshi",
    year: "2025",
    link: "https://www.youtube.com/watch?v=SlbyExmJjtE",
    category: "Vlogs",
    platform: "youtube",
  },
  {
    title: "Tried to jugg the huzz (gone wrong)",
    artist: "geologyshi",
    year: "2025",
    link: "https://www.youtube.com/watch?v=W41tU3Hsuyk",
    category: "Vlogs",
    platform: "youtube",
  },
  {
    title: "Mom kicked me out again going to LA…",
    artist: "geologyshi",
    year: "2025",
    link: "https://www.youtube.com/watch?v=h5s9sQNa5SI",
    category: "Vlogs",
    platform: "youtube",
  },
  {
    title: "I tried trapping for the first time (gone wrong)",
    artist: "geologyshi",
    year: "2025",
    link: "https://www.youtube.com/watch?v=BF0j2-wIdIc",
    category: "Vlogs",
    platform: "youtube",
  },
  {
    title: "Homeless in NYC (Day 5)",
    artist: "geologyshi",
    year: "2025",
    link: "https://www.youtube.com/watch?v=264xv_aIKsQ",
    category: "Vlogs",
    platform: "youtube",
  },
  {
    title: "Homeless in NYC (Day 1)",
    artist: "geologyshi",
    year: "2025",
    link: "https://www.youtube.com/watch?v=rUrtFiR0vV8",
    category: "Vlogs",
    platform: "youtube",
  },
  {
    title: "Homeless in NYC (Day 2)",
    artist: "geologyshi",
    year: "2025",
    link: "https://www.youtube.com/watch?v=6TOHJP1d6EE",
    category: "Vlogs",
    platform: "youtube",
  },
  {
    title: "Homeless in NYC (Day 3)",
    artist: "geologyshi",
    year: "2025",
    link: "https://www.youtube.com/watch?v=N_Ok0Jw5XwM",
    category: "Vlogs",
    platform: "youtube",
  },
  {
    title: "Homeless In NYC (Day 4)",
    artist: "geologyshi",
    year: "2025",
    link: "https://www.youtube.com/watch?v=54gpN5zwLcQ",
    category: "Vlogs",
    platform: "youtube",
  },

  {
    title: "Show Recap 01",
    artist: "lucaselsn",
    year: "2025",
    link: "https://www.youtube.com/watch?v=DCqJdcf2ZGw",
    category: "Show Recaps",
    platform: "youtube",
  },
];

const tabs = SHOW_SHOW_RECAPS
  ? (["Music Videos", "Vlogs", "Show Recaps"] as const)
  : (["Music Videos", "Vlogs"] as const);

type Tab = (typeof tabs)[number];

function getYouTubeId(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);
  return match?.[1] ?? "";
}

function getVimeoId(url: string) {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match?.[1] ?? "";
}

function VimeoCard({ item }: { item: WorkItem }) {
  const vimeoId = getVimeoId(item.link);

  return (
    <a href={item.link} target="_blank" rel="noreferrer" className="group block">
      <div className="relative aspect-video overflow-hidden rounded-[1.5rem] bg-black">
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0`}
          className="h-full w-full transition duration-700 group-hover:scale-[1.01]"
          loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={item.title}
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10 transition duration-500 group-hover:ring-white/20" />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm uppercase tracking-[0.22em] text-white/60 transition group-hover:text-white">
          Open on Vimeo
        </p>
      </div>
    </a>
  );
}

function YouTubeHoverCard({
  item,
  hoveredId,
  setHoveredId,
}: {
  item: WorkItem;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}) {
  const youtubeId = getYouTubeId(item.link);
  const isHovered = hoveredId === youtubeId;
  const thumb = `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;
  const fallbackThumb = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noreferrer"
      className="group block"
      onMouseEnter={() => setHoveredId(youtubeId)}
      onMouseLeave={() => setHoveredId(null)}
    >
      <div className="relative aspect-video overflow-hidden rounded-[1.5rem] bg-black">
        {!isHovered ? (
          <img
            src={thumb}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = fallbackThumb;
            }}
            alt={item.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
          />
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=${youtubeId}`}
            className="h-full w-full"
            allow="autoplay; fullscreen; picture-in-picture"
            title={item.title}
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/35" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10 transition duration-500 group-hover:ring-white/20" />

        {!isHovered && (
          <div className="pointer-events-none absolute bottom-5 right-5 rounded-full border border-white/15 bg-black/45 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/75 backdrop-blur">
            Hover to Preview
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm uppercase tracking-[0.22em] text-white/60 transition group-hover:text-white">
          Open on YouTube
        </p>
      </div>
    </a>
  );
}

export default function WorkPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Music Videos");
  const [hoveredYouTubeId, setHoveredYouTubeId] = useState<string | null>(null);

  const filteredWork = useMemo(() => {
    return [...allWork]
      .filter((item) => {
        if (!SHOW_SHOW_RECAPS && item.category === "Show Recaps") return false;
        return item.category === activeTab;
      })
      .sort((a, b) => Number(b.year) - Number(a.year));
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <nav className="flex gap-6 text-xs uppercase tracking-[0.25em]">
            <Link href="/work" className="text-white">
              Work
            </Link>
            <Link href="/about" className="text-white/70 hover:text-white">
              About
            </Link>
          </nav>

          <Link
            href="/"
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          >
            <div className="flex h-20 w-[180px] items-center justify-center overflow-hidden sm:w-[300px] md:h-32 md:w-[520px]">
  <video
    autoPlay
    muted
    playsInline
    className="max-h-full max-w-full object-contain"
  >
    <source src="/logo-transparent.webm" type="video/webm" />
  </video>
</div>
          </Link>

          <nav className="flex gap-6 text-xs uppercase tracking-[0.25em]">
            {SHOW_SHOP && (
              <Link href="/shop" className="text-white/70 hover:text-white">
                Shop
              </Link>
            )}
            <Link href="/contact" className="text-white/70 hover:text-white">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-6 pb-24 pt-[140px]">
        <div className="mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Selected Work
          </p>
          <h1 className="mt-4 text-5xl font-medium tracking-[-0.06em] md:text-8xl">
            Archive
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60 md:text-base">
            A curated selection of music videos and vlogs.
          </p>
        </div>

        <div className="mb-14">
          <div className="inline-flex flex-wrap gap-2 rounded-full border border-white/10 bg-white/[0.03] p-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative rounded-full px-5 py-3 text-xs uppercase tracking-[0.22em] transition ${
                    isActive ? "text-black" : "text-white/65 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="work-tab-pill"
                      className="absolute inset-0 rounded-full bg-white"
                      transition={{ type: "spring", stiffness: 280, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.25 }}
            className="space-y-20"
          >
            {filteredWork.map((item) => (
              <div
                key={`${item.category}-${item.link}`}
                className="border-t border-white/10 pt-10"
              >
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-white/50">
                      {item.artist}
                    </p>
                    <h2 className="mt-3 text-4xl font-medium tracking-[-0.05em] md:text-6xl">
                      {item.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="text-sm uppercase tracking-[0.22em] text-white/45">
                      {item.year}
                    </p>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/50">
                      {item.category}
                    </span>
                  </div>
                </div>

                {item.platform === "vimeo" ? (
                  <VimeoCard item={item} />
                ) : (
                  <YouTubeHoverCard
                    item={item}
                    hoveredId={hoveredYouTubeId}
                    setHoveredId={setHoveredYouTubeId}
                  />
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
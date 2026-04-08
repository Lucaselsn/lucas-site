"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

type VideoItem = {
  title: string;
  artist: string;
  year: string;
  vimeo: string;
};

function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function HomePage() {
  const SHOW_SHOP = false;
  const HERO_SWITCH_MS = 7000;
  const HEADER_HEIGHT = 110;

  const portfolioVideos: VideoItem[] = useMemo(() => {
    const items: VideoItem[] = [
      {
        title: "2 Seater",
        artist: "Jack London",
        year: "2026",
        vimeo: "1180881347",
      },
      {
        title: "La Hoes",
        artist: "Sicksisdead",
        year: "2025",
        vimeo: "1180777940",
      },
      {
        title: "I Need You",
        artist: "xasperwtf",
        year: "2025",
        vimeo: "1180778617",
      },
      {
        title: "Nobody",
        artist: "msTrim",
        year: "2025",
        vimeo: "1180779048",
      },
      {
        title: "FANSSS",
        artist: "Sniper2004",
        year: "2025",
        vimeo: "1180780398",
      },
      {
        title: "2 Da Maxx",
        artist: "Lebxanon x Lil-Shine",
        year: "2024",
        vimeo: "1180881405",
      },
      {
        title: "Sexyy Red",
        artist: "Marjety",
        year: "2024",
        vimeo: "1180881369",
      },
    ];

    return items.sort((a, b) => Number(b.year) - Number(a.year));
  }, []);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 22,
    mass: 0.5,
  });

  const heroScale = useTransform(smoothProgress, [0, 0.12], [1, 0.985]);

  const [bag, setBag] = useState<VideoItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const initializedRef = useRef(false);

  useEffect(() => {
    const shuffled = shuffleArray(portfolioVideos);
    setBag(shuffled);
    setCurrentIndex(0);
    initializedRef.current = true;
  }, [portfolioVideos]);

  useEffect(() => {
    if (!initializedRef.current || bag.length === 0) return;

    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        if (next < bag.length) return next;
        setBag(shuffleArray(portfolioVideos));
        return 0;
      });
    }, HERO_SWITCH_MS);

    return () => window.clearInterval(timer);
  }, [bag, portfolioVideos]);

  const heroVideo = bag[currentIndex] ?? portfolioVideos[0];

  return (
    <div className="min-h-screen bg-black text-white">
      <motion.div
        style={{ scaleX: smoothProgress }}
        className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-white"
      />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
        <div
          className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6"
          style={{ minHeight: `${HEADER_HEIGHT}px` }}
        >
          <nav className="flex gap-6 text-xs uppercase tracking-[0.25em]">
            <Link href="/work" className="text-white/70 transition hover:text-white">
              Work
            </Link>
            <Link href="/about" className="text-white/70 transition hover:text-white">
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
              <Link href="/shop" className="text-white/70 transition hover:text-white">
                Shop
              </Link>
            )}
            <Link href="/contact" className="text-white/70 transition hover:text-white">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main style={{ paddingTop: `${HEADER_HEIGHT}px` }}>
        <section
          className="relative overflow-hidden"
          style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
        >
          <motion.div style={{ scale: heroScale }} className="absolute inset-0 bg-black">
            <iframe
              src={`https://player.vimeo.com/video/${heroVideo.vimeo}?background=1&autoplay=1&muted=1&loop=1&autopause=0&title=0&byline=0&portrait=0&quality=720p`}
              className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
              allow="autoplay; fullscreen; picture-in-picture"
              title={`Hero video ${heroVideo.title}`}
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/75" />

          <div className="relative flex h-full items-end px-8 pb-12">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.32em] text-white/65">
                Now Showing
              </p>

              <motion.div
                key={`${heroVideo.title}-${heroVideo.artist}-${heroVideo.year}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="mb-8"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                  {heroVideo.artist} • {heroVideo.year}
                </p>
                <h1 className="mt-3 text-5xl font-medium tracking-[-0.05em] sm:text-6xl md:text-7xl">
                  {heroVideo.title}
                </h1>
              </motion.div>

              <div className="mt-6 flex gap-3">
                <Link
                  href="/work"
                  className="bg-white px-5 py-3 text-sm uppercase text-black"
                >
                  Work
                </Link>
                <Link
                  href="/contact"
                  className="border px-5 py-3 text-sm uppercase"
                >
                  Contact
                </Link>
                {SHOW_SHOP && (
                  <Link
                    href="/shop"
                    className="border px-5 py-3 text-sm uppercase"
                  >
                    Shop
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {portfolioVideos.map((video, i) => (
          <section
            key={`${video.vimeo}-${i}`}
            className="relative h-screen overflow-hidden border-t border-white/10"
          >
            <Link href="/work" className="group block h-full w-full">
              <iframe
                src={`https://player.vimeo.com/video/${video.vimeo}?background=1&autoplay=1&muted=1&loop=1&autopause=0&title=0&byline=0&portrait=0&quality=720p`}
                className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 transition duration-700 group-hover:scale-[1.015]"
                allow="autoplay; fullscreen; picture-in-picture"
                title={video.title}
              />

              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80 transition duration-500 group-hover:from-black/5 group-hover:to-black/70" />

              <div className="absolute bottom-10 left-10">
                <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                  {video.artist} • {video.year}
                </p>
                <h2 className="text-5xl font-medium tracking-[-0.05em]">
                  {video.title}
                </h2>
              </div>
            </Link>
          </section>
        ))}
      </main>
    </div>
  );
}
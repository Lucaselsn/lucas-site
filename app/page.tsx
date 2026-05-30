"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

type VideoItem = {
  title: string;
  artist: string;
  year: string;
  src: string;
  poster: string;
};

function LazyVideo({ src, poster, className }: { src: string; poster: string; className: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Load just before it enters the viewport, then play/pause as it
    // scrolls in and out — saves battery, CPU and mobile data.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      muted
      playsInline
      loop
      poster={poster}
      preload={shouldLoad ? "auto" : "none"}
      src={shouldLoad ? src : undefined}
      className={className}
    />
  );
}

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
      { title: "2 Seater", artist: "Jack London", year: "2026", src: "/clips/2-seater.mp4", poster: "/clips/2-seater.jpg" },
      { title: "La Hoes", artist: "Sicksisdead", year: "2025", src: "/clips/la-hoes.mp4", poster: "/clips/la-hoes.jpg" },
      { title: "I Need You", artist: "xasperwtf", year: "2025", src: "/clips/i-need-you.mp4", poster: "/clips/i-need-you.jpg" },
      { title: "Nobody", artist: "msTrim", year: "2025", src: "/clips/nobody.mp4", poster: "/clips/nobody.jpg" },
      { title: "FANSSS", artist: "Sniper2004", year: "2025", src: "/clips/fansss.mp4", poster: "/clips/fansss.jpg" },
      { title: "2 Da Maxx", artist: "Lebxanon x Lil-Shine", year: "2024", src: "/clips/2-da-maxx.mp4", poster: "/clips/2-da-maxx.jpg" },
      { title: "Sexyy Red", artist: "Marjety", year: "2024", src: "/clips/sexyy-red.mp4", poster: "/clips/sexyy-red.jpg" },
      { title: "Who Ain't Into Fashion", artist: "Slimeballchrissy", year: "2026", src: "/clips/who-aint-into-fashion.mp4", poster: "/clips/who-aint-into-fashion.jpg" },
      { title: "Ok Cool", artist: "Spida", year: "2026", src: "/clips/ok-cool.mp4", poster: "/clips/ok-cool.jpg" },
    ];
    return items.sort((a, b) => Number(b.year) - Number(a.year));
  }, []);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 85, damping: 22, mass: 0.5 });
  const heroScale = useTransform(smoothProgress, [0, 0.12], [1, 0.985]);

  const [heroVideo, setHeroVideo] = useState<VideoItem>(portfolioVideos[0]);
  const [activeSlot, setActiveSlot] = useState<0 | 1>(0);
  const videoRefs = useRef<[HTMLVideoElement | null, HTMLVideoElement | null]>([null, null]);
  const bagRef = useRef<VideoItem[]>([]);
  const indexRef = useRef(0);
  const activeSlotRef = useRef<0 | 1>(0);

  // Init: play first in slot 0, preload second into slot 1
  useEffect(() => {
    const shuffled = shuffleArray(portfolioVideos);
    bagRef.current = shuffled;
    indexRef.current = 0;
    setHeroVideo(shuffled[0]);

    const v0 = videoRefs.current[0];
    const v1 = videoRefs.current[1];
    if (v0) {
      v0.src = shuffled[0].src;
      v0.load();
      v0.play().catch(() => {});
    }
    if (v1 && shuffled[1]) {
      v1.src = shuffled[1].src;
      v1.load(); // buffer next, stays paused + hidden
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Rotate every HERO_SWITCH_MS
  useEffect(() => {
    const timer = window.setInterval(() => {
      const bag = bagRef.current;
      if (!bag.length) return;

      const current = activeSlotRef.current;
      const incoming: 0 | 1 = current === 0 ? 1 : 0;

      const nextIdx = (indexRef.current + 1) % bag.length;
      if (nextIdx === 0) bagRef.current = shuffleArray(portfolioVideos);
      indexRef.current = nextIdx;

      const nextVideo = bagRef.current[nextIdx];
      const afterNext = bagRef.current[(nextIdx + 1) % bagRef.current.length];

      const inVid = videoRefs.current[incoming];
      const outVid = videoRefs.current[current];
      if (!inVid) return;

      // Only crossfade once the incoming video is genuinely playing — no black frame
      const reveal = () => {
        setHeroVideo(nextVideo);
        setActiveSlot(incoming);
        activeSlotRef.current = incoming;

        // After the fade, repurpose the old slot to preload the upcoming clip
        window.setTimeout(() => {
          if (outVid) {
            outVid.pause();
            if (afterNext) {
              outVid.src = afterNext.src;
              outVid.load();
            }
          }
        }, 800);
      };

      inVid.currentTime = 0;
      const playPromise = inVid.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.then(reveal).catch(reveal);
      } else {
        reveal();
      }
    }, HERO_SWITCH_MS);
    return () => window.clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <Link href="/work" className="text-white/70 transition hover:text-white">Work</Link>
            <Link href="/about" className="text-white/70 transition hover:text-white">About</Link>
          </nav>

          <Link
            href="/"
            className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          >
            <div className="flex h-16 w-[140px] items-center justify-center overflow-hidden sm:w-[220px] md:h-32 md:w-[520px]">
              <img src="/logo2.png" alt="Logo" className="max-h-full max-w-full object-contain md:hidden" />
              <video autoPlay muted playsInline loop className="hidden max-h-full max-w-full object-contain md:block">
                <source src="/logo-transparent.webm" type="video/webm" />
              </video>
            </div>
          </Link>

          <nav className="flex gap-6 text-xs uppercase tracking-[0.25em]">
            {SHOW_SHOP && (
              <Link href="/shop" className="text-white/70 transition hover:text-white">Shop</Link>
            )}
            <Link href="/contact" className="text-white/70 transition hover:text-white">Contact</Link>
          </nav>
        </div>
      </header>

      <main style={{ paddingTop: `${HEADER_HEIGHT}px` }}>
        {/* Hero */}
        <section
          className="relative overflow-hidden"
          style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
        >
          <motion.div style={{ scale: heroScale }} className="absolute inset-0 bg-black">
            {([0, 1] as const).map((slot) => (
              <video
                key={slot}
                ref={(el) => { videoRefs.current[slot] = el; }}
                muted
                playsInline
                loop
                preload="auto"
                poster={slot === 0 ? portfolioVideos[0].poster : undefined}
                className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-700 ease-in-out"
                style={{ opacity: activeSlot === slot ? 1 : 0 }}
              />
            ))}
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/75" />

          <div className="relative flex h-full items-end px-8 pb-12">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.32em] text-white/65">Now Showing</p>

              <motion.div
                key={`${heroVideo.title}-${heroVideo.artist}`}
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
                <Link href="/work" className="bg-white px-5 py-3 text-sm uppercase text-black">Work</Link>
                <Link href="/contact" className="border px-5 py-3 text-sm uppercase">Contact</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Scroll sections */}
        {portfolioVideos.map((video, i) => (
          <section
            key={`${video.src}-${i}`}
            className="relative h-screen overflow-hidden border-t border-white/10"
          >
            <Link href="/work" className="group block h-full w-full">
              <LazyVideo
                src={video.src}
                poster={video.poster}
                className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 object-cover transition duration-700 group-hover:scale-[1.015]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80 transition duration-500 group-hover:from-black/5 group-hover:to-black/70" />
              <div className="absolute bottom-10 left-10">
                <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                  {video.artist} • {video.year}
                </p>
                <h2 className="text-5xl font-medium tracking-[-0.05em]">{video.title}</h2>
              </div>
            </Link>
          </section>
        ))}
      </main>
    </div>
  );
}

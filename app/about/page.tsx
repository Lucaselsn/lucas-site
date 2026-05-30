import Link from "next/link";

const SHOW_SHOP = false;

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <nav className="flex gap-6 text-xs uppercase tracking-[0.25em]">
            <Link href="/work" className="text-white/70 hover:text-white">Work</Link>
            <Link href="/about" className="text-white">About</Link>
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
              <Link href="/shop" className="text-white/70 hover:text-white">Shop</Link>
            )}
            <Link href="/contact" className="text-white/70 hover:text-white">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-0 pt-[140px]">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">About</p>

        <h1 className="mt-4 text-4xl font-medium tracking-[-0.05em] md:text-6xl">
          lucaselsn
        </h1>

        <div className="mt-12 grid gap-16 md:grid-cols-2">
          <div className="space-y-6 text-base leading-8 text-white/70">
            <p>
              I&apos;m Lucas, a director from Los Angeles. I&apos;m 18 and I split my time between LA and Atlanta, where I go to school. I&apos;ve been building this since before I had a real reason to.
            </p>
            <p>
              My work lives in music videos and visual storytelling. I care about atmosphere, pacing, and making sure every frame feels intentional, not just something to fill a timeline.
            </p>
            <p>
              I&apos;ve worked with artists across both coasts, from independent projects to videos that have reached real audiences. Every project I take on gets the same level of attention regardless of the budget.
            </p>
          </div>

          <div className="space-y-6 text-base leading-8 text-white/70">
            <p>
              Being in Atlanta puts me close to some of the most exciting music coming out right now. Being from LA shapes how I see things. The combination is where my style comes from.
            </p>
            <p>
              I&apos;m involved in the full process, concept, pre-production, on-set direction, and the edit. I don&apos;t hand things off and walk away. The vision carries through to the final cut.
            </p>
            <p>
              Still early. Every project builds on the last.
            </p>
          </div>
        </div>

        <div className="mt-16 flex gap-4 border-t border-white/10 pt-12 pb-24">
          <Link href="/work" className="bg-white px-6 py-3 text-sm uppercase text-black">
            View Work
          </Link>
          <Link href="/contact" className="border border-white/20 px-6 py-3 text-sm uppercase text-white/70 hover:text-white">
            Get in Touch
          </Link>
        </div>
      </main>

      {/* Photo at bottom */}
      <div className="w-full">
        <img
          src="/about.jpeg"
          alt="Lucas"
          className="w-full max-h-[90vh] object-cover object-top"
        />
      </div>
    </div>
  );
}

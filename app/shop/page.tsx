import Link from "next/link";

const products = [
  {
    name: "Director Tee",
    price: "$45",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Photo Zine",
    price: "$28",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function ShopPage() {
  const SHOW_SHOP = false;

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <nav className="flex gap-6 text-xs uppercase tracking-[0.25em]">
            <Link href="/work" className="text-white/70 hover:text-white">
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
           <div className="flex h-16 w-[140px] items-center justify-center overflow-hidden sm:w-[220px] md:h-32 md:w-[520px]">
  {/* Static image on mobile, video on desktop */}
  <img
    src="/logo.png"
    alt="Logo"
    className="max-h-full max-w-full object-contain md:hidden"
  />
  <video
    autoPlay
    muted
    playsInline
    loop
    className="hidden max-h-full max-w-full object-contain md:block"
  >
    <source src="/logo-transparent.webm" type="video/webm" />
  </video>
</div>
</Link>

          <nav className="flex gap-6 text-xs uppercase tracking-[0.25em]">
            {SHOW_SHOP && (
              <Link href="/shop" className="text-white">
                Shop
              </Link>
            )}
            <Link href="/contact" className="text-white/70 hover:text-white">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-16 pt-[140px]">
        <p className="text-xs uppercase tracking-[0.3em] text-white/55">
          Shop
        </p>
        <h1 className="mt-3 text-4xl tracking-[-0.05em] md:text-7xl">
          Products.
        </h1>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {products.map((product) => (
            <div
              key={product.name}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-5 md:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl tracking-[-0.04em]">
                      {product.name}
                    </h2>
                    <p className="mt-1 text-sm text-white/55">
                      Limited release
                    </p>
                  </div>
                  <p className="text-sm text-white/72">{product.price}</p>
                </div>
                <button className="mt-5 w-full rounded-full bg-white px-4 py-3 text-sm uppercase tracking-[0.18em] text-black transition hover:bg-white/85">
                  Coming Soon
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
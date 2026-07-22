export default function MorisClothingsLandingPage() {
  const products = [
    {
      name: "Classic T-Shirt",
      price: "£25",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Elegant Hoodie",
      price: "£45",
      image:
        "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Stylish Jacket",
      price: "£65",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Casual Trouser",
      price: "£35",
      image:
        "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* HEADER */}
      <header className="border-b border-white/10 bg-neutral-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold">Moris Clothings</h1>

          <div className="text-sm text-neutral-300">
            WhatsApp: +44 7440 092312
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="px-6 py-16 text-center">
        <h2 className="text-4xl font-bold md:text-5xl">
          Wear Confidence. Wear Moris.
        </h2>
        <p className="mt-4 text-neutral-300">
          Premium clothing made for everyday style.
        </p>

        <a
          href="https://wa.me/447440092312"
          className="mt-6 inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold"
        >
          Chat on WhatsApp
        </a>
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.name}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-72 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-neutral-300">{product.price}</p>

              <a
                href="https://wa.me/447440092312?text=I%20want%20to%20order%20a%20product"
                className="mt-3 block rounded-lg bg-green-600 px-4 py-2 text-center text-sm font-semibold"
              >
                Order via WhatsApp
              </a>

              <a
                href="https://buy.stripe.com/YOUR_STRIPE_PAYMENT_LINK"
                target="_blank"
                rel="noreferrer"
                className="mt-2 block rounded-lg border border-white/20 px-4 py-2 text-center text-sm"
              >
                Pay with Stripe
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* CONTACT */}
      <section className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <h3 className="text-2xl font-bold">Contact</h3>

          <div className="mt-4 space-y-2 text-neutral-300">
            <p>WhatsApp: +44 7440 092312</p>
            <p>Email: moris.era@yahoo.com</p>
            <p>Instagram: Add your Instagram handle</p>
          </div>
        </div>
      </section>
    </div>
  );
}

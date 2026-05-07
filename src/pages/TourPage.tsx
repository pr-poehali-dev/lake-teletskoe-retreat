import { useRef, useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

export interface TourStat {
  icon: string;
  value: string;
  label: string;
}

export interface TourFeature {
  icon: string;
  title: string;
  description: string;
}

export interface TourPageData {
  slug: string;
  name: string;
  tagline: string;
  heroImage: string;
  description: string[];
  stats: TourStat[];
  features: TourFeature[];
  programTitle: string;
  programDays: { day: string; items: string[] }[];
  prices: { label: string; value: string; note?: string }[];
  includes: string[];
  notIncludes: string[];
  gallery: string[];
}

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

function WaveDivider({ colorClass = "fill-white" }: { colorClass?: string }) {
  return (
    <div className="w-full overflow-hidden leading-none" style={{ marginBottom: "-2px" }}>
      <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="w-full h-10 md:h-14">
        <path d="M0,28 C360,56 720,0 1080,28 C1260,42 1380,14 1440,28 L1440,56 L0,56 Z" className={colorClass} />
      </svg>
    </div>
  );
}

export default function TourPage({ data }: { data: TourPageData }) {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-mist font-golos overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="glass-card border-b border-forest-200/40 px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <a href="/" className="font-display text-2xl text-forest-800 italic tracking-wide">
              Туры на Алтай
            </a>
            <a href="/" className="flex items-center gap-2 text-forest-600 hover:text-forest-500 transition-colors text-sm">
              <Icon name="ArrowLeft" size={16} />
              Все направления
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img src={data.heroImage} alt={data.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/65" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-sage-200 text-xs tracking-[0.4em] uppercase mb-3">Алтай · 2025</p>
          <h1 className="font-display text-white text-5xl md:text-7xl font-light italic mb-3" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}>
            {data.name}
          </h1>
          <p className="font-display text-sage-100 text-xl md:text-2xl font-light italic" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}>
            {data.tagline}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <WaveDivider colorClass="fill-mist" />
        </div>
      </section>

      {/* ABOUT — описание + плашки */}
      <section className="py-20 px-6 bg-mist">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-4xl md:text-5xl text-forest-800 italic font-light text-center mb-14">
              {data.programTitle}
            </h2>
          </AnimatedSection>

          {/* Текст + 4 плашки-статы */}
          <div className="grid md:grid-cols-2 gap-12 items-start mb-14">
            <AnimatedSection>
              <div className="space-y-5 text-forest-700 leading-relaxed text-[1.05rem]">
                {data.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <div className="grid grid-cols-2 gap-4">
                {data.stats.map((stat) => (
                  <div key={stat.label} className="nature-card rounded-2xl p-6 text-center flex flex-col items-center gap-3">
                    <Icon name={stat.icon} size={28} className="text-forest-400" />
                    <div>
                      <div className="font-display text-xl text-forest-800 italic font-semibold">{stat.value}</div>
                      <div className="text-xs text-sage-500 mt-0.5">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* 3 плашки-фичи */}
          <AnimatedSection delay={150}>
            <div className="grid md:grid-cols-3 gap-5">
              {data.features.map((feat) => (
                <div key={feat.title} className="nature-card rounded-2xl p-6">
                  <Icon name={feat.icon} size={24} className="text-forest-400 mb-3" />
                  <p className="font-display text-lg text-forest-700 italic mb-2">{feat.title}</p>
                  <p className="text-sm text-forest-600 leading-relaxed">{feat.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Wave → программа */}
      <div className="bg-mist">
        <WaveDivider colorClass="fill-white" />
      </div>

      {/* ПРОГРАММА */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <p className="text-sage-500 text-xs tracking-[0.4em] uppercase mb-3">Маршрут</p>
            <h2 className="font-display text-4xl md:text-5xl text-forest-800 italic font-light">Программа тура</h2>
          </AnimatedSection>

          <div className="space-y-4">
            {data.programDays.map((d, idx) => (
              <AnimatedSection key={d.day} delay={idx * 60}>
                <div className="border border-forest-100 rounded-2xl overflow-hidden">
                  <div className="bg-forest-50 px-6 py-3 flex items-center gap-3">
                    <div className="w-7 h-7 bg-forest-600 text-white rounded-full flex items-center justify-center text-xs font-semibold shrink-0">
                      {idx + 1}
                    </div>
                    <span className="font-medium text-forest-800 text-sm">{d.day}</span>
                  </div>
                  <div className="px-6 py-4">
                    <ul className="space-y-2">
                      {d.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-forest-700">
                          <Icon name="Check" size={14} className="text-forest-400 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Wave → цены */}
      <div className="bg-white">
        <WaveDivider colorClass="fill-forest-50" />
      </div>

      {/* ЦЕНЫ + ЧТО ВКЛЮЧЕНО */}
      <section className="py-20 px-6 bg-forest-50">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <p className="text-sage-500 text-xs tracking-[0.4em] uppercase mb-3">Стоимость</p>
            <h2 className="font-display text-4xl md:text-5xl text-forest-800 italic font-light">Цены и включения</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Цены */}
            <AnimatedSection>
              <div className="bg-white rounded-3xl p-7 border border-forest-100 shadow-sm">
                <h3 className="font-display text-xl text-forest-800 italic mb-5">Стоимость участия</h3>
                <div className="space-y-4">
                  {data.prices.map((p) => (
                    <div key={p.label} className="flex items-start justify-between gap-4 pb-4 border-b border-forest-50 last:border-0 last:pb-0">
                      <div>
                        <div className="text-forest-700 text-sm font-medium">{p.label}</div>
                        {p.note && <div className="text-sage-400 text-xs mt-0.5">{p.note}</div>}
                      </div>
                      <div className="font-display text-xl text-forest-800 italic whitespace-nowrap">{p.value}</div>
                    </div>
                  ))}
                </div>
                <a href="#contact-tour" className="mt-6 block w-full bg-forest-600 text-white text-center py-3.5 rounded-2xl hover:bg-forest-500 transition-colors text-sm font-medium">
                  Записаться на тур
                </a>
              </div>
            </AnimatedSection>

            {/* Включено / не включено */}
            <AnimatedSection delay={100}>
              <div className="space-y-5">
                <div className="bg-white rounded-3xl p-6 border border-forest-100 shadow-sm">
                  <h3 className="font-display text-xl text-forest-800 italic mb-4">Включено в стоимость</h3>
                  <ul className="space-y-2">
                    {data.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-forest-700">
                        <Icon name="CheckCircle" size={15} className="text-forest-500 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-3xl p-6 border border-forest-100 shadow-sm">
                  <h3 className="font-display text-xl text-forest-800 italic mb-4">Оплачивается отдельно</h3>
                  <ul className="space-y-2">
                    {data.notIncludes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-sage-500">
                        <Icon name="Minus" size={15} className="text-sage-400 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Wave → галерея */}
      <div className="bg-forest-50">
        <WaveDivider colorClass="fill-white" />
      </div>

      {/* ГАЛЕРЕЯ */}
      {data.gallery.length > 0 && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection className="text-center mb-10">
              <h2 className="font-display text-4xl text-forest-800 italic font-light">Галерея</h2>
            </AnimatedSection>
            <AnimatedSection>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {data.gallery.map((img, i) => (
                  <div key={i} className={`rounded-2xl overflow-hidden ${i === 0 ? "col-span-2 h-64 md:h-80" : "h-40 md:h-52"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Wave → форма */}
      <div className="bg-white">
        <WaveDivider colorClass="fill-forest-900" />
      </div>

      {/* ФОРМА */}
      <section id="contact-tour" className="py-20 px-6 bg-forest-900">
        <div className="max-w-md mx-auto">
          <AnimatedSection className="text-center mb-10">
            <p className="text-sage-400 text-xs tracking-[0.4em] uppercase mb-3">Бронирование</p>
            <h2 className="font-display text-4xl text-white italic font-light mb-2">Записаться</h2>
            <p className="text-sage-400 text-sm">Оставьте заявку — мы свяжемся и подтвердим место</p>
          </AnimatedSection>

          <AnimatedSection>
            {submitted ? (
              <div className="glass-card rounded-3xl p-12 text-center border-forest-600/30">
                <div className="w-14 h-14 bg-forest-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle" size={28} className="text-forest-300" />
                </div>
                <h3 className="font-display text-2xl text-white italic mb-2">Заявка принята!</h3>
                <p className="text-sage-400 text-sm">Мы свяжемся с вами в ближайшее время</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ваше имя"
                    className="w-full bg-forest-800 border border-forest-600 rounded-xl px-4 py-3 text-white placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Телефон или WhatsApp"
                    className="w-full bg-forest-800 border border-forest-600 rounded-xl px-4 py-3 text-white placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent transition"
                  />
                </div>
                <input type="hidden" value={data.name} />
                <button
                  type="submit"
                  className="w-full bg-forest-500 text-white py-4 rounded-xl hover:bg-forest-400 transition-colors text-sm font-medium tracking-wide"
                >
                  Отправить заявку
                </button>
                <p className="text-center text-forest-500 text-xs">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
              </form>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="tel:+79999999999" className="flex items-center gap-2 text-sage-400 hover:text-sage-200 transition-colors">
                <Icon name="Phone" size={15} />
                <span className="text-sm">+7 (999) 999-99-99</span>
              </a>
              <span className="hidden sm:block text-forest-600">·</span>
              <a href="https://t.me/username" className="flex items-center gap-2 text-sage-400 hover:text-sage-200 transition-colors">
                <Icon name="MessageCircle" size={15} />
                <span className="text-sm">Telegram</span>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-forest-900 border-t border-forest-800 text-sage-600 py-6 px-6 text-center">
        <p className="text-xs">© 2025 · Туры на Алтай · <a href="/" className="hover:text-sage-400 transition-colors">На главную</a></p>
      </footer>
    </div>
  );
}

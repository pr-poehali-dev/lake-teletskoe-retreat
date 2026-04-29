import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGES = [
  "https://cdn.poehali.dev/projects/57811b6b-1488-4a1d-9096-b19e0c95f400/files/64840ed8-d4a6-44a5-ba9e-313c7618e494.jpg",
  "https://cdn.poehali.dev/projects/57811b6b-1488-4a1d-9096-b19e0c95f400/files/1397c4f4-180f-4a10-bdb7-27d0820e34ca.jpg",
  "https://cdn.poehali.dev/projects/57811b6b-1488-4a1d-9096-b19e0c95f400/files/7cbb5b0d-ee1a-4e38-9193-3a7183ce993e.jpg",
];

const TOURS = [
  {
    id: 1,
    name: "Телецкое озеро",
    subtitle: "Место силы",
    dates: "19–22 июня",
    duration: "4 дня",
    emoji: "🏔️",
    badge: "Место силы",
    badgeColor: "bg-forest-100 text-forest-700",
    description:
      "Одно из величайших озёр России — «Алтайское море», внесённое в список ЮНЕСКО. Кристально чистая вода глубиной 325 метров, водопад Корбу, исчезающий источник. Место, где время останавливается и открывается что-то важное внутри.",
    includes: [
      "🛥️ Прогулка на корабле по озеру",
      "💧 Водопад Корбу",
      "🌿 Исчезающий источник",
      "🏡 Домики на берегу",
      "🍽️ 3-разовое питание",
      "🧘 Авторские медитации",
    ],
    prices: { group: "от 40 000 ₽", individual: "от 36 000 ₽", reboot: "от 50 000 ₽" },
    note: "Трансфер из Горно-Алтайска включён",
  },
  {
    id: 2,
    name: "Остров Патмос",
    subtitle: "Тишина и благодать",
    dates: "12–14 июня",
    duration: "3 дня",
    emoji: "⛪",
    badge: "Духовный",
    badgeColor: "bg-sage-100 text-sage-600",
    description:
      "Маленький скалистый остров на реке Катунь с древним православным храмом Иоанна Богослова. Добраться можно только по подвесному мосту — захватывает дух. Место удивительного покоя и внутренней тишины среди бурных горных вод.",
    includes: [
      "🚌 Трансфер из Горно-Алтайска до Чемала",
      "⛪ Экскурсия на остров Патмос",
      "🏡 Проживание в Чемале",
      "🍽️ Питание включено",
      "🌊 Прогулки по берегу Катуни",
      "🌄 Живописные смотровые точки",
    ],
    prices: { group: "от 40 000 ₽", individual: "от 30 000 ₽", reboot: "от 50 000 ₽" },
    note: "Трансфер из Горно-Алтайска включён",
  },
  {
    id: 3,
    name: "Озеро Ая",
    subtitle: "Тусовка и приключения",
    dates: "26–28 июня",
    duration: "3 дня",
    emoji: "🎉",
    badge: "Для молодёжи",
    badgeColor: "bg-amber-50 text-amber-700",
    description:
      "Самое тусовочное место Алтая! Тёплое бирюзовое озеро, клубная жизнь, бассейн Ривьера, джип-туры по горным дорогам. Здесь весело в любую погоду. Идеально для молодых и активных, кто хочет совместить алтайскую природу с живой компанией.",
    includes: [
      "🏊 Бассейн «Ривьера» включён",
      "🚙 Джип-тур по горным дорогам",
      "🎶 Клубы и вечерние тусовки",
      "🏡 Домики на берегу Аи",
      "🍽️ Питание включено",
      "🤿 Купание и водные активности",
    ],
    prices: { group: "от 50 000 ₽", individual: "от 30 000 ₽", reboot: null },
    note: "Возраст 18+. Дети не предусмотрены",
  },
  {
    id: 4,
    name: "Денисова пещера",
    subtitle: "Семейный отдых",
    dates: "23–26 июля",
    duration: "4 дня",
    emoji: "🦴",
    badge: "Для семей",
    badgeColor: "bg-forest-100 text-forest-600",
    description:
      "Без пафоса, зато с душой. Денисова пещера — место, где нашли следы древних людей, живших здесь 50 000 лет назад. Не модный курорт, а настоящий спокойный отдых. Чистый воздух, степные пейзажи, не торопливые прогулки. Отлично подходит для семей с детьми от 8 лет.",
    includes: [
      "🦴 Экскурсия в Денисову пещеру",
      "🌾 Прогулки по Алтайской степи",
      "🏡 Уютное проживание",
      "🍽️ Питание включено",
      "👨‍👩‍👧 Программа для детей от 8 лет",
      "🌅 Размеренный, восстанавливающий ритм",
    ],
    prices: { group: "по запросу", individual: "по запросу", reboot: null },
    note: "Идеально для семей с детьми",
  },
  {
    id: 5,
    name: "Патмос + Ая",
    subtitle: "Комбо-тур",
    dates: "15–19 июля",
    duration: "5 дней",
    emoji: "🌀",
    badge: "Хит сезона",
    badgeColor: "bg-amber-100 text-amber-700",
    description:
      "Лучшее из двух миров — сначала тишина острова Патмос и духовное наполнение, потом живая тусовка на озере Ая с джипами и Ривьерой. Уникальный баланс: перезагрузка + веселье. Один тур — два совершенно разных настроения.",
    includes: [
      "⛪ Остров Патмос с экскурсией",
      "🎉 Озеро Ая — тусовка и приключения",
      "🚙 Джип-тур",
      "🏊 Бассейн Ривьера",
      "🍽️ Питание все дни",
      "🚌 Трансфер между точками",
    ],
    prices: { group: "от 60 000 ₽", individual: null, reboot: null },
    note: "Всё включено, двойное удовольствие",
  },
  {
    id: 6,
    name: "ВИП тур на Чемал",
    subtitle: "Роскошь на природе",
    dates: "По договорённости",
    duration: "Индивидуально",
    emoji: "👑",
    badge: "ВИП",
    badgeColor: "bg-amber-200 text-amber-900",
    description:
      "Эксклюзивный тур для тех, кто привык к лучшему. Ресторанное питание на открытом воздухе (кейтеринг), номера люкс, полное сопровождение на протяжении всего путешествия. Джип-тур, конные прогулки, массаж, авторские экскурсии. По запросу — концерт горлового пения.",
    includes: [
      "👑 Номера Люкс",
      "🍽️ Ресторанное кейтеринг-питание на природе",
      "🚙 Джип-тур по лучшим маршрутам",
      "🐴 Конные прогулки",
      "💆 Массаж включён",
      "🎵 Концерт горлового пения (по запросу)",
      "🧭 Полное сопровождение гостей",
      "🗺️ Авторские экскурсии",
    ],
    prices: { group: null, individual: "от 350 000 ₽/чел", reboot: null },
    note: "Даты и программа — полностью под вас",
  },
];

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

const Index = () => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProgram, setActiveProgram] = useState<"group" | "individual" | "reboot">("group");
  const [activeTour, setActiveTour] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", program: "Групповой тур" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhoto((p) => (p + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const navLinks = [
    { href: "#tours", label: "Туры" },
    { href: "#programs", label: "Программы" },
    { href: "#gallery", label: "Галерея" },
    { href: "#reviews", label: "Отзывы" },
    { href: "#contact", label: "Контакты" },
  ];

  return (
    <div className="min-h-screen bg-mist font-golos">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="glass-card border-b border-forest-200/40 px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <a href="#" className="font-display text-2xl text-forest-800 italic tracking-wide">
              Туры на Алтай
            </a>
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-forest-700 hover:text-forest-500 transition-colors duration-200 tracking-wide"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="bg-forest-600 text-white px-5 py-2 rounded-full text-sm hover:bg-forest-500 transition-colors duration-200"
              >
                Записаться
              </a>
            </div>
            <button
              className="md:hidden text-forest-700"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
          {menuOpen && (
            <div className="md:hidden pt-4 pb-2 flex flex-col gap-3 border-t border-forest-200/40 mt-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-forest-700 hover:text-forest-500 py-1 px-2 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="bg-forest-600 text-white px-5 py-2 rounded-full text-sm text-center mt-2"
              >
                Записаться
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="relative h-screen min-h-[600px] overflow-hidden">
        {HERO_IMAGES.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              opacity: i === currentPhoto ? 1 : 0,
              transition: "opacity 1.5s ease-in-out",
            }}
          >
            <img
              src={img}
              alt="Алтай"
              className="w-full h-full object-cover"
              style={{
                transform: i === currentPhoto ? "scale(1)" : "scale(1.05)",
                transition: "transform 6s ease-out",
              }}
            />
          </div>
        ))}
        <div className="absolute inset-0 hero-overlay" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-sage-200 text-sm tracking-[0.4em] uppercase mb-4 font-golos animate-fade-in">
            Алтай · 2025
          </p>
          <h1 className="font-display text-white text-shadow text-5xl md:text-7xl lg:text-8xl font-light italic leading-none mb-3 animate-fade-up" style={{ animationDelay: "0.3s", opacity: 0 }}>
            Туры на Алтай
          </h1>
          <p className="font-display text-sage-100 text-shadow-sm text-xl md:text-3xl font-light italic mb-6 animate-fade-up" style={{ animationDelay: "0.6s", opacity: 0 }}>
            Групповые · Индивидуальные · Перезагрузка
          </p>
          <p className="text-white/80 text-sm mb-10 animate-fade-up" style={{ animationDelay: "0.75s", opacity: 0 }}>
            Количество мест ограничено на каждый тур
          </p>
          <a
            href="#tours"
            className="animate-fade-up inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/40 text-white px-8 py-3 rounded-full hover:bg-white/25 transition-all duration-300 text-sm tracking-wide"
            style={{ animationDelay: "0.9s", opacity: 0 }}
          >
            Выбрать тур
            <Icon name="ChevronDown" size={16} />
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPhoto(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentPhoto ? "bg-white w-8" : "bg-white/50 w-2"
              }`}
            />
          ))}
        </div>
      </section>

      {/* TOURS */}
      <section id="tours" className="py-24 px-6 bg-white/60">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sage-500 text-xs tracking-[0.4em] uppercase mb-4">Направления 2025</p>
            <h2 className="font-display text-4xl md:text-6xl text-forest-800 italic font-light mb-4">
              Выберите свой Алтай
            </h2>
            <p className="text-sage-600 text-sm max-w-xl mx-auto">
              По индивидуальному запросу увезём в любую точку Алтая
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOURS.map((tour, idx) => (
              <AnimatedSection key={tour.id}>
                <div
                  className={`nature-card rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col h-full ${
                    activeTour === tour.id ? "ring-2 ring-forest-400" : ""
                  }`}
                  onClick={() => setActiveTour(activeTour === tour.id ? null : tour.id)}
                >
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-4xl">{tour.emoji}</span>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${tour.badgeColor}`}>
                        {tour.badge}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl text-forest-800 italic mb-1">{tour.name}</h3>
                    <p className="text-sage-500 text-sm mb-3">{tour.subtitle}</p>

                    <div className="flex items-center gap-4 mb-4 text-xs text-sage-500">
                      <span className="flex items-center gap-1">
                        <Icon name="Calendar" size={12} />
                        {tour.dates}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Clock" size={12} />
                        {tour.duration}
                      </span>
                    </div>

                    <p className="text-forest-600 text-sm leading-relaxed mb-4 flex-1">
                      {tour.description}
                    </p>

                    {activeTour === tour.id && (
                      <div className="border-t border-forest-100 pt-4 mt-2">
                        <p className="text-xs text-sage-500 uppercase tracking-wider mb-3">Включено в тур:</p>
                        <div className="grid grid-cols-1 gap-1.5 mb-4">
                          {tour.includes.map((item) => (
                            <span key={item} className="text-sm text-forest-700">{item}</span>
                          ))}
                        </div>
                        {tour.note && (
                          <div className="bg-sage-100/60 rounded-xl p-3 text-xs text-forest-600 mb-4">
                            ℹ️ {tour.note}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="border-t border-forest-100 pt-4 mt-2">
                      <div className="flex flex-col gap-1 mb-4">
                        {tour.prices.group && (
                          <div className="flex justify-between text-sm">
                            <span className="text-sage-500">Групповой</span>
                            <span className="text-forest-800 font-medium">{tour.prices.group}</span>
                          </div>
                        )}
                        {tour.prices.individual && (
                          <div className="flex justify-between text-sm">
                            <span className="text-sage-500">Индивидуальный</span>
                            <span className="text-forest-800 font-medium">{tour.prices.individual}</span>
                          </div>
                        )}
                        {tour.prices.reboot && (
                          <div className="flex justify-between text-sm">
                            <span className="text-sage-500">Перезагрузка</span>
                            <span className="text-forest-800 font-medium">{tour.prices.reboot}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <button
                          onClick={(e) => { e.stopPropagation(); setActiveTour(activeTour === tour.id ? null : tour.id); }}
                          className="text-xs text-forest-500 hover:text-forest-700 transition-colors flex items-center gap-1"
                        >
                          {activeTour === tour.id ? "Свернуть" : "Подробнее"}
                          <Icon name={activeTour === tour.id ? "ChevronUp" : "ChevronDown"} size={12} />
                        </button>
                        <a
                          href="#contact"
                          onClick={(e) => e.stopPropagation()}
                          className="bg-forest-600 text-white px-5 py-2 rounded-full text-xs hover:bg-forest-500 transition-colors"
                        >
                          Забронировать
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="mt-10 glass-card rounded-3xl p-6 text-center">
              <p className="text-forest-700 text-sm">
                🌍 Хотите в другое место Алтая? <strong>Мы организуем индивидуальный маршрут в любую точку</strong> — напишите нам!
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <p className="text-sage-500 text-xs tracking-[0.4em] uppercase mb-4">Программы</p>
            <h2 className="font-display text-4xl md:text-6xl text-forest-800 italic font-light">
              Выберите свой путь
            </h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="flex gap-2 justify-center mb-10 flex-wrap">
              {[
                { key: "group", label: "Групповой тур" },
                { key: "individual", label: "Индивидуальный" },
                { key: "reboot", label: "Перезагрузка" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveProgram(tab.key as "group" | "individual" | "reboot")}
                  className={`px-6 py-2.5 rounded-full text-sm transition-all duration-200 ${
                    activeProgram === tab.key
                      ? "bg-forest-600 text-white shadow-md"
                      : "bg-forest-100 text-forest-700 hover:bg-forest-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeProgram === "group" && (
              <div className="nature-card rounded-3xl p-8 md:p-10">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-12 h-12 bg-forest-100 rounded-2xl flex items-center justify-center shrink-0">
                        <Icon name="Users" size={24} className="text-forest-600" />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl text-forest-800 italic">Групповой тур</h3>
                        <p className="text-sage-500 text-sm">до 20 человек · от 3 суток</p>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {[
                        "Проживание в комфортабельных домиках",
                        "3-разовое питание",
                        "Экскурсии по выбранному маршруту",
                        "Авторские медитации с природой",
                        "Стрейчинг, Пилатес, ЛФК, кардио",
                        "Вечерние посиделки у костра",
                        "Комфортный трансфер",
                        "Можно с детьми от 8 лет",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-2">
                          <Icon name="Check" size={15} className="text-forest-500 mt-0.5 shrink-0" />
                          <span className="text-sm text-forest-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="md:w-52 flex flex-col gap-4">
                    <div className="nature-card rounded-2xl p-6 text-center">
                      <div className="font-display text-3xl text-forest-800 italic">от 40 000 ₽</div>
                      <div className="text-sage-500 text-xs mt-1">за человека</div>
                      <div className="text-sage-400 text-xs mt-2 leading-relaxed">Билеты до точки отправления — отдельно</div>
                    </div>
                    <a href="#contact" className="block bg-forest-600 text-white text-center px-6 py-3 rounded-2xl hover:bg-forest-500 transition-colors text-sm">
                      Записаться
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeProgram === "individual" && (
              <div className="nature-card rounded-3xl p-8 md:p-10">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-12 h-12 bg-forest-100 rounded-2xl flex items-center justify-center shrink-0">
                        <Icon name="User" size={24} className="text-forest-600" />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl text-forest-800 italic">Индивидуальный тур</h3>
                        <p className="text-sage-500 text-sm">1–3 человека или семья</p>
                      </div>
                    </div>
                    <div className="space-y-2.5 mb-6">
                      {[
                        "Полное индивидуальное сопровождение",
                        "Программа составляется под ваши пожелания",
                        "От 3 суток — длительность по желанию",
                        "Гибкий график и маршрут",
                        "Идеально для семей с детьми",
                        "Любая точка Алтая",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-2">
                          <Icon name="Check" size={15} className="text-forest-500 mt-0.5 shrink-0" />
                          <span className="text-sm text-forest-700">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-sage-100/60 rounded-2xl p-4 text-sm text-forest-600">
                      Программа обсуждается индивидуально при бронировании
                    </div>
                  </div>
                  <div className="md:w-52 flex flex-col gap-4">
                    <div className="nature-card rounded-2xl p-6 text-center">
                      <div className="font-display text-3xl text-forest-800 italic">от 30 000 ₽</div>
                      <div className="text-sage-500 text-xs mt-1">за человека</div>
                    </div>
                    <a href="#contact" className="block bg-forest-600 text-white text-center px-6 py-3 rounded-2xl hover:bg-forest-500 transition-colors text-sm">
                      Записаться
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeProgram === "reboot" && (
              <div className="nature-card rounded-3xl p-8 md:p-10">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-12 h-12 bg-forest-100 rounded-2xl flex items-center justify-center shrink-0">
                        <Icon name="RefreshCw" size={24} className="text-forest-600" />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl text-forest-800 italic">Перезагрузка</h3>
                        <p className="text-sage-500 text-sm">индивидуально или группа · от 3 суток</p>
                      </div>
                    </div>
                    <div className="space-y-2.5 mb-6">
                      {[
                        "Посещение мест силы — туры и экскурсии",
                        "Воссоединение с природой",
                        "Тихий, спокойный, восстанавливающий отдых",
                        "Сбалансированное питание",
                        "Массаж",
                        "Занятия ЛФК",
                        "Практики на восстановление организма",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-2">
                          <Icon name="Check" size={15} className="text-forest-500 mt-0.5 shrink-0" />
                          <span className="text-sm text-forest-700">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-sage-100/60 rounded-2xl p-4 text-sm text-forest-600">
                      Программа подбирается под цель и задачи каждого гостя
                    </div>
                  </div>
                  <div className="md:w-52 flex flex-col gap-4">
                    <div className="nature-card rounded-2xl p-6 text-center">
                      <div className="font-display text-3xl text-forest-800 italic">от 45 000 ₽</div>
                      <div className="text-sage-500 text-xs mt-1">за человека</div>
                    </div>
                    <a href="#contact" className="block bg-forest-600 text-white text-center px-6 py-3 rounded-2xl hover:bg-forest-500 transition-colors text-sm">
                      Записаться
                    </a>
                  </div>
                </div>
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 px-6 bg-white/40">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <p className="text-sage-500 text-xs tracking-[0.4em] uppercase mb-4">Галерея</p>
            <h2 className="font-display text-4xl md:text-5xl text-forest-800 italic font-light">
              Живая природа Алтая
            </h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="col-span-2 rounded-3xl overflow-hidden h-64 md:h-80">
                <img
                  src={HERO_IMAGES[0]}
                  alt="Алтай"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="rounded-3xl overflow-hidden flex-1">
                  <img
                    src={HERO_IMAGES[1]}
                    alt="Алтай"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden flex-1">
                  <img
                    src={HERO_IMAGES[2]}
                    alt="Алтай"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <p className="text-center text-sage-400 text-sm mt-6 italic font-display">
              Больше фото и видео — в нашем Telegram
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <p className="text-sage-500 text-xs tracking-[0.4em] uppercase mb-4">Отзывы</p>
            <h2 className="font-display text-4xl md:text-5xl text-forest-800 italic font-light">
              Участники о поездке
            </h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Светлана, 38 лет",
                  text: "Ехала со скептицизмом — вернулась с ощущением, что побывала в другом мире. Медитации у воды, горы, костёр вечером... Именно то, что нужно было душе.",
                  stars: 5,
                  tour: "Групповой тур · Телецкое озеро",
                },
                {
                  name: "Михаил и семья",
                  text: "Взяли индивидуальную программу с детьми. Дети в восторге — рыбалка, горные прогулки, купание. Мы с женой наконец-то отдохнули по-настоящему.",
                  stars: 5,
                  tour: "Индивидуальный тур",
                },
                {
                  name: "Ирина, 45 лет",
                  text: "Выбрала «Перезагрузку» после сложного года. Массаж, ЛФК, прогулки в тишине, чистый воздух и вкусная еда. Уехала заряженной на год вперёд!",
                  stars: 5,
                  tour: "Перезагрузка",
                },
              ].map((review) => (
                <div key={review.name} className="glass-card rounded-3xl p-6 flex flex-col">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: review.stars }).map((_, i) => (
                      <span key={i} className="text-amber-400">★</span>
                    ))}
                  </div>
                  <p className="text-forest-700 text-sm leading-relaxed italic flex-1">«{review.text}»</p>
                  <div className="border-t border-forest-100 pt-4 mt-4">
                    <div className="font-medium text-forest-800 text-sm">{review.name}</div>
                    <div className="text-sage-500 text-xs mt-0.5">{review.tour}</div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 bg-gradient-to-b from-forest-50 to-forest-100">
        <div className="max-w-xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <p className="text-sage-500 text-xs tracking-[0.4em] uppercase mb-4">Контакты</p>
            <h2 className="font-display text-4xl md:text-5xl text-forest-800 italic font-light mb-3">
              Начните путешествие
            </h2>
            <p className="text-sage-600 text-sm">Оставьте заявку — мы свяжемся и подберём программу под вас</p>
          </AnimatedSection>

          <AnimatedSection>
            {submitted ? (
              <div className="glass-card rounded-3xl p-12 text-center">
                <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle" size={32} className="text-forest-500" />
                </div>
                <h3 className="font-display text-2xl text-forest-800 italic mb-2">Заявка принята!</h3>
                <p className="text-sage-600 text-sm">Мы свяжемся с вами в ближайшее время</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 space-y-5">
                <div>
                  <label className="block text-forest-700 text-sm mb-2">Ваше имя</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Как вас зовут?"
                    className="w-full bg-white/70 border border-forest-200 rounded-xl px-4 py-3 text-forest-800 placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-forest-700 text-sm mb-2">Телефон или WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full bg-white/70 border border-forest-200 rounded-xl px-4 py-3 text-forest-800 placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-forest-700 text-sm mb-2">Интересующий тур</label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full bg-white/70 border border-forest-200 rounded-xl px-4 py-3 text-forest-800 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent transition"
                  >
                    <option>Телецкое озеро (19–22 июня)</option>
                    <option>Остров Патмос (12–14 июня)</option>
                    <option>Озеро Ая (26–28 июня)</option>
                    <option>Денисова пещера (23–26 июля)</option>
                    <option>Патмос + Ая (15–19 июля)</option>
                    <option>ВИП тур на Чемал</option>
                    <option>Индивидуальный маршрут</option>
                    <option>Не определился, хочу узнать подробнее</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-forest-600 text-white py-4 rounded-xl hover:bg-forest-500 transition-colors duration-200 text-sm tracking-wide font-medium"
                >
                  Отправить заявку
                </button>
                <p className="text-center text-sage-400 text-xs">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                </p>
              </form>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="tel:+79999999999" className="flex items-center gap-2 text-forest-700 hover:text-forest-500 transition-colors">
                <Icon name="Phone" size={16} />
                <span className="text-sm">+7 (999) 999-99-99</span>
              </a>
              <span className="hidden sm:block text-forest-300">·</span>
              <a href="https://t.me/username" className="flex items-center gap-2 text-forest-700 hover:text-forest-500 transition-colors">
                <Icon name="MessageCircle" size={16} />
                <span className="text-sm">Telegram</span>
              </a>
              <span className="hidden sm:block text-forest-300">·</span>
              <a href="https://wa.me/79999999999" className="flex items-center gap-2 text-forest-700 hover:text-forest-500 transition-colors">
                <Icon name="MessageSquare" size={16} />
                <span className="text-sm">WhatsApp</span>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-forest-900 text-sage-300 py-10 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="font-display text-2xl text-white italic mb-2">Туры на Алтай</div>
          <p className="text-sm mb-6 text-sage-500">Групповые · Индивидуальные · Перезагрузка</p>
          <div className="flex flex-wrap gap-6 justify-center text-xs text-sage-600 mb-6">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-sage-300 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-forest-600 to-transparent mb-6" />
          <p className="text-xs text-sage-700">© 2025 · Все права защищены · Количество мест ограничено</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

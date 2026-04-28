import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGES = [
  "https://cdn.poehali.dev/projects/57811b6b-1488-4a1d-9096-b19e0c95f400/files/64840ed8-d4a6-44a5-ba9e-313c7618e494.jpg",
  "https://cdn.poehali.dev/projects/57811b6b-1488-4a1d-9096-b19e0c95f400/files/1397c4f4-180f-4a10-bdb7-27d0820e34ca.jpg",
  "https://cdn.poehali.dev/projects/57811b6b-1488-4a1d-9096-b19e0c95f400/files/7cbb5b0d-ee1a-4e38-9193-3a7183ce993e.jpg",
];

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
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
    { href: "#about", label: "О месте" },
    { href: "#programs", label: "Программы" },
    { href: "#tours", label: "Туры" },
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
              Телецкое озеро
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
              alt="Телецкое озеро"
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
            Алтай · Телецкое озеро
          </p>
          <h1 className="font-display text-white text-shadow text-5xl md:text-7xl lg:text-8xl font-light italic leading-none mb-3 animate-fade-up" style={{ animationDelay: "0.3s", opacity: 0 }}>
            Место силы
          </h1>
          <p className="font-display text-sage-100 text-shadow-sm text-xl md:text-3xl font-light italic mb-10 animate-fade-up" style={{ animationDelay: "0.6s", opacity: 0 }}>
            Отдых на Телецком озере
          </p>
          <a
            href="#about"
            className="animate-fade-up inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/40 text-white px-8 py-3 rounded-full hover:bg-white/25 transition-all duration-300 text-sm tracking-wide"
            style={{ animationDelay: "0.9s", opacity: 0 }}
          >
            Узнать подробнее
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

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 bg-white/60">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <p className="text-center text-sage-500 text-xs tracking-[0.4em] uppercase mb-4">О месте</p>
            <h2 className="font-display text-4xl md:text-6xl text-forest-800 text-center italic font-light mb-16">
              Там, где рождается тишина
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
            <AnimatedSection>
              <div className="space-y-5 text-forest-700 leading-relaxed text-[1.05rem]">
                <p>
                  Телецкое озеро — одно из крупнейших и глубочайших озёр России. Его называют «Алтайским морем»
                  и «младшим братом Байкала». Глубина достигает 325 метров, вода кристально чистая.
                </p>
                <p>
                  Алтайцы издревле почитали это место священным. По легенде, богатырь Телес, не найдя
                  достойного применения золоту, бросил его в озеро — с тех пор оно хранит особую силу.
                  Здесь время замедляется, мысли проясняются, а тело наполняется живой энергией.
                </p>
                <p>
                  Включено в список объектов Всемирного наследия ЮНЕСКО как часть «Золотых гор Алтая».
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection className="grid grid-cols-2 gap-4">
              {[
                { icon: "Waves", label: "Глубина", value: "325 м" },
                { icon: "Thermometer", label: "Чистота воды", value: "10/10" },
                { icon: "Mountain", label: "Высота над уровнем моря", value: "436 м" },
                { icon: "Globe", label: "Наследие ЮНЕСКО", value: "с 1998" },
              ].map((stat) => (
                <div key={stat.label} className="nature-card rounded-2xl p-6 text-center">
                  <Icon name={stat.icon} size={28} className="text-forest-500 mx-auto mb-2" />
                  <div className="font-display text-2xl text-forest-800 italic">{stat.value}</div>
                  <div className="text-xs text-sage-600 mt-1 tracking-wide">{stat.label}</div>
                </div>
              ))}
            </AnimatedSection>
          </div>

          <AnimatedSection className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "Leaf", title: "Чистый воздух", text: "Нетронутая тайга вокруг озера. Воздух насыщен фитонцидами и кислородом" },
              { icon: "Zap", title: "Энергетика места", text: "Место силы, где тысячелетия накапливалась природная энергия. Ощущается с первых минут" },
              { icon: "Heart", title: "Исцеление", text: "Чистая вода, горный воздух, тишина и практики — мощная перезагрузка для тела и духа" },
            ].map((item) => (
              <div key={item.title} className="glass-card rounded-2xl p-6">
                <div className="w-10 h-10 bg-forest-100 rounded-full flex items-center justify-center mb-4">
                  <Icon name={item.icon} size={20} className="text-forest-600" />
                </div>
                <h3 className="font-display text-xl text-forest-800 italic mb-2">{item.title}</h3>
                <p className="text-sage-600 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* NEAREST TOUR */}
      <section id="tours" className="py-20 px-6 bg-gradient-to-br from-forest-700 to-forest-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={HERO_IMAGES[0]} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <AnimatedSection className="text-center mb-10">
            <p className="text-sage-300 text-xs tracking-[0.4em] uppercase mb-4">Ближайший тур</p>
            <h2 className="font-display text-4xl md:text-5xl text-white italic font-light mb-3">
              19–22 июня 2025
            </h2>
            <p className="text-sage-200 text-lg">Групповой тур · до 20 человек</p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="glass-card rounded-3xl p-8 md:p-10">
              <div className="grid md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-forest-200/30">
                {[
                  { icon: "Calendar", label: "Продолжительность", value: "3 суток" },
                  { icon: "Users", label: "Размер группы", value: "до 20 чел." },
                  { icon: "MapPin", label: "Отправление", value: "г. Бийск" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <Icon name={item.icon} size={24} className="text-forest-500 mx-auto mb-2" />
                    <div className="font-display text-2xl text-forest-800 italic">{item.value}</div>
                    <div className="text-xs text-sage-500 mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 justify-center mb-8">
                {[
                  "🛥️ Прогулка на корабле",
                  "💧 Водопад Корбу",
                  "🌿 Исчезающий источник",
                  "🏡 Уютные домики",
                  "🍽️ 3-разовое питание",
                  "🧘 Авторские медитации",
                  "🏃 Фитнес-занятия",
                  "🔥 Посиделки у костра",
                  "👨‍👩‍👧 Можно с детьми от 8 лет",
                ].map((tag) => (
                  <span key={tag} className="bg-forest-100/80 text-forest-700 px-4 py-1.5 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="font-display text-4xl text-forest-800 italic">от 36 000 ₽</div>
                  <div className="text-sage-500 text-sm mt-1">за человека · трансфер из Бийска включён</div>
                </div>
                <a
                  href="#contact"
                  className="bg-forest-600 text-white px-8 py-3 rounded-full hover:bg-forest-500 transition-colors duration-200 text-sm tracking-wide whitespace-nowrap"
                >
                  Забронировать место
                </a>
              </div>
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
                        <p className="text-sage-500 text-sm">до 20 человек · 3 суток</p>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {[
                        "Проживание в комфортабельных домиках",
                        "3-разовое питание",
                        "Прогулка на корабле по озеру",
                        "Экскурсия на водопад Корбу",
                        "Исчезающий источник",
                        "Стрейчинг, Пилатес, ЛФК, кардио",
                        "Авторские медитации с природой",
                        "Вечерние посиделки у костра",
                        "Комфортный трансфер из Бийска",
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
                      <div className="font-display text-3xl text-forest-800 italic">36 000 ₽</div>
                      <div className="text-sage-500 text-xs mt-1">за человека</div>
                      <div className="text-sage-400 text-xs mt-2 leading-relaxed">Билеты до Бийска оплачиваются отдельно</div>
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
                        <p className="text-sage-500 text-sm">1–3 человека или семья (3–5 чел)</p>
                      </div>
                    </div>
                    <div className="space-y-2.5 mb-6">
                      {[
                        "Полное индивидуальное сопровождение",
                        "Программа составляется под ваши пожелания",
                        "От 3 суток — длительность по желанию",
                        "Гибкий график и маршрут",
                        "Идеально для семей с детьми",
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
                      Обсудить программу
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
                  alt="Телецкое озеро"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="rounded-3xl overflow-hidden flex-1">
                  <img
                    src={HERO_IMAGES[1]}
                    alt="Водопад Корбу"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden flex-1">
                  <img
                    src={HERO_IMAGES[2]}
                    alt="Домики в лесу"
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
                  text: "Ехала со скептицизмом — вернулась с ощущением, что побывала в другом мире. Озеро просто невероятное. Медитации у воды, водопад, костёр вечером... Именно то, что нужно было душе.",
                  stars: 5,
                  tour: "Групповой тур",
                },
                {
                  name: "Михаил и семья",
                  text: "Взяли индивидуальную программу с детьми. Дети в восторге — рыбалка, корабль, купание. Мы с женой наконец-то отдохнули по-настоящему. Очень душевная атмосфера.",
                  stars: 5,
                  tour: "Индивидуальный",
                },
                {
                  name: "Ирина, 45 лет",
                  text: "Выбрала «Перезагрузку» после сложного года. Массаж, ЛФК, прогулки в тишине, чистый воздух и вкусная еда. Уехала заряженной на год вперёд. Уже планирую снова!",
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
                  <label className="block text-forest-700 text-sm mb-2">Интересующая программа</label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full bg-white/70 border border-forest-200 rounded-xl px-4 py-3 text-forest-800 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent transition"
                  >
                    <option>Групповой тур</option>
                    <option>Индивидуальный тур</option>
                    <option>Перезагрузка</option>
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
          <div className="font-display text-2xl text-white italic mb-2">Телецкое озеро</div>
          <p className="text-sm mb-6 text-sage-500">Место силы в сердце Алтая</p>
          <div className="flex flex-wrap gap-6 justify-center text-xs text-sage-600 mb-6">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-sage-300 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-forest-600 to-transparent mb-6" />
          <p className="text-xs text-sage-700">© 2025 · Все права защищены</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
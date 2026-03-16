import { useState, useEffect, useRef } from 'react';
import { Heart, Play, Gift } from 'lucide-react';

const CONFIG = {
  birthDate: '2005-07-02',

  photos: [
    { url: 'https://images.pexels.com/photos/1257110/pexels-photo-1257110.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'My first steps' },
    { url: 'https://images.pexels.com/photos/1738986/pexels-photo-1738986.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Learning together' },
    { url: 'https://images.pexels.com/photos/3756042/pexels-photo-3756042.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Happy moments' },
    { url: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Always by my side' },
    { url: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Forever grateful' },
  ],

  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
};

function App() {
  const [daysCounter, setDaysCounter] = useState(0);
  const [showSurprise, setShowSurprise] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    memory: useRef<HTMLDivElement>(null),
    counter: useRef<HTMLDivElement>(null),
    video: useRef<HTMLDivElement>(null),
    message: useRef<HTMLDivElement>(null),
    surprise: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    if (!visibleSections.has('counter')) return;

    const birthDate = new Date(CONFIG.birthDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - birthDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let current = 0;
    const increment = Math.ceil(diffDays / 100);
    const timer = setInterval(() => {
      current += increment;
      if (current >= diffDays) {
        current = diffDays;
        clearInterval(timer);
      }
      setDaysCounter(current);
    }, 20);

    return () => clearInterval(timer);
  }, [visibleSections]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.2 }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionKey: keyof typeof sectionRefs) => {
    sectionRefs[sectionKey].current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50">
      <div
        id="hero"
        ref={sectionRefs.hero}
        className={`min-h-screen flex flex-col items-center justify-center px-6 transition-all duration-1000 ${
          visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block animate-bounce">
            <Heart className="w-16 h-16 text-rose-400 fill-rose-400" />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-rose-900 leading-tight">
            لاهم شخص في حياتي ....
            <span className="block mt-4 text-rose-600">امي</span>
          </h1>

          <button
            onClick={() => scrollToSection('memory')}
            className="group mt-12 px-8 py-4 bg-gradient-to-r from-rose-400 to-orange-400 text-white rounded-full text-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            اضغطي هنا يا امي
            <Heart className="w-5 h-5 fill-white group-hover:animate-pulse" />
          </button>
        </div>
      </div>

      <div
        id="memory"
        ref={sectionRefs.memory}
        className={`min-h-screen py-20 px-6 transition-all duration-1000 delay-200 ${
          visibleSections.has('memory') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-rose-900 text-center mb-16">
            ذكراياتنا الحلوة
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CONFIG.photos.map((photo, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${
                  visibleSections.has('memory') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 via-rose-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white text-lg font-medium">{photo.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        id="counter"
        ref={sectionRefs.counter}
        className={`min-h-screen flex items-center justify-center px-6 transition-all duration-1000 ${
          visibleSections.has('counter') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif text-rose-900 mb-8">
           انتي كنتي موجوده عشاني من
          </h2>

          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-2xl">
            <div className="text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500 mb-4">
              {daysCounter.toLocaleString()}
            </div>
            <p className="text-2xl md:text-3xl text-rose-800 font-medium">
              يوم من الحب الغير مشروط
            </p>
          </div>
        </div>
      </div>

      <div
        id="video"
        ref={sectionRefs.video}
        className={`min-h-screen py-20 px-6 transition-all duration-1000 ${
          visibleSections.has('video') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-rose-900 text-center mb-12">
            رساله خاصه ليكي
          </h2>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white/60 backdrop-blur-sm p-4">
            <div className="aspect-video rounded-2xl overflow-hidden bg-gray-900 flex items-center justify-center">
              <iframe
                src={CONFIG.videoUrl}
                title="Video Message"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

        </div>
      </div>

      <div
        id="message"
        ref={sectionRefs.message}
        className={`min-h-screen flex items-center justify-center px-6 transition-all duration-1000 ${
          visibleSections.has('message') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <Heart className="w-20 h-20 text-rose-400 fill-rose-400 mx-auto animate-pulse" />

          <div className="space-y-8">
            <div className="p-8 bg-white/50 backdrop-blur-sm rounded-3xl shadow-xl">
              <p className="text-3xl md:text-4xl text-gray-800 leading-relaxed font-serif" dir="rtl">
                شكراً يا ماما على حاجه عملتيها عشاني
              </p>
            </div>

            <div className="p-8 bg-white/50 backdrop-blur-sm rounded-3xl shadow-xl">
              <p className="text-3xl md:text-4xl text-gray-800 leading-relaxed font-serif">
                Thank you for everything you have done for me.
              </p>
            </div>

            <div className="p-8 bg-white/50 backdrop-blur-sm rounded-3xl shadow-xl">
              <p className="text-3xl md:text-4xl text-gray-800 leading-relaxed font-serif">
                妈妈，谢谢你为我做的一切
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        id="surprise"
        ref={sectionRefs.surprise}
        className={`min-h-screen flex items-center justify-center px-6 transition-all duration-1000 ${
          visibleSections.has('surprise') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          {!showSurprise ? (
            <button
              onClick={() => setShowSurprise(true)}
              className="group px-12 py-6 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-full text-2xl font-medium shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              <Gift className="w-8 h-8 group-hover:rotate-12 transition-transform" />
              افتحي اخر مفاجأه
            </button>
          ) : (
            <div className="animate-fadeIn">
              <div className="space-y-8">
                <div className="inline-block">
                  {[...Array(5)].map((_, i) => (
                    <Heart
                      key={i}
                      className="inline-block w-12 h-12 md:w-16 md:h-16 text-rose-400 fill-rose-400 mx-2 animate-bounce"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>

                <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-rose-900 leading-tight animate-pulse">
                  انا بحبك يا ماما
                </h2>

                <p className="text-4xl md:text-5xl text-orange-600 font-medium">
                  كل عيد ام وانتي معايا
                </p>

                <div className="inline-block">
                  {[...Array(5)].map((_, i) => (
                    <Heart
                      key={i}
                      className="inline-block w-12 h-12 md:w-16 md:h-16 text-rose-400 fill-rose-400 mx-2 animate-bounce"
                      style={{ animationDelay: `${(i + 2.5) * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

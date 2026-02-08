import React from "react";
import HeroSection from "../components/HeroSection";
import CompanyInfo from "../components/CompanyInfo";
import Footer from "../components/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../components/ui/carousel";

const Index = () => {
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi | null>(null);

  React.useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const intervalId = window.setInterval(() => {
      carouselApi.scrollNext();
    }, 4500);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [carouselApi]);

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <CompanyInfo />
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden shadow-xl bg-gray-100">
            <Carousel
              opts={{ align: "start", loop: true }}
              setApi={setCarouselApi}
              className="relative"
            >
              <CarouselContent>
                <CarouselItem>
                  <div className="relative">
                    <img
                      src="/field-photo-1.jpg"
                      alt="전기 작업 현장 1"
                      className="h-auto w-full object-contain"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex items-start">
                      <div className="p-6 sm:p-8 text-white pointer-events-auto">
                        <p className="text-sm sm:text-base font-semibold tracking-wide text-white/90">
                          수도권 전기 인력 매칭
                        </p>
                        <h4 className="mt-2 text-2xl sm:text-3xl font-bold">
                          현장에 맞는 인력,
                          <br />
                          지금 바로 연결합니다
                        </h4>
                        <a
                          href="tel:010-4325-0482"
                          className="mt-4 inline-flex items-center rounded-xl bg-white/90 px-5 py-3 text-sm sm:text-base font-semibold text-gray-900 shadow-lg transition hover:bg-white"
                        >
                          전화하기
                        </a>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative">
                    <img
                      src="/field-photo-2.jpg"
                      alt="전기 작업 현장 2"
                      className="h-auto w-full object-contain"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex items-start">
                      <div className="p-6 sm:p-8 text-white pointer-events-auto">
                        <p className="text-sm sm:text-base font-semibold tracking-wide text-white/90">
                          안전·신속·정확
                        </p>
                        <h4 className="mt-2 text-2xl sm:text-3xl font-bold">
                          믿을 수 있는 전기 인력,
                          <br />
                          확실한 매칭
                        </h4>
                        <a
                          href="tel:010-4325-0482"
                          className="mt-4 inline-flex items-center rounded-xl bg-white/90 px-5 py-3 text-sm sm:text-base font-semibold text-gray-900 shadow-lg transition hover:bg-white"
                        >
                          전화하기
                        </a>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
          <p className="mt-5 text-center text-base sm:text-lg font-semibold text-gray-800 tracking-wide">
            현장 중심의 안전하고 신속한 인력 연결
          </p>
        </div>
      </section>
      {/* RegistrationForm 제거됨 */}
      <Footer />
    </div>
  );
};

export default Index;

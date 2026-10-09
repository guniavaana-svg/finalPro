import { useCallback, useEffect, useState } from "react";
import { API_URL } from "../../config.ts";
import type { SuppliersDataType } from "../dataType.ts";
import Btn from "../Components/Btn.tsx";

const AUTOPLAY_TIME = 5000;

 function DynamicBanner() {
  const [suppliersData, setSuppliersData] = useState<SuppliersDataType[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // GET SUPPLIERS
  useEffect(() => {
    const getSuppliersData = async (): Promise<void> => {
      try {
        const response = await fetch(`${API_URL}/suppliers`);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data: SuppliersDataType[] = await response.json();

        setSuppliersData(data);
        setCurrent(0);
      } catch (error) {
        console.error("Suppliers data fetch error:", error);
        setSuppliersData([]);
      }
    };

    getSuppliersData();
  }, []);

  // NEXT SLIDE
  const nextSlide = useCallback((): void => {
    setCurrent((prev) => {
      if (suppliersData.length === 0) {
        return 0;
      }

      return (prev + 1) % suppliersData.length;
    });
  }, [suppliersData.length]);

  // PREVIOUS SLIDE
  const prevSlide = useCallback((): void => {
    setCurrent((prev) => {
      if (suppliersData.length === 0) {
        return 0;
      }

      return prev === 0 ? suppliersData.length - 1 : prev - 1;
    });
  }, [suppliersData.length]);

  // GO TO SLIDE
  const goToSlide = (index: number): void => {
    if (index >= 0 && index < suppliersData.length) {
      setCurrent(index);
    }
  };

  // KEEP CURRENT INDEX VALID
  useEffect(() => {
    if (suppliersData.length === 0) {
      setCurrent(0);
      return;
    }

    if (current >= suppliersData.length) {
      setCurrent(suppliersData.length - 1);
    }
  }, [current, suppliersData.length]);

  // AUTOPLAY
  useEffect(() => {
    if (isPaused || suppliersData.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_TIME);

    return () => {
      clearInterval(timer);
    };
  }, [isPaused, nextSlide, suppliersData.length]);

  // KEYBOARD NAVIGATION
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (suppliersData.length <= 1) {
        return;
      }

      if (event.key === "ArrowRight") {
        nextSlide();
      }

      if (event.key === "ArrowLeft") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextSlide, prevSlide, suppliersData.length]);

  // LOADING / EMPTY STATE
  if (suppliersData.length === 0) {
    return null;
  }

  return (
    <section className="w-full px-3 py-4 sm:px-5 sm:py-6 lg:px-8">
      <div
        className="relative mx-auto w-full max-w-[1440px] overflow-hidden rounded-[20px] sm:rounded-[24px] lg:rounded-[28px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative h-[510px] sm:h-[430px] lg:h-[460px]">
          {suppliersData.map((banner, index) => {
            const isActive = index === current;
            const isBefore = index < current;

            return (
              <article
                key={banner.id}
                className="absolute inset-0 transition-all duration-700 ease-in-out"
                style={{
                  transform: isActive
                    ? "translateX(0)"
                    : isBefore
                      ? "translateX(-100%)"
                      : "translateX(100%)",
                  opacity: isActive ? 1 : 0,
                  pointerEvents: isActive ? "auto" : "none",
                }}
                aria-hidden={!isActive}
              >
                <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
                  {/* LOGO */}
                  <div className="flex h-36 w-36 items-center justify-center overflow-hidden">
                    <img
                      className="h-full w-full object-contain"
                      src={banner.logo}
                      alt={banner.name}
                    />
                  </div>

                  {/* TITLE */}
                  <h3 className="max-w-[700px] text-[1.5rem] font-semibold tracking-[1px] text-dark2 dark:text-light3">
                    იხილეთ სხვადასხვა შეთავაზებები და სიახლეები
                  </h3>

                  {/* BUTTON */}
                  <Btn text="იხილეთ შეთავაზება" />
                </div>
              </article>
            );
          })}
        </div>

        {/* DESKTOP ARROWS */}
        {suppliersData.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevSlide}
              aria-label="წინა ბანერი"
              className="absolute left-4 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full  text-lg text-btnDark shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white active:scale-95 lg:flex"
            >
              ←
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="შემდეგი ბანერი"
              className="absolute right-4 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-lg text-btnDark shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white active:scale-95 lg:flex"
            >
              →
            </button>
          </>
        )}

        {/* DOTS */}
        {suppliersData.length > 1 && (
          <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
            {suppliersData.map((banner, index) => {
              const isActive = index === current;

              return (
                <button
                  key={banner.id}
                  type="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`ბანერი ${index + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-8 bg-btnDark"
                      : "w-1.5 bg-light3 hover:bg-light2"
                  }`}
                />
              );
            })}
          </div>
        )}

        {/* PROGRESS BAR */}
        {suppliersData.length > 1 && (
          <div className="absolute bottom-0 left-0 z-30 h-[3px] w-full bg-black/[0.06]">
            <div
              key={current}
              className="h-full bg-btnDark"
              style={{
                animation: isPaused
                  ? "none"
                  : `bannerProgress ${AUTOPLAY_TIME}ms linear`,
              }}
            />
          </div>
        )}
      </div>

      {/* ANIMATION */}
      <style>{`
        @keyframes bannerProgress {
          from {
            width: 0%;
          }

          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}

export default DynamicBanner;
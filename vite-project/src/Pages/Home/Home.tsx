import "./Home.css";
import Banner from "../../Components/Banner.tsx"
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { API_URL } from "../../../config";
import type {StationeryDataType, SuppliersDataType,} from "../../dataType.ts";
import ProductCard from "../../Components/ProductCard.tsx";
import type { RootState } from "../../state/store.ts";
import { useAppDispatch, useAppSelector } from "../../state/hooks.ts";
import {addFavItem, removeFavItem,} from "../../state/StateSlices/favoriteSlice.ts";

export default function Home() {
  const dispatch = useAppDispatch();
  const favItemId = useAppSelector((state: RootState) => state.favorite.favItemIdList);
  const [suppliersData, setSuppliersData] = useState<SuppliersDataType[]>([]);
  const [productData, setProductData] = useState<StationeryDataType[]>([]);
  const productsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const getSuppliersData = async () => {
      const response = await fetch(`${API_URL}/suppliers`);
      const data = await response.json();
      setSuppliersData(data);
    };
    getSuppliersData();
  }, []);

  useEffect(() => {
    const getProductsData = async () => {
      const response = await fetch(`${API_URL}/stationery`);
      const data = await response.json();
      setProductData(data);
    };
    getProductsData();
  }, []);

  const updateScrollButtons = () => {
    const container = productsRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft + container.clientWidth <
        container.scrollWidth - 1
    );
  };

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [productData]);
  const scrollProducts = (direction: "left" | "right") => {
    const container = productsRef.current;
    if (!container) return;
    container.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  const toggleFavItem = (id: number) => {
    if (favItemId.includes(id)) {
      dispatch(removeFavItem(id));
    } else {
      dispatch(addFavItem(id));
    }
  };

  return (
    <>
      <section className="BannerSec">
        <Banner/>
      </section>
      <section className="stationarySec">
        <div className="productSection">

          <div className="heading">
            <h2 className="homeSecHeader">
          აარჩიეთ თქვენთვის სასურველი საკანცელარიო ნივთები
        </h2>
          </div>

          <div className="carouselWrapper">

            {/* Left arrow */}
            {canScrollLeft && (
              <button
                type="button"
                onClick={() => scrollProducts("left")}
                aria-label="წინა პროდუქტები"
                className="carouselArrow carouselArrowLeft"
              >
                <FaChevronLeft />
              </button>
            )}

            {/* Products */}
            <div
              ref={productsRef}
              onScroll={updateScrollButtons}
              className="products"
            >
              {productData.map((item) => (
                <div
                  key={item.id}
                  className="productItem"
                >
                  <ProductCard
                    className=""
                    id={`stationery/${item.id}`}
                    name={item.name}
                    price={item.price}
                    currency={item.currency}
                    thumbnail={item.thumbnail}
                  />

                  <button
                    type="button"
                    onClick={() => toggleFavItem(Number(item.id))}
                    aria-label="რჩეულებში დამატება"
                    className="favIcon"
                  >
                    <CiHeart className="icon text-btnLight" />

                    {favItemId.includes(Number(item.id)) && (
                      <FaHeart className="icon activeHeart" />
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Right arrow */}
            {canScrollRight && (
              <button
                type="button"
                onClick={() => scrollProducts("right")}
                aria-label="შემდეგი პროდუქტები"
                className="carouselArrow carouselArrowRight"
              >
                <FaChevronRight />
              </button>
            )}

          </div>
        </div>
      </section>

      <section className="suppliers">
        <h2 className="homeSecHeader">
          ჩვენი პარტნიორები
        </h2>

        <div className="suppliersList">
          {suppliersData.map((item) => (
            <div
              key={item.id}
              className="supplierItem"
            >
              <img
                src={item.logo}
                title={item.name}
                alt={item.name}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
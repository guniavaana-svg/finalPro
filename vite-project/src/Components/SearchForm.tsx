import React, { useState, useEffect, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import {
  Heart,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Filter,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { API_URL } from "../../config";

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  brand: string;
  price: number;
  currency: string;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  tags?: string[];
  thumbnail: string;
  supplier: string;
}

function SearchForm() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  const [activeIndex, setActiveIndex] = useState(0);

  // ძებნისა და ფილტრაციის State-ები
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSupplier, setSelectedSupplier] = useState("all");
  const [sortByPrice, setSortByPrice] = useState<"default" | "asc" | "desc">("default");

  // მონაცემების წამოღება API-დან
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/stationery`);
        if (!response.ok) {
          throw new Error("მონაცემების წამოღება ვერ მოხერხდა");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "შეცდომა მოხდა");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // კატეგორიებისა და მომწოდებლების სია
  const categories = useMemo(() => {
    const cats = products.map((p) => p.category).filter(Boolean);
    return Array.from(new Set(cats));
  }, [products]);

  const suppliers = useMemo(() => {
    const supps = products.map((p) => p.supplier).filter(Boolean);
    return Array.from(new Set(supps));
  }, [products]);

  // ფილტრაციისა და ძებნის ლოგიკა
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          product.name?.toLowerCase().includes(q) ||
          product.description?.toLowerCase().includes(q) ||
          product.brand?.toLowerCase().includes(q) ||
          product.tags?.some((t) => t.toLowerCase().includes(q));

        const matchesCategory =
          selectedCategory === "all" || product.category === selectedCategory;

        const matchesSupplier =
          selectedSupplier === "all" || product.supplier === selectedSupplier;

        return matchesSearch && matchesCategory && matchesSupplier;
      })
      .sort((a, b) => {
        if (sortByPrice === "asc") return a.price - b.price;
        if (sortByPrice === "desc") return b.price - a.price;
        return 0;
      });
  }, [products, searchQuery, selectedCategory, selectedSupplier, sortByPrice]);

  // ფილტრების გასუფთავება
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedSupplier("all");
    setSortByPrice("default");
    setActiveIndex(0);
  };

  // სლაიდერის გვერდები
  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;

  useEffect(() => {
    setActiveIndex(0);
  }, [searchQuery, selectedCategory, selectedSupplier, sortByPrice]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentProducts = filteredProducts.slice(
    activeIndex * itemsPerPage,
    (activeIndex + 1) * itemsPerPage
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-[#edf2fb] py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center font-sans space-y-6">
      <div className="max-w-7xl w-full mx-auto space-y-6">
        
        {/* შენი SearchForm დიზაინი + ფილტრები */}
        <div className="bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-white/80 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* შენი ორიგინალი საძიებო ფორმა */}
          <form
            onSubmit={handleSearchSubmit}
            action="#"
            className="flex items-center justify-center gap-2 w-full md:w-auto"
          >
            <div className="flex items-center gap-2 p-2 border-2 border-[#28b485] rounded-full shadow-sm bg-white w-full md:w-80">
              <FaSearch className="text-[#28b485] text-lg flex-shrink-0" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search here..."
                className="outline-none px-2 py-1 flex-1 text-gray-700 bg-transparent text-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-gray-400 hover:text-gray-600 pr-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <input
              type="submit"
              value="Go"
              className="bg-[#28b485] text-white px-4 py-2 rounded-full cursor-pointer hover:bg-[#fff] hover:text-[#28b485] border-2 border-[#28b485] transition font-medium text-sm flex-shrink-0"
            />
          </form>

          {/* დამატებითი ფილტრები */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
            {/* კატეგორია */}
            <div className="flex items-center gap-1.5 bg-[#f8fafc] border border-gray-200 px-3 py-2 rounded-full text-xs sm:text-sm font-medium text-gray-700">
              <Filter className="w-4 h-4 text-[#28b485]" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="all">ყველა კატეგორია</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* მომწოდებელი */}
            <div className="flex items-center gap-1.5 bg-[#f8fafc] border border-gray-200 px-3 py-2 rounded-full text-xs sm:text-sm font-medium text-gray-700">
              <select
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="all">ყველა მომწოდებელი</option>
                {suppliers.map((sup) => (
                  <option key={sup} value={sup}>
                    {sup}
                  </option>
                ))}
              </select>
            </div>

            {/* სორტირება */}
            <div className="flex items-center gap-1.5 bg-[#f8fafc] border border-gray-200 px-3 py-2 rounded-full text-xs sm:text-sm font-medium text-gray-700">
              <SlidersHorizontal className="w-4 h-4 text-[#28b485]" />
              <select
                value={sortByPrice}
                onChange={(e) => setSortByPrice(e.target.value as any)}
                className="bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="default">სორტირება</option>
                <option value="asc">ფასი: დაბლიდან მაღლა</option>
                <option value="desc">ფასი: მაღლიდან დაბლა</option>
              </select>
            </div>

            {(searchQuery || selectedCategory !== "all" || selectedSupplier !== "all" || sortByPrice !== "default") && (
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-red-500 hover:text-red-700 px-2 py-1 transition-colors"
              >
                გასუფთავება
              </button>
            )}
          </div>
        </div>

        {/* სლაიდერის ნავიგაცია */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? "w-8 bg-[#28b485]"
                    : "w-6 bg-[#cbd5e1] hover:bg-[#94a3b8]"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="p-1.5 rounded-full bg-white text-gray-600 hover:bg-gray-100 shadow-sm transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-1.5 rounded-full bg-white text-gray-600 hover:bg-gray-100 shadow-sm transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* მთავარი კარუსელი და პროდუქტები */}
        <div className="bg-[#e0e8f9]/60 p-4 sm:p-6 rounded-3xl backdrop-blur-sm border border-white/60 shadow-sm relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            
            {/* მარცხენა ბანერი */}
            <div className="lg:col-span-4 bg-gradient-to-br from-[#dbe2f4] via-[#e2e8f8] to-[#c7d7f7] rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden min-h-[320px]">
              <div className="space-y-4 z-10">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-[#28b485] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md rotate-[-6deg]">
                    ✎
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xl text-[#1e293b] leading-tight">
                      Office Plus
                    </h3>
                    <p className="text-[10px] tracking-widest text-[#64748b] font-semibold uppercase">
                      Stationery & More
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] leading-tight">
                    სკოლისთვის ყველაფერი <br className="hidden sm:block" /> ერთ სივრცეში
                  </h2>
                  <p className="text-sm text-[#475569] mt-2 font-medium">
                    საკანცელარიო ნივთებზე სპეციალური ფასდაკლება — 20%-მდე.
                  </p>
                </div>
              </div>

              <div className="pt-6 z-10">
                <button className="bg-[#ff6b2c] hover:bg-[#f95710] text-white font-bold py-3 px-6 rounded-full flex items-center gap-2 transition-all shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-0.5 text-sm">
                  იხილეთ შეთავაზება <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="absolute bottom-0 right-0 w-36 h-36 sm:w-44 sm:h-44 opacity-90 pointer-events-none transform translate-x-4 translate-y-4">
                <img
                  src="https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=300&auto=format&fit=crop"
                  alt="School items"
                  className="w-full h-full object-contain rounded-tl-full"
                />
              </div>
            </div>

            {/* მარჯვენა პროდუქტების სექცია */}
            <div className="lg:col-span-8 overflow-hidden min-h-[360px] flex items-center justify-center">
              {loading ? (
                <div className="flex items-center gap-2 text-[#28b485] font-semibold">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>მონაცემები იტვირთება...</span>
                </div>
              ) : error ? (
                <div className="text-red-500 font-medium text-center">
                  {error}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-10 text-gray-500 font-medium space-y-2">
                  <p className="text-lg">პროდუქტი ვერ მოიძებნა 🔍</p>
                  <p className="text-sm text-gray-400">
                    სცადე სხვა საძიებო სიტყვა ან გაასუფთავე ფილტრები.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 h-full w-full">
                  {currentProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative group/card"
                    >
                      {/* ფავორიტი */}
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className="absolute top-6 right-6 z-10 text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full bg-white/80 backdrop-blur-sm"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            favorites[product.id]
                              ? "fill-red-500 text-red-500"
                              : "stroke-[2]"
                          }`}
                        />
                      </button>

                      {/* სურათი */}
                      <div className="bg-[#f1f5f9] rounded-xl p-2 mb-3 flex items-center justify-center h-44 overflow-hidden">
                        <img
                          src={product.thumbnail}
                          alt={product.name}
                          className="h-full w-full object-cover rounded-lg group-hover/card:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* დეტალები */}
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-[#0f172a] line-clamp-2 min-h-[40px]">
                          {product.name}
                        </h4>
                        <p className="text-xs text-[#94a3b8] font-medium">
                          {product.brand} • {product.supplier}
                        </p>
                      </div>

                      {/* ფასი */}
                      <div className="mt-4 flex justify-end">
                        <div className="bg-[#28b485] text-white px-3 py-1.5 rounded-lg font-bold text-sm flex items-center gap-1 shadow-sm">
                          <span>{product.price.toFixed(2)}</span>
                          <span className="text-xs font-semibold">₾</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
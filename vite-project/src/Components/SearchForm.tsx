import React, { useState, useEffect, useMemo } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import {
  Loader2,
  Filter,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { API_URL } from "../../config";
import ProductCard from "./ProductCard";
import { FiSearch } from "react-icons/fi";

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
  // const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  const [shearchIsOpen, setShearchIsOpen] = useState<boolean>(false);

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

  // const toggleFavorite = (id: number) => {
  //   setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  // };

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
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <button onClick={() => setShearchIsOpen(true)} className="Btn flex">
        <FiSearch />
        <span className="sm:flex hidden">ძიება</span>
      </button>
      {shearchIsOpen && 
                         <div onClick={()=>setShearchIsOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-dark1 bg-opacity-50 dark:bg-opacity-80 dark:bg-darkshadow">
                            <div  onClick={(e) => e.stopPropagation()} className="relative max-w-[95vw] h-[95vh] overflow-hidden shadow-lg dark:shadow-darkshadow bg-light1 dark:bg-dark2 p-2 flex flex-col justify-start">
                                <button className="absolute top-0 right-0 -translate-x-1/2 translate-y-1/2  text-btnLight dark:text-light2 text-xl"  onClick={()=>setShearchIsOpen(false)}><FaTimes className=""/></button>
                                <div className="min-h-screen bg-[#f3f5fc] py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center font-sans space-y-6">
<div className="max-w-7xl w-full mx-auto px-4 sm:px-6 space-y-6">
    
    {/* SearchForm დიზაინი + ფილტრები */}
    <div className="bg-white/90 backdrop-blur-md p-4 sm:p-6 rounded-xl border border-[#dce4f8] shadow-[0_8px_24px_rgba(48,72,140,0.08)] flex flex-col md:flex-row gap-4 items-center justify-between">
      
      {/* ორიგინალი საძიებო ფორმა */}
      <form
        onSubmit={handleSearchSubmit}
        action="#"
        className="flex items-center justify-center gap-2 w-full md:w-auto"
      >
        <div className="flex items-center gap-2 p-2 border-2 border-[#3857b7] rounded-md shadow-sm bg-white w-full md:w-80">
          <FaSearch className="text-[#3857b7] text-lg flex-shrink-0" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ძებნა..."
            className="outline-none px-2 py-1 flex-1 text-gray-700 bg-transparent text-sm min-w-0"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-gray-400 hover:text-gray-600 pr-1 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <input
          type="submit"
          value="Go"
          className="bg-[#3857b7] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#fff] hover:text-[#3857b7] border-2 border-[#3857b7] transition font-medium text-sm flex-shrink-0"
        />
      </form>

      {/* დამატებითი ფილტრები */}
      <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
        {/* კატეგორია */}
        <div className="flex items-center gap-1.5 bg-[#f7f9ff] border border-[#dce4f8] px-3 py-2 rounded-md text-xs sm:text-sm font-medium text-gray-700">
          <Filter className="w-4 h-4 text-[#3857b7] flex-shrink-0" />
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
        <div className="flex items-center gap-1.5 bg-[#f7f9ff] border border-[#dce4f8] px-3 py-2 rounded-md text-xs sm:text-sm font-medium text-gray-700">
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
        <div className="flex items-center gap-1.5 bg-[#f7f9ff] border border-[#dce4f8] px-3 py-2 rounded-md text-xs sm:text-sm font-medium text-gray-700">
          <SlidersHorizontal className="w-4 h-4 text-[#3857b7] flex-shrink-0" />
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

    {/* პროდუქტები (ვერტიკალური სქროლით და ჰორიზონტალური overflow-ის ბლოკირებით) */}
    <div className="w-full overflow-x-hidden overflow-y-auto max-h-[calc(100vh-220px)] pr-2">
      {loading ? (
        <div className="flex items-center gap-2 text-[#3857b7] font-semibold py-8">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>მონაცემები იტვირთება...</span>
        </div>
      ) : error ? (
        <div className="text-red-500 font-medium text-center py-8">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          {filteredProducts.map((product) => (
            <div
              className="relative productItem w-full rounded-xl shadow-lg dark:shadow-darkshadow overflow-hidden bg-white"
              key={product.id}
            >
              <ProductCard
                name={product.name}
                price={product.price}
                currency={product.currency}
                thumbnail={product.thumbnail}
                id={`stationery/${product.id}`}
                onProductClick={() => setShearchIsOpen(false)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
</div>
    </div>
                            </div>
                        </div>
      }
    </>
  );
}

export default SearchForm;
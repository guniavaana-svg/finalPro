import { FaSearch } from "react-icons/fa";

function SearchForm() {
  return (
    <form
      action="#"
      className="flex items-center justify-center gap-2"
    >
        <div className="flex items-center gap-2 p-2 border-2 border-[#28b485] rounded-full shadow-sm bg-white">
            <FaSearch className="text-[#28b485] text-lg" />
            <input
                type="search"
                placeholder="Search here..."
                className="outline-none px-2 py-1 flex-1 text-gray-700"
            />
        </div>
        <input
        type="submit"
        value="Go"
        className="bg-[#28b485] text-white px-4 py-1 rounded-full cursor-pointer hover:bg-[#fff] hover:text-[#28b485] transition"
        />
    </form>
  );
}

export default SearchForm;
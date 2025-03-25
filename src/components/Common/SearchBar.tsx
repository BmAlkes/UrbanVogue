import { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, SetIsOpen] = useState(false);

  const handleSearchToogle = () => {
    SetIsOpen(!isOpen);
  };
  const handleSearch = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    SetIsOpen(false)
  };

  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-60 " : "w-auto"
      }`}
    >
      {isOpen ? (
        <form
          onSubmit={handleSearch}
          className="relative flex items-center justify-center w-full"
        >
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
            />

            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-800"
            >
              <HiMagnifyingGlass />
            </button>
          </div>
          <button
            onClick={handleSearchToogle}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            <HiMiniXMark className="h-6 w-6" />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToogle}>
          <HiMagnifyingGlass className="text-gray-700 hover:text-black" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;

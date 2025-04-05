import { useSearchParams } from "react-router-dom";

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortBy = event.target.value;
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
  };

  return (
    <div className="mb-4 flex items-center justify-end">
      <select
        id="sort"
        className="border p-2 rounded focus:outline"
        onChange={handleSortChange}
        value={searchParams.get("sortBy") || "default"}
      >
        <option value="default">Deafult</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>;
        <option value="popularity">Popularity</option>
        <option value="nameAsc">Name: A to Z</option>
      </select>
    </div>
  );
};

export default SortOptions;

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// Update the interface with an index signature for dynamic access
interface FilterProps {
  category: string;
  gender: string;
  color: string;
  size: string[];
  material: string[];
  brand: string[];
  minPrice: number;
  maxPrice: number;
  [key: string]: string | string[] | number; // Add index signature
}

const FilterSideBar = () => {
  const [serchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterProps>({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const categories = ["Top Wear", "Bottom Wear", "Footwear", "Accessories"];
  const colors = [
    "Red",
    "Blue",
    "Green",
    "Black",
    "White",
    "Yellow",
    "Pink",
    "Beige",
    "Navy",
  ];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = [
    "Cotton",
    "Polyester",
    "Wool",
    "Silk",
    "Leather",
    "Linen",
    "Fleece",
    "Denim",
    "Nylon",
  ];
  const brands = [
    "Urban Threads",
    "Fashion Hub",
    "Style Street",
    "Chic Boutique",
    "Trendy Wear",
    "Classic Couture",
    "Modern Attire",
    "Casual Corner",
    "Elegant Essentials",
  ];
  const gender = ["Men", "Women"];

  useEffect(() => {
    const params = Object.fromEntries([...serchParams]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice ? parseInt(params.minPrice) : 0,
      maxPrice: params.maxPrice ? parseInt(params.maxPrice) : 100,
    });
    setPriceRange([0, Number(params.maxPrice) || 100]);
  }, [serchParams]);

  // Handle input changes (checkboxes, radio buttons)
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };
    
    if (type === "checkbox") {
      // Type assertion to tell TypeScript this is a string array
      if (checked) {
        (newFilters[name] as string[]) = [...(newFilters[name] as string[]), value];
      } else {
        (newFilters[name] as string[]) = (newFilters[name] as string[]).filter(
          (item: string) => item !== value
        );
      }
    } else if (type === "radio") {
      // For radio buttons
      newFilters[name] = value;
    }
    
    setFilters(newFilters);
    updateSearchParams(newFilters);
  };



  // New handler specifically for color buttons
  const handleColorClick = (color: string) => {
    const newFilters = { ...filters, color };
    setFilters(newFilters);
    updateSearchParams(newFilters);
  };

  // Handle price range changes
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const newPriceRange: [number, number] = [0, value];
    setPriceRange(newPriceRange);
    
    const newFilters = {
      ...filters,
      maxPrice: value
    };
    setFilters(newFilters);
    updateSearchParams(newFilters);
  };

  // Update URL search params
  const updateSearchParams = (filters: FilterProps) => {
    const params = new URLSearchParams();
    
    // Only add non-empty values to the URL
   Object.keys(filters).forEach((key) => {
    if(Array.isArray(filters[key])&& filters[key].length > 0) {
    params.append(key, filters[key].join(","));
    }else if(filters[key]){
      params.append(key, filters[key] as string);
    }
   });
    
    setSearchParams(params);
    navigate(`?${params.toString()}`)
  };

  return (
    <div className="p-4">
      <h3 className="block text-gray-800 font-medium mb-2">Filter</h3>
      
      {/* Category filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {categories.map((cat) => (
          <div className="flex items-center mb-1" key={cat}>
            <input
              type="radio"
              name="category"
              value={cat}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              onChange={handleFilterChange}
              checked={filters.category === cat}
            />
            <span className="text-gray-700 text-xs">{cat}</span>
          </div>
        ))}
      </div>

      {/* Gender filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Gender</label>
        {gender.map((gen) => (
          <div className="flex items-center mb-1" key={gen}>
            <input
              type="radio"
              name="gender"
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              value={gen}
              onChange={handleFilterChange}
              checked={filters.gender === gen}
            />
            <span className="text-gray-700 text-xs">{gen}</span>
          </div>
        ))}
      </div>
      
      {/* Color filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Colors</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => handleColorClick(color)}
              className={`w-8 h-8 border cursor-pointer rounded-full transition hover:scale-105 ${
                filters.color === color ? 'ring-2 ring-blue-500 ring-offset-2' : 'border-gray-300'
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
              aria-label={`Select ${color} color`}
            ></button>
          ))}
        </div>
      </div>
      
      {/* Size filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Sizes</label>
        {sizes.map((size) => (
          <div className="flex items-center mb-1" key={size}>
            <input
              type="checkbox"
              name="size"
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              value={size}
              onChange={handleFilterChange}
              checked={(filters.size as string[]).includes(size)}
            />
            <span className="text-gray-700 text-xs">{size}</span>
          </div>
        ))}
      </div>
      
      {/* Material filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Material</label>
        {materials.map((material) => (
          <div className="flex items-center mb-1" key={material}>
            <input
              type="checkbox"
              name="material"
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              value={material}
              onChange={handleFilterChange}
              checked={(filters.material as string[]).includes(material)}
            />
            <span className="text-gray-700 text-xs">{material}</span>
          </div>
        ))}
      </div>
      
      {/* Brands filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Brands</label>
        {brands.map((brand) => (
          <div className="flex items-center mb-1" key={brand}>
            <input
              type="checkbox"
              name="brand"
              value={brand}
              onChange={handleFilterChange}
              checked={(filters.brand as string[]).includes(brand)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700 text-xs">{brand}</span>
          </div>
        ))}
      </div>
      
      {/* Price filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Price</label>
        <input
          type="range"
          min={0}
          max={100}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
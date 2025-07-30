import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSideBar, { FilterProps } from "../components/Products/FilterSideBar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchProductsByFilters } from "../redux/slices/productSlices";



const CollectionPage = () => {
  const{collection} = useParams()
  const [searchParams]= useSearchParams()
  const dispatch = useAppDispatch()
  const {products,loading,error}= useAppSelector((state)=>state.products)
const queryParamsObject: Partial<FilterProps> = {};

searchParams.forEach((value, key) => {
  // Convert strings em arrays onde necessário (ex: size, material, brand)
  if (["size", "material", "brand"].includes(key)) {
    if (queryParamsObject[key as keyof FilterProps]) {
      (queryParamsObject[key as keyof FilterProps] as string[]).push(value);
    } else {
      queryParamsObject[key as keyof FilterProps] = [value] as any;
    }
  } else if (["minPrice", "maxPrice", "limit"].includes(key)) {
    queryParamsObject[key as keyof FilterProps] = Number(value) as any;
  } else {
    queryParamsObject[key as keyof FilterProps] = value as any;
  }
});

  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

useEffect(()=>{
  dispatch(fetchProductsByFilters({collection, ...queryParamsObject}))
},[dispatch,collection,searchParams])

  const handleClickOutside = (event: MouseEvent) => {
    if(sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSideBarOpen(false);
  }
}

  useEffect(()=>{
    document.addEventListener("mousedown", handleClickOutside); 
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  },[])

  return (
    <div className="flex flex-col lg:flex-row">
      {/* mobile filter button */}
      <button className="lg:hidden border p-2 flex justify-center items-center"onClick={toggleSideBar}>
        <FaFilter className="mr-2" /> Filters
      </button>
      {/* Filter side bar */}
      <div ref={sidebarRef}  className={` ${isSideBarOpen?"translate-x-0":"-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 ease-in-out lg:static lg:translate-x-0`}>
        <FilterSideBar />
      </div>
      <div className=" flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4"> All Collection</h2>
        {/* Short Options */}
        <SortOptions/>

        {/* Products Grid */}
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;

import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSideBar from "../components/Products/FilterSideBar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";

interface ProductImage {
  url: string;
}

// Main product interface
interface ProductProps {
  _id: number;
  name: string;
  price: number;
  images: ProductImage[];
}

const CollectionPage = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

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

  useEffect(() => {
    setTimeout(() => {
      const fetchProducts = [
        {
          _id: 4,
          name: "Product 1",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/500/500/?random=11",
            },
          ],
        },
        {
          _id: 5,
          name: "Product 2",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/500/500/?random=12",
            },
          ],
        },
        {
          _id: 6,
          name: "Product 3",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/500/500/?random=13",
            },
          ],
        },
        {
          _id: 7,
          name: "Product 4",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/500/500/?random=14",
            },
          ],
        },
        {
          _id: 8,
          name: "Product 1",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/500/500/?random=15",
            },
          ],
        },
        {
          _id: 9,
          name: "Product 2",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/500/500/?random=16",
            },
          ],
        },
        {
          _id: 10,
          name: "Product 3",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/500/500/?random=17",
            },
          ],
        },
        {
          _id: 11,
          name: "Product 4",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/500/500/?random=18",
            },
          ],
        },
      ];
      setProducts(fetchProducts);
    }, 1000);
  }, []);
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
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default CollectionPage;

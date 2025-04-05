import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const newArrival = [
    {
      _id: "1",
      name: "Stylist Jacket",
      price: 120,
      images: [
        {
          url: "https://picsum.photos/500/500/?random=1",
          altText: "Stylist Jacket",
        },
      ],
    },
    {
      _id: "2",
      name: "Stylist Jacket",
      price: 120,
      images: [
        {
          url: "https://picsum.photos/500/500/?random=2",
          altText: "Stylist Jacket",
        },
      ],
    },
    {
      _id: "3",
      name: "Stylist Jacket",
      price: 289,
      images: [
        {
          url: "https://picsum.photos/500/500/?random=3",
          altText: "Stylist Jacket",
        },
      ],
    },
    {
      _id: "4",
      name: "Stylist Jacket",
      price: 99,
      images: [
        {
          url: "https://picsum.photos/500/500/?random=4",
          altText: "Stylist Jacket",
        },
      ],
    },
    {
      _id: "5",
      name: "Stylist Jacket",
      price: 230,
      images: [
        {
          url: "https://picsum.photos/500/500/?random=5",
          altText: "Stylist Jacket",
        },
      ],
    },
    {
      _id: "6",
      name: "Stylist Jacket",
      price: 210,
      images: [
        {
          url: "https://picsum.photos/500/500/?random=6",
          altText: "Stylist Jacket",
        },
      ],
    },
    {
      _id: "7",
      name: "Stylist Jacket",
      price: 210,
      images: [
        {
          url: "https://picsum.photos/500/500/?random=7",
          altText: "Stylist Jacket",
        },
      ],
    },
    {
      _id: "8",
      name: "Stylist Jacket",
      price: 210,
      images: [
        {
          url: "https://picsum.photos/500/500?random=8",
          altText: "Stylist Jacket",
        },
      ],
    },
  ];

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const offsetLeft = scrollRef.current?.offsetLeft || 0;
    setStartX(e.pageX - offsetLeft);
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const offsetLeft = scrollRef.current?.offsetLeft || 0;
    const x = e.pageX - offsetLeft;
    const walk = x - startX
    if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollLeft - walk;
      }
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false)
  };

  const scroll = (direction: string) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };
  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }
  };
  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return ()=> container.removeEventListener('scroll',updateScrollButtons)
    }
  },[]);
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4"> Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest styles straight off runway, freshly added to keep
          your wardrobe on the cutting edge of fashion.
        </p>
        {/* Scroll Buttons */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button
            className={`p-2 rounded border ${
              canScrollLeft
                ? "bg-white text-black"
                : "bg-slate-200 text-gray-400 cursor-not-allowed"
            }   `}
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
          >
            <FiChevronLeft />{" "}
          </button>
          <button
            className={`p-2 rounded border ${
              canScrollRight
                ? "bg-white text-black"
                : "bg-slate-200 text-gray-400 cursor-not-allowed"
            }   `}
            onClick={() => scroll("right")}
          >
            <FiChevronRight />{" "}
          </button>
        </div>
      </div>
      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${isDragging ? "cursor-grabbing":" cursor-grab"} `}
      >
        {newArrival.map((product) => (
          <div
            key={product._id}
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative"
          >
            <img
            draggable= "false"
              src={product.images[0]?.url}
              alt={product.images[0]?.altText}
              className="w-full md:h-[400px] h-[300px] object-cover rounded-lg"
            />
            <div className="absolute bottom-0 right-0 left-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
              <Link to={`/product/${product._id}`} className="block">
                <h4 className="font-medium">{product.name}</h4>
                <p className="mt-1">{product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;

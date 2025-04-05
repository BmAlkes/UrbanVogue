import Hero from "../components/Layout/Hero";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturedSection from "../components/Products/FeaturedSection";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductGrid from "../components/Products/ProductGrid";
import ProductsDetails from "../components/Products/ProductsDetails";

const Home = () => {

const placeHolderProducts=[
    {
        _id:4,
        name:"Product 1",
        price:100,
        images:[ {
            url: "https://picsum.photos/500/500/?random=11"}]
    },
    {
        _id:5,
        name:"Product 2",
        price:100,
        images:[ {
            url: "https://picsum.photos/500/500/?random=12"}]
    },
    {
        _id:6,
        name:"Product 3",
        price:100,
        images:[ {
            url: "https://picsum.photos/500/500/?random=13"}]
    },
    {
        _id:7,
        name:"Product 4",
        price:100,
        images:[ {
            url: "https://picsum.photos/500/500/?random=14"}]
    },
    {
        _id:8,
        name:"Product 1",
        price:100,
        images:[ {
            url: "https://picsum.photos/500/500/?random=15"}]
    },
    {
        _id:9,
        name:"Product 2",
        price:100,
        images:[ {
            url: "https://picsum.photos/500/500/?random=16"}]
    },
    {
        _id:10,
        name:"Product 3",
        price:100,
        images:[ {
            url: "https://picsum.photos/500/500/?random=17"}]
    },
    {
        _id:11,
        name:"Product 4",
        price:100,
        images:[ {
            url: "https://picsum.photos/500/500/?random=18"}]
    },
]

  return (
    <div>
      <Hero />
      <GenderCollectionSection/>
      <NewArrivals/>
      {/* BestSeller */}
      <h2 className="text-3xl text-center font-bold mb-4"> Best Seller</h2>
      <ProductsDetails/>
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
            Top Wears for Women
        </h2>
        <ProductGrid products={placeHolderProducts}/>
      </div>
      <FeaturedCollection/>
      <FeaturedSection/>
    </div>
  );
};

export default Home;

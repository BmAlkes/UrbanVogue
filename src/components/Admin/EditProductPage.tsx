import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { fecthProductDetails, updateProduct } from "../../redux/slices/productSlices";

interface Image {
  url: string;
}
interface ProductDataProps {
  name: string;
  price: number;
  sku: string;
  countInStock: number;
  description: string;
  category: string;
  brand: string;
  sizes: string[];
  colors: string[];
  colletion: string;
  material: string;
  gender: string;
  images: Image[];
}

const EditProductPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

const { id = "" } = useParams<{ id: string }>();
const {selectedProduct,loading,error}= useAppSelector((state) => state.products);

  const [productData, setProductData] = useState<ProductDataProps>({
    name: "",
    price: 0,
    sku: "",
    countInStock: 0,
    description: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    colletion: "",
    material: "",
    gender: "",
    images: [
    ],
  });


useEffect(()=>{
  if(id){
    dispatch(fecthProductDetails(id));
  }
},[dispatch, id]);

useEffect(()=>{
  if(selectedProduct){
    setProductData(selectedProduct)
  }
},[selectedProduct])
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = async(e: React.ChangeEvent<HTMLInputElement>) => {
    // Verifica se files não é null
    if (e.target.files) {
      // Se quiser pegar apenas o primeiro arquivo
      const file = e.target.files[0];
      if (file) {
        const newImage = {
          url: URL.createObjectURL(file)
        };
        setProductData((prevData) => ({
          ...prevData,
          images: [...prevData.images, newImage],
        }));
      }
    }
}

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
 
    dispatch(updateProduct({id, productData }));
    navigate("/admin/products");
}
if(loading) {
  return <div className="text-center p-4">Loading...</div>;  }
if (error) {
  return <div className="text-center p-4 text-red-500">Error: {error}</div>;}

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            rows={3}
            required
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Count in Stock</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="flex justify-between">

        <div className="mb-6">
          <label className="block font-semibold mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
            />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Brand</label>
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
            />
        </div>
            </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Sizes (Comma-separated)
          </label>
          <input
            type="text"
            name="sizes"
            value={productData.sizes.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(",").map((size) => size.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Colors (Comma-separated)
          </label>
          <input
            type="text"
            name="colors"
            value={productData.colors.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(",").map((color) => color.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-6">
            <label className="block font-semibold mb-2">Upload Images</label>
            <input type="file" onChange={handleImageUpload} />
            <div className="flex gap-4 mt-4">
                {productData.images.map((image, index) => (
                    <img key={index} src={image.url} alt={`Product Image ${index + 1}`} className="w-24 h-24 object-cover rounded-md shadow-lg" />
                ))}
            </div>
        </div>
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">Update Product</button>
      </form>
    </div>
  );
};

export default EditProductPage;

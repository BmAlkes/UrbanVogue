import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";

const TopBar = () => {
  return (
    <div className="bg-urban-blue text-white">
      <div className="container mx-auto flex justify-between items-center py-3">
        <div className="hidden md:flex gap-x-4 items-center ">
          <a href="#" className="hover:text-gray-300">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <RiTwitterXLine className="h-5 w-5" />
          </a>
        </div>
        <div className="text-sm text-center flex-grow">
          <span> We ship Worldwide - Fast and reliable shipping!</span>
        </div>
        <div className="hidden md:block text-sm">
          <a href="tel:+123456789" className="hover:text-gray-300">
            +1 (234) 456789
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

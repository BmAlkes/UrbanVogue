import { Link } from 'react-router-dom'
import menCollection from '../../assets/menColl.webp'
import womanCollection from '../../assets/womanCol.webp'

const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
        <div className="container mx-auto flex flex-col md:flex-row gap-8">
            {/* Woman Collection */}
            <div className="relative flex-1">
                <img src={womanCollection} alt="Woman collection" className='w-full h-[400px] md:h-[700px] object-cover rounded-xl' />
                <div className='absolute bottom-8 right-9 bg-white bg-opacity-90 p-4 rounded-3xl shadow-2xl shadow-black '>
                    <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                        Women's Collection
                    </h2>
                    <Link to="/collection/all?gender=Women" className='bg-black text-white px-3 py-2 text-sm rounded-3xl hover:bg-gray-800 transition-all'> Shop Now</Link>
                </div>
            </div>
            {/* men's collection */}
            <div className="relative flex-1 ">
                <img src={menCollection} alt="Woman collection" className='w-full h-[400px] md:h-[700px] object-cover rounded-xl' />
                <div className='absolute bottom-8 left-9 bg-white bg-opacity-90 p-4 rounded-3xl shadow-2xl shadow-black '>
                    <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                        Men's Collection
                    </h2>
                    <Link to="/collection/all?gender=Men" className='bg-black text-white px-3 py-2 text-sm rounded-3xl hover:bg-gray-800 transition-all'> Shop Now</Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default GenderCollectionSection
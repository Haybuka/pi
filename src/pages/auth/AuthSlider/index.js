import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';




import Cart from '../../../images/slider/cart.png'
import Buy from '../../../images/slider/buy.png'
import Discounts from '../../../images/slider/discounts.png'
import Shippings from '../../../images/slider/shipping.png'
// SwiperCore.use([Autoplay]);

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const AuthSlider = () => {

  const sliders = [
    {
      title: 'Modern Art',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate enim illo dolorem amet in ducimus dolor sit repudiandae adipisci eligendi.',
      img: Cart,
    },
    {
      title: 'Minimalism',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate enim illo dolorem amet in ducimus dolor sit repudiandae adipisci eligendi.',
      img: Buy,
    },
    {
      title: 'Mid-century modern',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate enim illo dolorem amet in ducimus dolor sit repudiandae adipisci eligendi.',
      img: Discounts,
    },
    {
      title: 'Art Deco',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate enim illo dolorem amet in ducimus dolor sit repudiandae adipisci eligendi.',
      img: Shippings,
    },

  ];
  return (
    <section className=''>
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper my-6"

      >
        {sliders.map((view, id) => (
          <SwiperSlide
            key={id}
            className=" lg:flex items-center justify-center p-20 w-full h-full"
          >

            <img src={view.img} className='w-full h-full' alt='product' />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default AuthSlider
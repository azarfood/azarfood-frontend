import 'swiper/css';
import 'swiper/css/pagination';

import Image from 'next/image';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Ad1 from '@/assets/images/sliders/burgers-restaurant-banner-template.png';

export default function Slider() {
  return (
    <>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className='rounded-lg border border-secondary-5 bg-transparent shadow-lg'
      >
        <SwiperSlide>
          <Image src={Ad1} alt='ads' />
        </SwiperSlide>

        <SwiperSlide>
          <Image src={Ad1} alt='ads' />
        </SwiperSlide>

        <SwiperSlide>
          <Image src={Ad1} alt='ads' />
        </SwiperSlide>

        <SwiperSlide>
          <Image src={Ad1} alt='ads' />
        </SwiperSlide>

        <SwiperSlide>
          <Image src={Ad1} alt='ads' />
        </SwiperSlide>

        <SwiperSlide>
          <Image src={Ad1} alt='ads' />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

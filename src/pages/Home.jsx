import React from 'react';
import HeroSection from '../components/HeroSection';
import Ticker from '../components/Ticker';
import Categories from '../components/Categories';
import CourseGrid from '../components/CourseGrid';
import IndustryLogos from '../components/IndustryLogos';
import Instructors from '../components/Instructors';
import Testimonials from '../components/Testimonials';

export default function Home() {
  return (
    <>
      <HeroSection />
      <Ticker />
      <Categories />
      <CourseGrid />
      <IndustryLogos />
      <Instructors />
      <Testimonials />
    </>
  );
}

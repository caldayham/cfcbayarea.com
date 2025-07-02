'use client';

import React from 'react';
import Image from 'next/image';
import CTAButton from '../CTAButton';

const HookBanner = () => {
  return (
    <div className="min-h-screen px-4 md:px-12 bg-white bg-grid flex items-center">
      <div className="max-w-6xl mx-auto pb-20 flex flex-col md:flex-row items-center gap-5 pt-8 md:pt-0">

        {/* Left: Text */}
        <div className="w-full md:basis-1/2 lg:basis-[60%] text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Get it done right.
          </h1>
          <p className="text-md md:text-2xl mb-8 text-secondary max-w-xl md:max-w-none mx-auto md:mx-0">
            Palo Alto brothers building the custom outdoor projects other companies won't touch!
          </p>
          <CTAButton href='/portfolio'>See Our Work</CTAButton>
        </div>

        {/* Right: Image */}
        <div className="w-full md:basis-1/2 lg:basis-[40%] flex justify-center relative overflow-visible">
          <div className="relative w-full max-w-[500px] h-auto">
            <Image
              src="/img/fynn_outdoor_table.png"
              alt="Fynn finishing an outdoor table"
              width={700}
              height={800}
              priority
              className="w-full h-auto drop-shadow-xl rounded-xl scale-[1] md:scale-[1.4]"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default HookBanner;

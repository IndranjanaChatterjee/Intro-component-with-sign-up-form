import React from "react";

export default function Text() {
  return (
    <div className="flex flex-col justify-center items-center text-[#ffffff] w-[40rem] md:h-[40rem] py-6 md:py-0 mb-5 md:mb-0">
      <h1 className="lg:text-left text-center text-[2rem] md:text-[3rem] font-bold mb-[1rem]">Learn to code by watching others</h1>

      <p className="lg:text-left text-center text-[1rem]">
        See how experienced developers solve problems in real-time. Watching
        scripted tutorials is great, but understanding how developers think is
        invaluable.
      </p>
    </div>
  );
}

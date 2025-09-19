import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <section className="h-screen flex flex-col md:flex-row justify-center items-center bg-gray-50 px-6 pt-20 md:pt-0">
      <div className="flex-1 text-center md:text-left md:pr-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-snug">
          "Your mental well-being matters. Take the first step towards a better
          tomorrow."
        </h2>
        <p className="mt-4 text-gray-600">
          Join us today and start your journey of self-growth, relief, and
          balance.
        </p>
        <div className="mt-6">
          <Link to="/signin">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Get Started
            </button>
          </Link>
        </div>
      </div>

      <div className="flex-1 mt-10 md:mt-0 flex justify-center">
        <video
          src="https://media.istockphoto.com/id/1355980984/video/young-woman-inhaling-and-looking-away-and-dreaming-in-a-trail.mp4?s=mp4-640x640-is&k=20&c=0viwRjynUvSpSwM-FKoCO8b3Dk2MAqrSclrw_SD85PE="
          autoPlay
          loop
          muted
          playsInline
          className="w-full max-w-2xl h-[500px] rounded-xl shadow-2xl object-cover"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default HomePage;

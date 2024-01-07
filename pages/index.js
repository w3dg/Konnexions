/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import EventsCard from "@/components/EventsCard";
import ServicesCard from "@/components/ServicesCard";
import TestimonialCard from "@/components/TestimonialCard";
import Carousel from "@/components/Carousel";

export async function getServerSideProps() {
  const resp = await axios.get(
    process.env.NODE_ENV == "production"
      ? "https://konnexions.netlify.app/api/landing"
      : "http://localhost:3000/api/landing"
  );

  return {
    props: {
      data: resp.data.data,
    },
  };
}

export default function Home({ data }) {
  const [currEvent, setCurrEvent] = useState(null);

  useEffect(() => {
    setCurrEvent(data.events.filter((event) => event.state == "register")[0]);
  }, [data.events]);
  const handleRegisterClick = () => window.open(currEvent.regLink, "_blank");

  data.events.sort((a, b) => {
    if (a.date < b.date) return 1;
    else if (a.date > b.date) return -1;
    else return 0;
  });

  const [events, setEvents] = useState(data.events.slice(0, 6));

  const handleAllEvents = () => {
    setEvents(data.events);
  };
  const handleLessEvents = () => {
    setEvents(data.events.slice(0, 6));
    document.getElementById("Events").scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="h-screen w-screen fixed inset-0 bg-[#02001A] overflow-hidden scrollbar-hide">
      <Head>
        <title>Konnexions | KIIT </title>
      </Head>
      <div className="absolute inset-0 h-full w-full z-0">
        <div className="colorst" />
        <div className="colorsb" />
      </div>
      <div className="h-full w-full relative overflow-y-auto overflow-x-hidden mb-44 pb-44 scrollbar-hide">
        <div className="absolute z-10 h-fit w-full pt-32 pb-28 md:pb-2 lg:pt-44 px-6 md:px-12 lg:px-24">
          <div>
            <h1 className="text-center text-white text-3xl lg:text-6xl font-bold lg:font-extrabold leading-[1.6]">
              {data.mainHeading}
            </h1>
            <div className="flex items-center space-x-6 justify-center text-white text-sm lg:text-xl mt-7 lg:mt-16">
              {data.arrayFeat.map((item, index) => (
                <React.Fragment key={index}>
                  <span>{item}</span>
                  {index !== data.arrayFeat.length - 1 && (
                    <span className="text-white/70">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="lg:px-44 text-xs text-white text-center mt-10 lg:mt-16 leading-8 lg:leading-10">
              <p>{data.description}</p>
            </div>
            <div className="flex items-center justify-center space-x-4 mt-10 lg:mt-16">
              {data.socialMedias.map((item) => {
                return (
                  <a
                    aria-label={item.name}
                    key={item.name}
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      priority
                      placeholder="blur"
                      blurDataURL="/images/spinner.svg"
                      height={item.icon.height}
                      width={item.icon.width}
                      src={item.icon.url}
                      alt={item.name}
                      className="h-8 w-8 cursor-pointer"
                    />
                  </a>
                );
              })}
            </div>
            {currEvent && (
              <div
                onClick={handleRegisterClick}
                className="flex items-center justify-center mt-4 cursor-pointer"
              >
                <div className="h-16 hover:bg-white/5 border border-white/20 rounded-lg flex items-center px-2 transition-all z-30">
                  <div className="h-12 w-12 relative">
                    <Image
                      src="/images/calendarIcon.png"
                      className="absolute inset-0"
                      alt="calendarIcon"
                    />
                    <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-800">
                      {currEvent.date.split("-")[2]}
                    </div>
                  </div>
                  <div className="ml-4 mr-4">
                    <h2 className="text-white font-semibold text-sm">
                      {currEvent.name}
                    </h2>
                    <span className="text-[10px] text-white">
                      {currEvent.date}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-56">
            <h2 className="text-center text-white text-xl lg:text-3xl font-bold lg:font-extrabold leading-[1.6]">
              {data.serviceHeading}
            </h2>
            <p className="text-white/70 text-sm text-center mt-3">
              {data.serviceDescription}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:justify-center place-items-center mt-16">
              {data.services.map((item, i) => {
                return <ServicesCard data={item} key={`service_${i}`} />;
              })}
            </div>
          </div>
          <div className="mt-56" id="Events">
            <h2 className="text-center text-white text-xl lg:text-3xl font-bold lg:font-extrabold leading-[1.6]">
              {data.eventsHeading}
            </h2>
            <p className="text-white/70 text-sm text-center mt-3">
              {data.eventsDescription}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:justify-center place-items-center mt-16">
              {events.map((item, i) => {
                return <EventsCard data={item} key={`event_${i}`} />;
              })}
            </div>
            {data.events.length > 6 && (
              <div className="flex justify-center mt-10">
                {events.length === 6 ? (
                  <button
                    className="py-2 px-8 rounded-md cursor-pointer bg-[#0D1527]/80 text-white hover:bg-[#02003A]"
                    onClick={handleAllEvents}
                  >
                    Show All
                  </button>
                ) : (
                  <button
                    className="py-2 px-8 rounded-md cursor-pointer bg-[#0D1527]/80 text-white hover:bg-[#02003A]"
                    onClick={handleLessEvents}
                  >
                    Show Less
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="mt-56">
            <h2 className="text-center text-white text-xl lg:text-3xl font-bold lg:font-extrabold leading-[1.6]">
              {data.testimonialHeading}
            </h2>
            <p className="text-white/70 text-sm text-center mt-3">
              {data.testimonialDescription}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:justify-center place-items-center mt-16">
              {data.testimonials.map((item, i) => {
                return <TestimonialCard data={item} key={`service_${i}`} />;
              })}
            </div>
          </div>
          <div className="mt-56 sm:mb-16 md:mb-4">
            <h2 className="text-center text-white text-xl lg:text-3xl font-bold lg:font-extrabold leading-[1.6]">
              {data.galleryHeading}
            </h2>
            <p className="text-white/70 text-sm text-center mt-3">
              {data.galleryDescription}
            </p>
            <Carousel images={data.images} />
          </div>
          <h6 className="text-center text-white text-base mt-10 hidden md:block">
            © {new Date().getFullYear()} KIIT Konnexions
          </h6>
        </div>
      </div>
    </div>
  );
}

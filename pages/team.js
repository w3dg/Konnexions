/* eslint-disable @next/next/no-img-element */
import React from "react";
import axios from "axios";
import MemberCard from "@/components/MemberCard";
import Star from "@/components/Star";
import Head from "next/head";

export async function getServerSideProps() {
  const resp = await axios.get(
    process.env.NODE_ENV == "production"
      ? "https://konnexions.netlify.app/api/member"
      : "http://localhost:3000/api/member"
  );

  return {
    props: {
      data: resp.data.data,
    },
  };
}

export default function Teams({ data }) {
  data.leads.sort((a, b) => {
    if (a.name < b.name) return -1;
    else if (a.name > b.name) return 1;
    else return 0;
  });
  data.member.sort((a, b) => {
    if (a.domain < b.domain) return -1;
    else if (a.domain > b.domain) return 1;
    else {
      if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      else return 0;
    }
  });

  return (    
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-[#02001A]">
      <Head>
        <title>Team | Konnexions</title>
      </Head>
      <Star />
      <div className="h-full w-full relative overflow-y-auto overflow-x-hidden mb-44 pb-44 scrollbar-hide">
        <div className="absolute z-10 h-fit w-full pt-32 pb-28 lg:pt-44 px-6 lg:px-24">
          <h1 className="text-center text-white text-2xl lg:text-5xl font-bold lg:font-extrabold leading-[1.6]">
            {data.heading}
          </h1>
          <p className="lg:px-44 text-xs lg:text-sm mt-5 lg:mt-7 text-white/70 text-center leading-8 lg:leading-10">
            {data.description}
          </p>

          <div className="mt-36">
            <div className="flex items-center justify-center space-x-8 lg:space-x-16">
              <div className="w-56 h-[1px] bg-gradient-to-r from-transparent to-white" />
              <h2 className="text-white text-xl font-medium whitespace-nowrap">
                Faculty-in-Charge
              </h2>
              <div className="w-56 h-[1px] bg-gradient-to-l from-transparent to-white" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:justify-center place-items-center mt-16">
              {data.others.map((member, i) => {
                if (member.domain == "Faculty-in-Charge") {
                  return <MemberCard data={member} key={i} />;
                }
              })}
            </div>
          </div>

          <div className="mt-36">
            <div className="flex items-center justify-center space-x-8 lg:space-x-16">
              <div className="w-56 h-[1px] bg-gradient-to-r from-transparent to-white" />
              <h2 className="text-white text-xl font-medium whitespace-nowrap">
                Coordinators
              </h2>
              <div className="w-56 h-[1px] bg-gradient-to-l from-transparent to-white" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:justify-center place-items-center mt-16">
              {data.others.map((member, i) => {
                if (member.domain.includes("Coordinator")) {
                  return <MemberCard data={member} key={i} />;
                }
              })}
            </div>
          </div>

          <div className="mt-36">
            <div className="flex items-center justify-center space-x-8 lg:space-x-16">
              <div className="w-56 h-[1px] bg-gradient-to-r from-transparent to-white" />
              <h2 className="text-white text-xl font-medium whitespace-nowrap">
                Leads
              </h2>
              <div className="w-56 h-[1px] bg-gradient-to-l from-transparent to-white" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:justify-center place-items-center mt-16">
              {data.leads.map((member, i) => {
                return <MemberCard data={member} key={i} />;
              })}
            </div>
          </div>

          <div className="mt-36">
            <div className="flex items-center justify-center space-x-8 lg:space-x-16">
              <div className="w-56 h-[1px] bg-gradient-to-r from-transparent to-white" />
              <h2 className="text-white text-xl font-medium whitespace-nowrap">
                Our Gems
              </h2>
              <div className="w-56 h-[1px] bg-gradient-to-l from-transparent to-white" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:justify-center place-items-center mt-16">
              {data.member.map((member, i) => {
                return <MemberCard data={member} key={i} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
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
  let domainsKeys = [
    {
      key: "webdev",
      value: "Web Development",
    },
    {
      key: "appdev",
      value: "App Development",
    },
    {
      key: "ml",
      value: "Machine Learning",
    },
    {
      key: "content",
      value: "Content Writing",
    },
    {
      key: "video",
      value: "Video Editing",
    },
    {
      key: "hr_marketing",
      value: "HR & Marketing",
    },
    {
      key: "graphic",
      value: "Graphic Designing",
    },

    {
      key: "ui_ux",
      value: "UI/UX Designing",
    },
    {
      key: "faculy",
      value: "Faculty-in-Charge",
    },
  ];
  let faculties = [];
  let leads = data.filter((member) => member.position.includes("lead"));
  console.log(data.filter((member) => member.position.includes("faculty")));

  //   const [page, setPage] = useState(1);
  //   const [members, setMembers] = useState(data.member.slice(0, 15));
  //   const maxPage = Math.ceil(data.member.length / 15);

  //   const scroll = () => {
  //     document.getElementById("Members").scrollIntoView({
  //       behavior: "smooth",
  //     });
  //   };
  //   React.useEffect(() => {
  //     setMembers(data.member.slice((page - 1) * 15, page * 15));
  //   }, [page]);

  //   const handleNext = () => {
  //     setPage(page + 1);
  //     scroll();
  //   };
  //   const handlePrev = () => {
  //     setPage(page - 1);
  //     scroll();
  //   };

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-[#02001A]">
      <Head>
        <title>Team | Konnexions</title>
      </Head>
      <Star />
      <div className="h-full w-full relative overflow-y-auto overflow-x-hidden mb-44 pb-44 scrollbar-hide">
        <div className="absolute z-10 h-fit w-full pt-32 pb-28 lg:pt-44 px-6 lg:px-24">
          <h1 className="text-center text-white text-2xl lg:text-5xl font-bold lg:font-extrabold leading-[1.6]">
            Meet Our Brilliant Minds
          </h1>
          <p className="lg:px-44 text-xs lg:text-sm mt-5 lg:mt-7 text-white/70 text-center leading-8 lg:leading-10">
            Get to Know the Dedicated and Talented Individuals Behind Our
            Success
          </p>

          {/* 

        

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
                Asst. Coordinators
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
          </div> */}

          <div className="mt-36">
            <div className="flex items-center justify-center space-x-8 lg:space-x-16">
              <div className="w-56 h-[1px] bg-gradient-to-r from-transparent to-white" />
              <h2 className="text-white text-xl font-medium whitespace-nowrap">
                Faculty-in-Charge
              </h2>
              <div className="w-56 h-[1px] bg-gradient-to-l from-transparent to-white" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:justify-center place-items-center mt-16">
              {data
                .filter((member) => member.position.includes("faculty"))
                .map((member, i) => {
                  return <MemberCard data={member} key={i} />;
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:justify-center place-items-center mt-16">
              {data
                .filter((member) => member.position.includes("coordinator"))
                .map((member, i) => {
                  return <MemberCard data={member} key={i} />;
                })}
            </div>
          </div>

          <div className="mt-36">
            <div className="flex items-center justify-center space-x-8 lg:space-x-16">
              <div className="w-56 h-[1px] bg-gradient-to-r from-transparent to-white" />
              <h2 className="text-white text-xl font-medium whitespace-nowrap">
                Asst. Coordinators
              </h2>
              <div className="w-56 h-[1px] bg-gradient-to-l from-transparent to-white" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:justify-center place-items-center mt-16">
              {data
                .filter((member) =>
                  member.position.includes("asst_coordinator")
                )
                .map((member, i) => {
                  return <MemberCard data={member} key={i} />;
                })}
            </div>
          </div>

          <div className="mt-36">
            <div className="flex items-center justify-center space-x-8 lg:space-x-16">
              <div className="w-56 h-[1px] bg-gradient-to-r from-transparent to-white" />
              <h2 className="text-white text-xl font-medium whitespace-nowrap">
                Mentors
              </h2>
              <div className="w-56 h-[1px] bg-gradient-to-l from-transparent to-white" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:justify-center place-items-center mt-16">
              {data
                .filter((member) => member.position.includes("mentor"))
                .map((member, i) => {
                  return <MemberCard data={member} key={i} />;
                })}
            </div>
          </div>

          <div className="mt-36">
            <div className="flex items-center justify-center space-x-8 lg:space-x-16">
              <div className="w-56 h-[1px] bg-gradient-to-r from-transparent to-white" />
              <h2 className="text-white text-xl font-medium whitespace-nowrap">
                Directors
              </h2>
              <div className="w-56 h-[1px] bg-gradient-to-l from-transparent to-white" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:justify-center place-items-center mt-16">
              {data
                .filter((member) => member.position.includes("director"))
                .map((member, i) => {
                  return <MemberCard data={member} key={i} />;
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
              {data
                .filter((member) => member.position.includes("lead"))
                .map((member, i) => {
                  return <MemberCard data={member} key={i} />;
                })}
            </div>
          </div>

          <div className="mt-36" id="Members">
            <div className="flex items-center justify-center space-x-8 lg:space-x-16">
              <div className="w-56 h-[1px] bg-gradient-to-r from-transparent to-white" />
              <h2 className="text-white text-xl font-medium whitespace-nowrap">
                Our Gems
              </h2>
              <div className="w-56 h-[1px] bg-gradient-to-l from-transparent to-white" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:justify-center place-items-center mt-16">
              {data
                .filter((member) => member.position.includes("member"))
                .map((member, i) => {
                  return <MemberCard data={member} key={i} />;
                })}
            </div>
            {/* <div className="flex justify-between mt-10">
              {page > 1 ? (
                <button
                  className="py-2 px-8 rounded-md cursor-pointer bg-[#0D1527]/80 text-white hover:bg-[#02003A]"
                  onClick={handlePrev}
                >
                  Previous
                </button>
              ) : (
                <div />
              )}
              {page < maxPage && (
                <button
                  className="py-2 px-8 rounded-md cursor-pointer bg-[#0D1527]/80 text-white hover:bg-[#02003A]"
                  onClick={handleNext}
                >
                  Next
                </button>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

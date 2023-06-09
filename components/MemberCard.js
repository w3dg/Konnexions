import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from '@fortawesome/free-solid-svg-icons'
import Image from "next/image";

export default function MemberCard({ data }) {
  return (
    <div className="relative w-[355px] h-[420px]">
      <img
        src="/images/borderFrame.png"
        className="absolute inset-0 w-full h-full"
        alt="borderFrame"
      />
      <div className="absolute inset-0 top-16 h-full w-[218px] mx-auto text-center">
        <div className="p-2 relative w-full overflow-hidden h-[200px] rounded">
          <Image placeholder="blur" blurDataURL="/images/spinner.svg"
            height={data.image.height} width={data.image.width}
            src={data.image.url} alt={data.name}
            className="object-fit w-auto mx-auto mt-1 h-full absolute inset-0  rounded"
          />
        </div>
        <div className="flex flex-col justify-center items-center my-1">
          <span className="text-lg text-white font-semibold text-center inline-block">
            {data.name}
          </span>
          <span className="text-white text-center inline-block">
            {data.email.split("@")[0]}
          </span>
        </div>
        <div className="flex flex-row justify-between w-full">
          <div className="h-[1.6px] w-12 my-auto bg-gradient-to-r from-[#ffffff67] to-[transparent]" />
          <div className="bg-card_bg px-2 py-2 text-xs rounded mx-1">
            <p className="text-white font-medium text-center w-full leading-6">
              {data.domain}
            </p>
          </div>
          <div className="h-[1.6px] w-12 my-auto bg-gradient-to-r from-[transparent] to-[#ffffff67]" />
        </div>
        <div className="flex flex-row justify-center items-center mt-4">
          {data.github && data.github != "null" && (
            <a href={data.github} className="p-2" aria-label="github">
              <FaGithub className="hover:text-gray-400 text-white" />
            </a>
          )}
          {data.linkedin && data.linkedin != "null" && (
            <a href={data.linkedin} className="p-2" aria-label="linkedin">
              <FaLinkedin className="hover:text-blue-400 text-white" />
            </a>
          )}
          {data.other && data.other != "null" && (
            <a href={data.other} className="p-2" aria-label="other">
              <FontAwesomeIcon icon={faLink} className="hover:text-rose-400 text-white" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FaGithub, FaEnvelope } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from '@fortawesome/free-solid-svg-icons'
import Image from "next/image";

const MemberCard = ({ data }) => {
  return (
    <div className="relative w-[355px] h-[420px]">
      <img
        src="/images/borderFrame.png"
        className="absolute inset-0 w-full h-full"
        alt="borderFrame"
      />
      <div className="absolute inset-0 top-16 h-full w-[218px] mx-auto">
        <div className="p-2 relative w-full overflow-hidden h-[200px] rounded">
          <Image placeholder="blur" blurDataURL="/images/spinner.svg"
            height={data.image.height} width={data.image.width}
            src={data.image.url} alt={data.name}
            className="object-fit w-auto mx-auto mt-1 h-full absolute inset-0  rounded"
          />
        </div>
        <h3 className="text-lg text-white font-semibold text-center my-4 px-4">
          {data.name}
        </h3>
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
          {data.techLink && (
            <a href={data.techLink} className="p-2" aria-label="techLink">
              <FaGithub className="hover:text-gray-400 text-white" />
            </a>
          )}
          {data.email && (
            <a href={`mailto:${data.email}`} className="p-2" aria-label="email">
              <FaEnvelope className="hover:text-rose-400 text-white" />
            </a>
          )}
          {data.other && (
            <a href={data.other} className="p-2" aria-label="other">
              <FontAwesomeIcon icon={faLink} className="hover:text-blue-400 text-white" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
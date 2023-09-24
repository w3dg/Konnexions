import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const year = new Date().getFullYear();
  const link =
    "https://www.google.com/maps/place/KIIT+Student+Activity+Center+-+KSAC/@20.3548831,85.8191383,16.7z/data=!4m6!3m5!1s0x3a19093cc3e1974b:0x85a345e1f4fcce86!8m2!3d20.3566159!4d85.818928!16s%2Fg%2F11bx2gww9n?entry=ttu";
  const socials = [
    {
      name: "Facebook",
      link: "https://www.facebook.com/kiitkonnexions",
      icon: faFacebook,
      hovcolor: "hover:text-blue-500",
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com/kiitkonnexions/",
      icon: faInstagram,
      hovcolor: "hover:text-pink-500",
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/company/kiitkonnexions/",
      icon: faLinkedinIn,
      hovcolor: "hover:text-blue-500",
    },
    {
      name: "Email",
      link: "mailto:it.society@kiit.ac.in",
      icon: faEnvelope,
      hovcolor: "hover:text-red-500",
    },
    {
      name: "Github",
      link: "https://github.com/kiit-konnexions/",
      icon: faGithub,
      hovcolor: "hover:text-gray-500",
    },
    {
      name: "Location",
      link: link,
      icon: faLocationDot,
      hovcolor: "hover:text-green-500",
    },
  ];

  return (
    <footer className="before:content-[''] before:w-1 before:h-24 before:bg-gray-100 before:m-2  nav-footer fixed right-5 bottom-5 flex flex-col bg-transparent backdrop-blur text-white text-sm lg:text-base z-30 gap-4">
      {socials.map((social) => {
        return (
          <a
            key={social.name}
            href={social.link}
            target="_blank"
            rel="noreferrer"
            aria-label={`${social.name} Link`}
          >
            <FontAwesomeIcon
              icon={social.icon}
              className={`h-6 w-6 ${social.hovcolor}`}
            />
          </a>
        );
      })}
    </footer>
  );
};

export default Footer;

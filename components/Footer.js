import { React, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLocationDot
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const content = () => {
    return (<>
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
    </>)
  }

  return (
    isMobile ? (
      <footer className="fixed bottom-0 flex bg-transparent backdrop-blur text-white text-sm inset-x-0 z-30">
        <div className="container mx-auto px-16">
            <div className="flex flex-row my-1 space-x-2 justify-between items-center">
              {content()}
            </div>
        </div>
      </footer>
    ) : (
      <footer className="before:content-[''] before:w-1 before:h-24 before:bg-gradient-to-t from-white before:m-2 fixed
        left-2 lg:left-12 bottom-2 lg:bottom-8 flex flex-col bg-transparent text-white text-base z-30 gap-4">
        {content()}
      </footer>
    )
  );
};

export default Footer;

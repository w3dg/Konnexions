/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import axios from "axios";
import MemberCard from "@/components/MemberCard";
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

const Teams = ({ data }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  function fn() {
    if (!isClient) return;
    window.requestAnimFrame = function () {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
      window.setTimeout(callback, 1000 / 60);
      };
    }();
    var canvas = document.getElementById('canvas'),ctx = canvas.getContext('2d'),w = canvas.width = window.innerWidth,h = canvas.height = window.innerHeight,hue = 217,stars = [],count = 0,maxStars = 200;
    var canvas2 = document.createElement('canvas'),ctx2 = canvas2.getContext('2d');
    canvas2.width = 100;
    canvas2.height = 100;
    var half = canvas2.width / 2,gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, '#fff');
    gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
    gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
    gradient2.addColorStop(1, 'transparent');
    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();
    function random(min, max) {
      if (arguments.length < 2) {
        max = min;
        min = 0;
      }
      if (min > max) {
        var hold = max;
        max = min;
        min = hold;
      }
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function maxOrbit(x, y) {
      var max = Math.max(x, y),diameter = Math.round(Math.sqrt(max * max + max * max));
      return diameter / 2;
    }

    var Star = function () {
      this.orbitRadius = random(maxOrbit(w, h));
      this.radius = random(60, this.orbitRadius) / 12;
      this.orbitX = w / 2;
      this.orbitY = h / 2;
      this.timePassed = random(0, maxStars);
      this.speed = random(this.orbitRadius) / 900000;
      this.alpha = random(2, 10) / 10;
      count++;
      stars[count] = this;
    };
    Star.prototype.draw = function () {
      var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,twinkle = random(10);
      if (twinkle === 1 && this.alpha > 0) {
        this.alpha -= 0.05;
      } else if (twinkle === 2 && this.alpha < 1) {
        this.alpha += 0.05;
      }
      ctx.globalAlpha = this.alpha;
      ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
      this.timePassed += this.speed;
    };
    for (var i = 0; i < maxStars; i++) {
      new Star();
    }
    function animation() {
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      for (var i = 1, l = stars.length; i < l; i++) {
        stars[i].draw();
      }
      ;
      window.requestAnimationFrame(animation);
    }
    animation();
  }
  fn();

  return (    
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-black">
      <Head>
        <title>Konnexions - Team</title>
      </Head>
      <canvas id="canvas" className="absolute inset-0 h-full w-full z-0 opacity-90"></canvas>
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
              <div className="w-56 h-[1px] bg-gradient-to-r from-transparent to-white"></div>
              <span className="text-white text-xl font-medium whitespace-nowrap">
                Faculty-in-Charge
              </span>
              <div className="w-56 h-[1px] bg-gradient-to-l from-transparent to-white"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:justify-center lg:space-x-5 place-items-center mt-16">
              {data.others.map((member, i) => {
                if (member.domain == "Faculty-in-Charge") {
                  return <MemberCard data={member} key={i} />;
                }
              })}
            </div>
          </div>

          <div className="mt-36">
            <div className="flex items-center justify-center space-x-8 lg:space-x-16">
              <div className="w-56 h-[1px] bg-gradient-to-r from-transparent to-white"></div>
              <span className="text-white text-xl font-medium whitespace-nowrap">
                Coordinators
              </span>
              <div className="w-56 h-[1px] bg-gradient-to-l from-transparent to-white"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:justify-center lg:space-x-5 place-items-center mt-16">
              {data.others.map((member, i) => {
                if (member.domain.includes("Coordinator")) {
                  return <MemberCard data={member} key={i} />;
                }
              })}
            </div>
          </div>

          <div className="mt-36">
            <div className="flex items-center justify-center space-x-8 lg:space-x-16">
              <div className="w-56 h-[1px] bg-gradient-to-r from-transparent to-white"></div>
              <span className="text-white text-xl font-medium whitespace-nowrap">
                Leads
              </span>
              <div className="w-56 h-[1px] bg-gradient-to-l from-transparent to-white"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:justify-center lg:space-x-5 place-items-center mt-16">
              {data.leads.map((member, i) => {
                return <MemberCard data={member} key={i} />;
              })}
            </div>
          </div>

          <div className="mt-36">
            <div className="flex items-center justify-center space-x-8 lg:space-x-16">
              <div className="w-56 h-[1px] bg-gradient-to-r from-transparent to-white"></div>
              <span className="text-white text-xl font-medium whitespace-nowrap">
                Our Gems
              </span>
              <div className="w-56 h-[1px] bg-gradient-to-l from-transparent to-white"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:justify-center lg:space-x-5 place-items-center mt-16">
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

export default Teams;
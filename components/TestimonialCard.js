/* eslint-disable @next/next/no-img-element */
export default function TestimonialCard({ data }) {
  return (
    <div className="relative backdrop-blur lg:w-[250px] lg:h-[250px] w-[150px] h-[150px]">
      <img src="/images/servicesRectangle.png" alt="servicesRectangle"
        className="absolute inset-0 h-[75%] w-full" />
      <div className="absolute text-white inset-0 h-full w-full z-10 flex flex-col mt-7">
        <span className="font-semibold text-lg text-center">{data.name}</span>
        <p className="text-sm font-light opacity-70 pt-2 text-center">
          {data.description}
        </p>
      </div>
    </div>
  );
}
/* eslint-disable @next/next/no-img-element */
export default function TestimonialCard({ data }) {
  return (
    <div className="relative backdrop-blur w-[200px] h-[300px]">
      <img src="/images/servicesRectangle.png" alt="servicesRectangle"
        className="absolute inset-0 h-[75%] w-full" />
      <div className="absolute text-white inset-0 h-full w-full z-10 flex flex-col mt-10">
        <h3 className="font-semibold text-sm text-center">{data.name}</h3>
        <p className="text-lg font-light opacity-70 p-3 text-center">
          {data.description}
        </p>
      </div>
    </div>
  );
}
/* eslint-disable @next/next/no-img-element */
import Script from "next/script";
import React from "react";

export default function Connect() {
	const [maxParticles, setMaxParticles] = React.useState(
		window.innerWidth > 768 ? 50 : 20
	);

	const handleResize = () => {
		if (window.innerWidth > 768) setMaxParticles(50);
		else setMaxParticles(20);
	};

	React.useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (<>
		<canvas id="contactCanvas" className="absolute inset-0 h-full w-full z-0 opacity-90" />
		<Script src="https://npmcdn.com/particlesjs@2.0.2/dist/particles.min.js"
			onReady={() => {
				Particles.init({
					selector: '#contactCanvas',
					connectParticles: true,
					color: '#98D2EB',
					minDistance: '100',
					sizeVariations: 2,
					maxParticles: maxParticles,
				});
			}}
		/>
	</>);
};
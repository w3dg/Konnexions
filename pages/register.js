import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCalendarDays, faLocationDot, faArrowRight, faArrowLeft,
	faCheck, faCheckCircle, faSpinner
} from "@fortawesome/free-solid-svg-icons";

export async function getServerSideProps() {
	const resp = await axios.get(
		process.env.NODE_ENV == "production"
			? "https://konnexions.netlify.app/api/form"
			: "http://localhost:3000/api/form"
	);

	return {
		props: {
			data: resp.data.data,
		},
	};
}

export default function Register({ data }) {
	let sections = {};
	let defaultValues = {};
	let minSection = 100, maxSection = 0;
	for (const key in data) {
		if (data[key].section) {
			const section = data[key].section;
			if (section < minSection) minSection = section;
			if (section > maxSection) maxSection = section;
			if (!sections[section]) sections[section] = [];
			sections[section].push(key);
			defaultValues[key] = "";
		}
	}
	const emailRegex = new RegExp(
		"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
	);

	const [form, setForm] = useState(defaultValues);
	const [section, setSection] = useState(minSection);
	const [errormsg, setErrormsg] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const checkInputs = () => {		
		const currentSection = sections[section];
		for (const key of currentSection) {
			if (!form[key]) {
				setErrormsg("Please fill all the fields");
				return false;
			}
			if (data[key].inputType == "email" && !emailRegex.test(form[key])) {
				setErrormsg("Please enter a valid email");
				return false;
			}
		}
		setErrormsg("");
		console.log(form);
		return true;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (checkInputs() == false) return; 
		setIsLoading(true);
		const resp = await axios.post(
			process.env.NODE_ENV == "production"
				? "https://konnexions.netlify.app/api/response"
				: "http://localhost:3000/api/response",
			form
		);

		if (resp.status == 200) {
			setSection(Number(section) + 1);
			setForm(defaultValues)
			setTimeout(() => {
				window.location.href = "/";
			}, 3000);
		} else {
			alert("Something went wrong");
		}
		setIsLoading(false);
	};
	const handlePrevClick = (e) => {
		e.preventDefault();
		setSection(Number(section) - 1);
	};
	const handleNextClick = (e) => {
		e.preventDefault();
		if (checkInputs()) {
			setSection(Number(section) + 1);
		}
	};

	useEffect(() => {
		const currentSection = sections[section];
		if (!currentSection) return;
		for (const key of currentSection) {
			const input = document.getElementsByName(key)[0];
			if(input) input.value = form[key];
		}
	}, [section]);

	return (<>
		<Head>
			<title>Register | Konnexions</title>
		</Head>
		<div className="h-screen w-screen overflow-auto scrollbar-hide fixed inset-0 bg-[#02001A] pt-12 lg:flex lg:items-center">
      <div className="block lg:w-[500px] shrink-0 backdrop-blur h-fit p-8">
        <div className="w-full h-[100%] bg-slate-900/60 rounded-xl overflow-auto scrollbar-hide pb-8 border border-white-200"> 
					<div className="flex items-center justify-center p-6">
            <Image priority placeholder="blur" blurDataURL="/spinner.svg"
              src={data.image.url} alt={data.title}
              width={data.image.width} height={data.image.height}
              className="w-[100%] h-[250px] object-cover rounded-xl shadow-slate-300"
            />
          </div>
          <div className="px-8 mt-3 lg:mt-5">
            <h1 className="text-2xl font-semibold text-white">
							{data.title}
            </h1>
            <p className="text-sm leading-7 text-white mt-4">
							{data.description.substring(0, 200) + "..."}
            </p>
            <div className="mt-7 space-y-5">
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faCalendarDays} className="w-6 h-6 text-white" />
                <span className="text-sm text-white">
									{data.date}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faLocationDot} className="w-6 h-6 text-white" />
                <span className="text-sm text-white">
									{data.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full text-white min-h-screen lg:h-full overflow-auto scrollbar-hide pb-32 py-6 lg:py-16 px-5 lg:px-8 mt-5 lg:mt-0">
        <div className="flex uppercase justify-between">
          <span className="text-xs tracking-widest">{data.title}</span>
          <span className="text-xs tracking-widest">STEP {section - minSection + 1} OF {maxSection - minSection + 1}</span>
        </div>
				<div className="mt-10 lg:mt-20">
					{section <= maxSection && (<>
						<div className="bg-slate-900/60 rounded-md">
							{sections[section].map((item, index) => (
								<div key={index} className="mt-7 lg:h-20 flex flex-col lg:flex-row lg:items-center justify-between p-4 lg:p-3 rounded-md lg:space-x-4">
									<span className="text-white font-medium shrink-0 lg:ml-4 lg:w-[20%]">
										{data[item].queryText}
									</span>
									<input
										type={data[item].inputType}
										name={item}
										value={form.item}
										onChange={(e) => setForm({ ...form, [item]: e.target.value })}
										className="lg:w-[70%] h-12 lg:h-full bg-[#02001A] border-2 border-slate-200 rounded-md flex items-center px-6 mt-2 lg:mt-0 outline-none"
									/>
								</div>
							))}
						</div>
						<p className="h-10 mt-4 text-sm tracking-wide flex items-center text-red-500 px-3">{errormsg}</p>
						<div className="flex items-center justify-between lg:mt10">
							{section != minSection ? (
								<button onClick={handlePrevClick} className="flex items-center space-x-2 text-sm tracking-wide text-white px-4 py-2 rounded-md bg-slate-900/60 hover:bg-slate-900/70">
									<FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
									<span>Previous</span>
								</button>
							): ( 
								<div></div>
							)}
							{section != maxSection ? (
								<button onClick={handleNextClick}
								className={`flex items-center space-x-2 text-sm tracking-wide text-white px-4 py-2 rounded-md ${errormsg != "" ? "bg-slate-900/40" : "bg-slate-900/60 hover:bg-slate-900/70"}`}>
									<span>Next</span>
									<FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
								</button>
							) : (
								<button onClick={handleSubmit}
								className={`flex items-center space-x-2 text-sm tracking-wide text-white px-4 py-2 rounded-md ${errormsg != "" ? "bg-slate-900/40" : "bg-slate-900/60 hover:bg-slate-900/70"}`}>
									<span>Register</span>
									{isLoading ? (
										<FontAwesomeIcon icon={faSpinner} className="w-4 h-4 animate-spin" />
									) : (
										<FontAwesomeIcon icon={faCheck} className="w-4 h-4" />
									)}
								</button>
							)}
						</div>
					</>)}
					{section > maxSection && (
						<div className="bg-slate-900/60 rounded-md p-10">
							<div className="flex flex-col items-center justify-center mt-10">
								<FontAwesomeIcon icon={faCheckCircle} className="w-20 h-20 text-green-500" />
								<h1 className="text-2xl font-semibold mt-5">{data.note}</h1>
								<p className="text-sm mt-2">You will be redirected to the home page in 5 seconds.</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	</>);
}
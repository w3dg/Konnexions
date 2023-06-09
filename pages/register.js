import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import Connect from "@/components/Connect";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCalendarDays, faLocationDot, faArrowRight, faArrowLeft,
	faCheck, faCheckCircle, faSpinner, faUpload
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
	let sections = {}, defaultValues = {};
	let minSection = 100, maxSection = 0;
	let fileInputs = [];

	for (const key in data.form) {
		const section = data.form[key].section;
		if (section < minSection) minSection = section;
		if (section > maxSection) maxSection = section;
		if (!sections[section]) sections[section] = [];
		sections[section].push(key);

		if (data.form[key].inputType == "file" ||
			data.form[key].inputType == "image") {
			fileInputs.push(key);
			defaultValues[key] = null;
		} else
			defaultValues[key] = "";
	}
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	// Change options here
	const options = ['WebDev', 'AppDev', 'UI/UX', 'Graphic', 'Video Editing', 'Content', 'Marketing', 'RnD', 'HR']

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
			if (data.form[key].inputType == "email" && !emailRegex.test(form[key])) {
				setErrormsg("Please enter a valid email");
				return false;
			}
		}
		setErrormsg("");
		return true;
	}
	// Handle file uploads can be many files
	const [file, setFile] = useState(null);
	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
		if (e.target.files[0])
			form[fileInputs[0]] = e.target.files[0].name;
	};
	const handleFileUpload = async () => {
    if (!file) {
			setErrormsg("Please select a file.");
      return;
    }
    const formData = new FormData();
    formData.append('fileUpload', file);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_GRAPH_ENDPOINT}/upload`, formData, {
        headers: {
          Authorization: `${process.env.NEXT_PUBLIC_GRAPH_TOKEN}`,
          'Content-Type': 'multipart/form-data',
        },
      });
			form[fileInputs[0]] = response.data.id;
    } catch (error) {
      console.log(error);
    }
  };

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (checkInputs() == false) return; 
		setIsLoading(true);

		if (fileInputs.length > 0) {
			await handleFileUpload();
		}
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
		} else alert("Something went wrong");
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
			if(input && input.type == "file") continue;
			else if (input) input.value = form[key];
		}
	}, [section, form]);

	return (<>
		<Head>
			<title>Register | Konnexions</title>
		</Head>
    <div className="fixed inset-0 h-screen w-screen bg-[#02001A] overflow-auto lg:overflow-hidden ">
      <div className="relative overflow-y-auto overflow-x-hidden scrollbar-hide">
        <Connect />
				<div className="lg:flex lg:items-center overflow-auto lg:overflow-hidden scrollbar-hide">
					<div className="block lg:w-[500px] bg-transparent shrink-0 h-fit p-8 pt-20">
						<div className="w-full h-[100%] bg-transparent backdrop-blur-sm rounded-xl overflow-auto scrollbar-hide pb-8 border border-white-200"> 
							<div className="flex items-center justify-center p-6">
								<Image priority placeholder="blur" blurDataURL="/images/spinner.svg"
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
					<div className="w-full text-white min-h-screen h-fit lg:h-full overflow-auto scrollbar-hide pb-8 py-6 lg:py-32 px-5 lg:px-8 mt-5 lg:mt-0">
						<div className="flex uppercase justify-between">
							<span className="text-xs tracking-widest">{data.title}</span>
							<span className="text-xs tracking-widest">STEP {section - minSection + 1} OF {maxSection - minSection + 1}</span>
						</div>
						<div className="mt-10 lg:mt-20 bg-transparent">
							{section <= maxSection && (<>
								<div className="bg-slate-900/60 md:rounded-2xl rounded-lg backdrop-blur-sm">
									{sections[section].map((item, index) => (
										<div key={index} className="mt-7 lg:h-20 flex flex-col lg:flex-row lg:items-center justify-between p-4 lg:p-3 rounded-md lg:space-x-4">
											{(data.form[item].inputType != "file" || data.form[item].inputType != "image") &&
												(<label className="text-white font-medium shrink-0 lg:ml-4 lg:w-[20%]" for={item}>
													{data.form[item].queryText}
												</label>)
											}
											{data.form[item].inputType == "textarea" ?
											<textarea name={item} value={form.item} id={item}
												onChange={(e) => setForm({ ...form, [item]: e.target.value })}
												className="lg:w-[70%] h-50 lg:h-full bg-[#02001A]/60 border-2 border-slate-200/60 rounded-xl flex items-center px-6 mt-2 lg:mt-0 outline-none"
												style={{ resize: "none" }}
											/> :
											data.form[item].inputType == "dropdown" ?
											<select name={item} value={form.item} id={item}
												onChange={(e) => setForm({ ...form, [item]: e.target.value })}
												className="lg:w-[70%] h-12 lg:h-full bg-[#02001A]/60 border-2 border-slate-200/60 rounded-xl flex items-center px-6 mt-2 lg:mt-0 outline-none"
											>
												{options.map((option, index) => (
													<option key={`option ${index}`} value={option}>{option}</option>
												))}
											</select> :
											data.form[item].inputType == "radio" ?
											<div className="flex items-center space-x-4">
												{options.map((option, index) => (
													<div key={`option ${index}`} className="flex items-center space-x-2">
														<input type="radio" name={item} value={option} onChange={(e) => setForm({ ...form, [item]: e.target.value })} />
														<span className="text-white">{option}</span>
													</div>
												))}
											</div> :
											data.form[item].inputType == "checkbox" ?
											<div className="flex items-center space-x-4">
												{options.map((option, index) => (
													<div key={`option ${index}`} className="flex items-center space-x-2">	
														<input type="checkbox" name={item} value={option} onChange={(e) => setForm({ ...form, [item]: e.target.value })} />
														<span className="text-white">{option}</span>
													</div>
												))}
											</div> :
											data.form[item].inputType == "file" || data.form[item].inputType == "image" ?
											<div className="lg:w-[70%] h-12 lg:h-full bg-[#02001A]/60 border-2 border-slate-200/60 rounded-xl flex items-center justify-center px-6 mt-2 lg:mt-0 outline-none">
												<label htmlFor={item} className="flex items-center space-x-2">
													<FontAwesomeIcon icon={faUpload} className="w-6 h-6 text-white" />
													<span className="text-white">Upload</span>
												</label>
												<input id={item} type="file" name={item} onChange={handleFileChange} className="hidden" />
												{file && <span className="text-white">{file.name}</span>}
											</div> :
											<input type={data.form[item].inputType}
												name={item} value={form.item} id={item}
												onChange={(e) => setForm({ ...form, [item]: e.target.value })}
												className="lg:w-[70%] h-12 lg:h-full bg-[#02001A]/60 border-2 border-slate-200/60 rounded-xl flex items-center px-6 mt-2 lg:mt-0 outline-none"
											/>}
										</div>
									))}
								</div>
								<p className="h-10 mt-4 text-sm tracking-wide flex items-center text-red-500 px-3">{errormsg}</p>
								<div className="flex items-center justify-between lg:mt10">
									{section != minSection ? (
										<button onClick={handlePrevClick}
										className="flex items-center space-x-2 text-sm tracking-wide backdrop-blur-sm text-white px-4 py-2 rounded-lg bg-slate-900/60 hover:bg-slate-900/70">
											<FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
											<span>Previous</span>
										</button>
									): ( 
										<div />
									)}
									{section != maxSection ? (
										<button onClick={handleNextClick}
										className={`flex items-center space-x-2 text-sm tracking-wide backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-slate-900/70 ${errormsg != "" ? "bg-slate-900/40" : "bg-slate-900/60"}`}>
											<span>Next</span>
											<FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
										</button>
									) : (
										<button onClick={handleSubmit}
										className={`flex items-center space-x-2 text-sm tracking-wide backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-slate-900/70 ${errormsg != "" ? "bg-slate-900/40" : "bg-slate-900/60"}`}>
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
			</div>
		</div>
	</>);
}
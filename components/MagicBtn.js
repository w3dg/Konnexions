import React from "react";
import axios from "axios";
import { client, gql } from "@/graph";
// Use this to automate upload of member data from JSON file
export default function MagicBtn() {
	const handleClick = () => {
		const getNewData = async () => {
			const newData = await axios.get('/dat.json');
			return newData.data;
		}
		// To easily Upload member data from JSON file, (dat.json in Public folder)
		// Excel sheet from Google Forms can be converted to JSON using Pandas
		// const uploadData = () => {
		// 	getNewData().then((JSONdata) => {
		// 		JSONdata.forEach((data) => {
		// 			data.imageUrl = ""
		// 			const resp = axios.post(
		// 				process.env.NODE_ENV == "production"
		// 					? "https://konnexions.netlify.app/api/response"
		// 					: "http://localhost:3000/api/response",
		// 				data
		// 			);
		// 			console.log(`Data uploaded: ${data.name}`)
		// 		})
		// 	})
		// }
		// const fetchData = async () => {
		// 	const resp = await axios.get(
		// 		process.env.NODE_ENV == "production"
		// 			? "https://konnexions.netlify.app/api/member"
		// 			: "http://localhost:3000/api/member"
		// 	);
		// 	const data = resp.data.data;
		// 	return {
		// 		...data.member,
		// 		...data.leads,
		// 		...data.others,
		// 	}
		// }

		getNewData().then(async(data) => {
			for (const key in data) {
				if (data.hasOwnProperty(key)) {
					const element = data[key];
					const query = gql`
						mutation {
							updateMember(
								where: {
									id: "${element.id}"
								}, data: {
									github: "${element.github}",
									linkedin: "${element.linkedin}",
									other: "${element.other}"
								}
							) {
								id
							}
						}
					`;
					await client.request(query).then((details) => {
						console.log(details);
					}).catch((err) => {
						console.log(err);
					});
					await new Promise(r => setTimeout(r, 1000));
					console.log(element);
				}
			}
		}).catch((err) => {
			console.log(err);
		});
	};

	return (
		<button onClick={handleClick}
			className="text-white">
			Magic Button
		</button>
	);
}
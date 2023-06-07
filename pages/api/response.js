// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { client, gql } from "@/graph";

export default async function handler(req, res) {
	// Change CreateMember to CreateResponse
	const query = gql`
		mutation {
			createMember(
				data: {
					domain: "${req.body.domain}",
					email: "${req.body.email}",
					imageUrl: "${req.body.imageUrl}",
					name: "${req.body.name}",
					other: "${req.body.other}",
					techLink: "${req.body.techLink}"
				}
			){
				id
			}
		}
	`;
	await client.request(query).then((details) => {
		console.log(details);
		res.status(200).json({ message: "success" });
	}).catch((err) => {
		console.log(err);
		res.status(500).json({ message: "error" });
	});
}
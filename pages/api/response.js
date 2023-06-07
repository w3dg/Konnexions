// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client, gql } from "@/graph";

export default async function handler(req, res) {
	const query = gql`
		mutation {
			createResponse(
				data: {
					about: "${req.body.about}",
					branch: "${req.body.branch}",
					domain: "${req.body.domain}",
					mail: "${req.body.mail}",
					name: "${req.body.name}",
					resume: "${req.body.resume}",
					roll: "${req.body.roll}",
					year: "${req.body.year}"
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
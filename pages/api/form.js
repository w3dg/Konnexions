// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// about, branch, domain, mail, name, resume, roll, year
import { client, gql } from "@/graph";

export default async function handler(req, res) {
  const query = gql`
    query Form {
      formPages {
				date
				description
				location
				note
				title
				image {
					width
					url
					height
				}
				form {
					name {
						inputType
						queryText
						section
					}
					email {
						inputType
						queryText
						section
					}
					domain {
						inputType
						queryText
						section
					}
					image {
						inputType
						queryText
						section
					}
					techLink {
						inputType
						queryText
						section
					}
					other {
						inputType
						queryText
						section
					}
				}
			}
    }
  `;
  await client.request(query).then((data) => {
    console.log(data);
    res.status(200).json({
      data: data.formPages[0],
    });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  });
}
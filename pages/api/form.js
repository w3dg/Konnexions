// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client, gql } from "@/graph";

const handler = async(req, res) => {
  const query = gql`
    query Form {
      forms {
				title
				description
				date
				location
				image {
					url
					height
					width
				}
				note
				about {
					inputType
					queryText
					section
				}
				branch {
					inputType
					queryText
					section
				}
				domain {
					inputType
					queryText
					section
				}
				mail {
					inputType
					queryText
					section
				}
				name {
					queryText
					section
					inputType
				}
				resume {
					inputType
					queryText
					section
				}
				roll {
					inputType
					queryText
					section
				}
				year {
					section
					queryText
					inputType
				}
			}
    }
  `;

  await client.request(query).then((data) => {
    console.log(data);
    res.status(200).json({
      data: data.forms[0],
    });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  });
}

export default handler;
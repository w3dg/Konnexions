// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client, gql } from "@/graph";

export default async function handler(req, res) {
  const query1 = gql`
    query MyQuery {
      members(first: 100) {
        domain
        email
        github
        id
        image {
          url
          width
          height
        }
        name
        linkedin
        position
        other
      }
    }
  `;

  const query2 = gql`
    query MyQuery {
      members(last: 12) {
        domain
        email
        github
        id
        image {
          url
          width
          height
        }
        name
        linkedin
        position
        other
      }
    }
  `;

  let members = [];

  await client
    .request(query1)
    .then((data) => {
      members = data.members;
    })
    .catch((err) => {});

  await client
    .request(query2)
    .then((data) => {
      members = members.concat(data.members);
    })
    .catch((err) => {});

  console.log(members);
  res.status(200).json({ data: members });
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { client, gql } from "@/graph";

const handler = async(req, res) => {
  const query = gql`
    query ResourcePage {
      resourcePages {
        heading
        description
        resource {
          name
          category
          description
          href
          image {
            url
            height
            width
          }
        }
      }
    }
  `;

  await client.request(query)
  .then((data) => {
    console.log(data);
    res.status(200).json({
      data: data.resourcePages[0],
    });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  });
}

export default handler;
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client, gql } from "@/graph";
import NextCors from "nextjs-cors";

const handler = async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const query = gql`
    query Logo {
      logos {
        konnexion {
          url
          height
          width
        }
        kiit {
          url
          height
          width
        }
      }
    }
  `;

  await client
    .request(query)
    .then((data) => {
      console.log(data);
      res.status(200).json({
        data: data.logos[0],
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

export default handler;

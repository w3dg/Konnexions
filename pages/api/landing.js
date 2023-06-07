// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { client, gql } from "@/graph";

const handler = async(req, res) => {
  const query = gql`
    query LandingPages {
      landingPages {
        mainHeading
        arrayFeat
        description
        socialMedias {
          name
          link
          icon {
            url
            height
            width
          }
        }
        serviceHeading
        serviceDescription
        services {
          name
          icon {
            url
            height
            width
          }
          description
        }
        eventsHeading
        eventsDescription
        events {
          name
          image {
            url
            height
            width
          }
          description
          date
          state
          regLink
        }
        testimonialHeading
        testimonialDescription
        testimonials {
          description
          name
        }
        galleryHeading
        galleryDescription
        images {
          name
          image {
            url
            height
            width
          }
          description
        }
      }
    }
  `;

  await client.request(query).then((data) => {
    console.log(data);
    res.status(200).json({
      data: data.landingPages[0],
    });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  });
}

export default handler;
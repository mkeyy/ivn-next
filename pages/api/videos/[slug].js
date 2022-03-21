import { fetchAPI } from "../../../lib/api";

export default async (req, res) => {
  const {
    query: { slug },
  } = req;

  const data = await fetchAPI(
    `
        query getVideo($id: ID!) {
            video(id: $id, idType: SLUG) {
                title
                content
                featuredImage {
                  node {
                    mediaItemUrl
                  }
                }
              }
        }
    `,
    {
      variables: { id: slug },
    }
  );

  res.json(data.video);
};

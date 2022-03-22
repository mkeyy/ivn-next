import { fetchAPI } from "../../../lib/api";

export default async function getPost(req, res) {
  const {
    query: { slug },
  } = req;

  const data = await fetchAPI(
    `
        query getPost($id: ID!) {
            post(id: $id, idType: SLUG) {
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

  res.json(data.post);
}

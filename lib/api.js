const API_URL = process.env.WORDPRESS_API_URL;

export async function fetchAPI(query, { variables } = {}) {
  const headers = { "Content-Type": "application/json" };

  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getMenuLinks(location) {
  const data = await fetchAPI(
    `
  query getMenu($location: MenuLocationEnum!) {
    menus(where: {location: $location}) {
      nodes {
        menuItems {
          edges {
            node {
              path
              label
              target
            }
          }
        }
      }
    }
  }
`,
    {
      variables: { location: location },
    }
  );

  return data?.menus?.nodes[0];
}

export async function getAllPosts() {
  const data = await fetchAPI(`
        query getAllPosts {
            posts(first: 6) {
                nodes {
                  title
                  excerpt
                  slug
                  featuredImage {
                    node {
                      mediaItemUrl
                    }
                  }
                }
              }
        }
    `);

  return data?.posts;
}

export async function getAllVideos() {
  const data = await fetchAPI(`
        query getAllVideos {
            videos(first: 6) {
                nodes {
                  title
                  excerpt
                  slug
                  featuredImage {
                    node {
                      mediaItemUrl
                    }
                  }
                }
              }
        }
    `);

  console.log(data);

  return data?.videos;
}

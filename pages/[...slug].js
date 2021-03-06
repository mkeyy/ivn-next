import Head from "next/head";
import Header from "../components/header";
import Footer from "../components/footer";
import useSWR from "swr";
import { fetchAPI, getMenuLinks } from "../lib/api";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Page({ slug, menuItems }) {
  const { data, error } = useSWR(`/api/pages/${slug}`, fetcher);
  if (error) return <div>Error...</div>;
  if (!data) return <div>Loading....</div>;

  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header menuItems={menuItems} />

      <main>
        <h1>{data.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      </main>

      <Footer />
    </>
  );
}

export async function getStaticProps({ params }) {
  const menuItems = await getMenuLinks("HEADER_MENU");
  const slug = params.slug.join("/");

  return {
    props: { slug, menuItems },
  };
}

export async function getStaticPaths() {
  const allPages = await fetchAPI(`
        query getAllPages {
            pages {
                edges{
                    node {
                        uri
                    }
                }
            }
        }
    `);

  return {
    paths: allPages.pages.edges.map(({ node }) => `/${node.slug}`) || [],
    fallback: true,
  };
}

import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Link from "next/link";
import { getAllPosts, getMenuLinks } from "../../lib/api";

import styles from "../../styles/modules/Blog.module.css";

export default function Blog({ allPosts: { nodes }, menuItems }) {
  const posts = nodes;
  if (!posts) return <div>Error....</div>;

  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header menuItems={menuItems} />

      <main>
        <h1>Blog</h1>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug}>
              <a className={styles.post}>
                <img
                  src={
                    post.featuredImage?.node.mediaItemUrl
                      ? post.featuredImage?.node.mediaItemUrl
                      : "./placeholder.png"
                  }
                />
                <h2>{post.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
              </a>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const allPosts = await getAllPosts();
  const menuItems = await getMenuLinks("HEADER_MENU");

  return {
    props: { allPosts, menuItems },
  };
}

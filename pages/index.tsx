import Image from 'next/image';
import Container from '../components/Container';
import Link from 'next/link';
import { getNotionData } from '../lib/getNotionData';
import { getAllPosts } from '../lib/notion.js';
import BlogPost from '../components/BlogPost';
import SITE from '../site.config';

const LinkComp = ({ children, slug }) => {
  return (
    <>
      <Link href={`${SITE.path}/${slug}`}>
        <a>{children}</a>
      </Link>
    </>
  );
};

export default function Home({ postsToShow }) {
  // console.log('Home----', postsToShow);
  return (
    <Container>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl ztitle">技术</h2>
        {postsToShow.map((post) => (
          // <BlogPost key={post.id} post={post} type={'post'} />

          <div className="p-4" key={post.id}>
            <h2 className="text-xl py-2">{post.title}</h2>
            <p>{post.summary}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts({ includePages: true });
  const topic = posts.filter((v) => v.topic === 'Yes');
  const articles = posts.filter((v) => v.topic === 'No');
  const page = posts.filter((v) => v.type.includes('Page'))

  console.log('getStaticProps', page);

  const postsToShow = articles.slice(0, SITE.postsPerPage);
  const totalPosts = posts.length;
  const showNext = totalPosts > SITE.postsPerPage;
  return {
    props: {
      page: 1, // current page is 1
      postsToShow,
      topic,
      showNext
    },
    revalidate: 1
  };
}

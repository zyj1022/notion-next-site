import Link from 'next/link';
import Image from 'next/image';
import SITE from '../site.config';
import { formatDate } from '../lib/notion';

const LinkComp = ({ children, slug }) => {
  return (
    <>
      <Link href={`${SITE.path}/${slug}`}>
        <a>{children}</a>
      </Link>
    </>
  );
};

const Cover = ({ post, type }) => {
  const cls1 = type === 'post' ? 'h-32' : 'h-40';
  const cls2 = type === 'post' ? '-mt-12 h-40' : '-mt-16 h-52';
  return (
    <div className={`relative mb-2 ${cls1}`}>
      <div
        className={`cover-wrap absolute w-full rounded-2xl card-img-shadow bg-gray-100 ${cls2}`}
      >
        <LinkComp slug={post.slug}>
          {post.cover && (
            <Image layout="fill" src={post.cover} alt={post.title} />
          )}
        </LinkComp>
      </div>
    </div>
  );
};

const BlogPost = ({ post, type }) => {
  // console.log('BlogPost---', post)
  return (
    <article
      key={post.id}
      className="relative card-shadow px-6 py-6 rounded-2xl mt-10 pb-14 transition duration-150 ease-in-out hover:shadow-2xl hover:cursor-pointer hover: translate-y-2 hover:scale-105"
    >
      <Cover post={post} type={type} />
      <div className="flex mb-3">
        {post.tagsColor &&
          post.tagsColor.map((tag, i) => {
            return (
              <span
                key={i}
                className={`text-sm leading-3 mr-2 px-3 py-1.5 block border rounded-full text-${tag.color}-400 bg-${tag.color}-100 border-${tag.color}-100 `}
              >
                {tag.value}
              </span>
            );
          })}
      </div>
      <header className="flex flex-col justify-between md:flex-row md:items-baseline">
        <LinkComp slug={post.slug}>
          <h2 className="text-lg md:text-xl font-medium mb-2 cursor-pointer text-black dark:text-gray-100 transition-all hover:text-purple-600">
            {post.icon} {post.title}
          </h2>
        </LinkComp>
      </header>
      <time className="block text-gray-600 dark:text-gray-400 mb-2">
        {formatDate(post?.date?.start_date || post.createdTime, SITE.lang)}
      </time>
      <main>
        <LinkComp slug={post.slug}>
          <p className="hidden md:block leading-6 text-gray-700 dark:text-gray-300 transition-all hover:text-purple-600">
            {post.summary}
          </p>
        </LinkComp>
      </main>

      <div className="w-5/6 flex flex-row justify-between absolute bottom-4">
        <div>
          {post.authors &&
            post.authors.length > 0 &&
            post.authors.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex relative w-6 h-6 rounded-full border bg-gray-50 border-gray-100"
                >
                  <Image
                    className="border-4 rounded-full opacity-90"
                    layout="fill"
                    src={item.profile_photo}
                    alt={`${item.first_name}${item.last_name}`}
                  />
                  <span className="text-gray-400 text-sm ml-8">{`${item.first_name}${item.last_name}`}</span>
                </div>
              );
            })}
        </div>
        <div className="text-gray-400 text-sm">{post.slug}</div>
      </div>
    </article>
  );
};

export default BlogPost;

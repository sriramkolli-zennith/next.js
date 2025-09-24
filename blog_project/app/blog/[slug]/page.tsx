import * as React from 'react';
import { notFound } from 'next/navigation';
import { getPost as getPostNotCached, getPosts, Post } from '@/lib/posts';
import Link from 'next/link';

const getPost = React.cache(
  async (slug: string) => await getPostNotCached(slug)
);

export async function generateStaticParams() {
  const { posts } = await getPosts({ limit: 1000 });
  return posts.map((post: Post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const { frontmatter } = await getPost(params.slug);
    return frontmatter;
  } catch (e) { }
}

export default async function BlogPage({ params }: { params: { slug: string } }) {
  let post: any;
  try {
    post = await getPost(params.slug);
  } catch (e) {
    notFound();
  }

  return (
    <article className="prose dark:prose-invert">
      <div className="flex space-x-2 mb-8">
        {post.frontmatter.tags.map((tag: string) => <Link key={tag} href={`/blog/?tags=${tag}`} className="dark:text-gray-400 text-gray-500">#{tag}</Link>)}
      </div>
      {post.content}
    </article>
  );
}
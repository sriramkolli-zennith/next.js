
import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import H1 from '@/components/h1';
import React from 'react';


export function loadPost(slug: string): Buffer {
  const filename = slug.endsWith('.mdx') ? slug : `${slug}.mdx`;
  return fs.readFileSync(
    path.join(process.cwd(), 'content', filename)
  );
}


export async function getPost(slug: string): Promise<any> {
  const source = loadPost(slug).toString();
  return await compileMDX({
    source,
    components: {
      h1: H1 as typeof H1
    },
    options: {
      parseFrontmatter: true
    }
  });
}


export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  [key: string]: unknown;
}

export interface Post {
  frontmatter: PostFrontmatter;
  slug: string;
}

export interface GetPostsOptions {
  newest?: boolean;
  page?: number;
  limit?: number;
  tags?: string[];
}

export async function getPosts({
  newest = true, page = 1, limit = 3, tags
}: GetPostsOptions = {}): Promise<{ posts: Post[]; pageCount: number }> {
  const files = fs.readdirSync(
    path.join(
      process.cwd(), 'content'
    )
  );

  const posts: Post[] = await Promise.all(
    files.map(async filename => {
      const { frontmatter } = await getPost(filename);
      return {
        frontmatter: frontmatter as PostFrontmatter,
        slug: filename.replace('.mdx', '')
      };
    })
  );

  let filteredPosts = posts;

  if (tags) {
    filteredPosts = filteredPosts.filter(
      post => post.frontmatter.tags && post.frontmatter.tags.some(
        (tag: string) => tags.includes(tag)
      )
    );
  }

  if (newest) {
    filteredPosts.sort(
      (a, b) => {
        const dateA = new Date(a.frontmatter.date).getTime();
        const dateB = new Date(b.frontmatter.date).getTime();
        return dateB - dateA;
      }
    );
  } else {
    filteredPosts.sort(
      (a, b) => {
        const dateA = new Date(a.frontmatter.date).getTime();
        const dateB = new Date(b.frontmatter.date).getTime();
        return dateA - dateB;
      }
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  return {
    posts: filteredPosts.slice(startIndex, endIndex),
    pageCount: Math.ceil(filteredPosts.length / limit)
  };
}
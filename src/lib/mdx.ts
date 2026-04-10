/**
 * MDX rendering pipeline with math (KaTeX) and syntax highlighting support.
 *
 * Usage in a page component:
 *   import { renderMDX } from '@/lib/mdx';
 *   const { content } = await renderMDX(rawMdxString);
 *   // Then: <MDXRemote {...content} components={components} />
 */

import { compileMDX } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';

export async function renderMDX(source: string) {
  const { content, frontmatter } = await compileMDX({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [
          rehypeKatex,
          [rehypeHighlight, { ignoreMissing: true }],
        ],
      },
    },
  });

  return { content, frontmatter };
}

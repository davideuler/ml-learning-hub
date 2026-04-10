/**
 * Content utilities for loading MDX files from the /content directory.
 * Uses gray-matter for frontmatter parsing and reading-time for estimates.
 *
 * Usage (future MDX pages):
 *   import { getContentBySlug, getAllContentSlugs } from '@/lib/content';
 *   const post = await getContentBySlug('courses', 'pytorch-foundations');
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');

export type ContentMeta = {
  slug:        string;
  title:       string;
  description: string;
  date?:       string;
  tags?:       string[];
  level?:      'Beginner' | 'Intermediate' | 'Advanced';
  readingTime: string;
};

export type ContentItem = ContentMeta & {
  content: string;
};

/**
 * Get all slugs under a content category (e.g., 'courses', 'projects').
 */
export function getAllContentSlugs(category: string): string[] {
  const dir = path.join(CONTENT_DIR, category);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => f.replace(/\.mdx?$/, ''));
}

/**
 * Load a single MDX file by category + slug.
 */
export function getContentBySlug(category: string, slug: string): ContentItem | null {
  for (const ext of ['.mdx', '.md']) {
    const filePath = path.join(CONTENT_DIR, category, `${slug}${ext}`);
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(raw);
      const rt = readingTime(content);
      return {
        slug,
        title:       data.title       ?? slug,
        description: data.description ?? '',
        date:        data.date,
        tags:        data.tags        ?? [],
        level:       data.level,
        readingTime: rt.text,
        content,
      };
    }
  }
  return null;
}

/**
 * Get all content items in a category, sorted by date descending.
 */
export function getAllContent(category: string): ContentItem[] {
  const slugs = getAllContentSlugs(category);
  return slugs
    .map((slug) => getContentBySlug(category, slug))
    .filter((item): item is ContentItem => item !== null)
    .sort((a, b) => (a.date && b.date ? b.date.localeCompare(a.date) : 0));
}

import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import generateOgImage from "@/utils/generateOgImage";

export const get: APIRoute = async ({ params }) => ({
  body: await generateOgImage(params.ogImage)
});

const postImportResult = await getCollection("blog", ({ data }) => !data.draft);
const posts = Object.values(postImportResult);

export function getStaticPaths() {
  return posts
    .filter(({ data }) => !data.heroImage)
    .map(({ data }) => ({
      params: { ogImage: data.title }
    }));
}

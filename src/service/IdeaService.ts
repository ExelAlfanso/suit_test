import api from "../lib/axios";

export async function fetchIdeas(
  page: string,
  size: string | number,
  sort: string
) {
  const res = await api.get("/ideas", {
    params: {
      pageNumber: page,
      pageSize: size,
      sort,
      "append[]": ["small_image", "medium_image"],
    },
  });

  // Unwrap Next.js API envelope to return upstream payload { data, meta }
  return res.data.data;
}

export async function fetchIdeaBySlug(slug: string) {}

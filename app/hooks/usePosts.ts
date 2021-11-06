import useSWR from "swr";
import { Post } from ".prisma/client";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function usePosts(id?: string): [Post[] | undefined, boolean] {
  const url = id ? `/api/posts` : `/api/posts?id=${id}`;
  const { data, error } = useSWR<Post | Post[] | ApiErrorResponse>(
    url,
    fetcher
  );
  const postData = Array.isArray(data) ? data : undefined;
  const isLoading = !error && !data;

  return [postData, isLoading];
}

export default usePosts;

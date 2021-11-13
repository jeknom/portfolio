import useSWR from "swr";
import { Request } from ".";

export interface GetRequest<T = {}> extends Request {
  queryParams?: T;
}

async function fetcher<T>(url: string, query?: T) {
  const searchParams = new URLSearchParams();
  if (query) {
    for (let [key, value] of Object.entries(query)) {
      searchParams.append(key, value);
    }
  }
  const searchParamsString = searchParams.toString();
  const fullUrl = `${url}${
    searchParamsString && searchParamsString !== ""
      ? `?${searchParamsString}`
      : ""
  }`;

  return (
    await fetch(fullUrl, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
    })
  ).json();
}

function useGetRequest<TRequest, TResponse>(request: GetRequest<TRequest>) {
  const { url, queryParams } = request;
  const { data, error, mutate } = useSWR(url, (url) =>
    fetcher(url, queryParams)
  );
  const isLoading = !error && !data;
  const requestError: string | null = error
    ? error
    : data?.error
    ? data.error
    : null;
  const requestData: TResponse | null = !requestError
    ? (data as TResponse)
    : null;

  return [requestData, requestError, isLoading, mutate];
}

export default useGetRequest;

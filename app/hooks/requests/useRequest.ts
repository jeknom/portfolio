import { useState, useEffect } from "react";

interface RequestOptions<T = {}> {
  doRequestOnMount?: boolean;
  defaultValue?: T;
}

function useRequest<TResponse>(
  request: PortfolioAPIRequest,
  options?: RequestOptions<TResponse>
) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TResponse | null>(
    options?.defaultValue || null
  );
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<number | null>(null);

  async function doRequest(): Promise<TResponse | null> {
    setIsLoading(true);
    const { method, url, body, query } = request;
    try {
      const fullUrl = query ? buildUrl(url, query) : url;
      const result = await handleRequest(method, fullUrl, body);
      if (result.error && typeof result.error === "string") {
        setError(result.error);
        if (result.code) {
          setErrorCode(result.code);
        }
      } else if (result.error && typeof result.error === "object") {
        setError(`Prisma error ${result.error.code}`);
        if (result.code) {
          setErrorCode(result.code);
        }
      } else {
        setError(null);
        setErrorCode(null);
        setData(result);
      }

      setIsLoading(false);

      return result as TResponse;
    } catch (error) {
      setError(error.toString());
    }

    setIsLoading(false);

    return null;
  }

  useEffect(() => {
    if (options?.doRequestOnMount) {
      doRequest();
    }
  }, []);

  return {
    doRequest,
    data,
    error,
    errorCode,
    isLoading,
  };
}

async function handleRequest<TBody>(method: string, url: string, body: TBody) {
  const response = await fetch(url, {
    method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return response.json();
}

function buildUrl(url: string, query: object) {
  const searchParams = new URLSearchParams();
  const queryParams = Object.entries(query);

  if (queryParams.length === 0) {
    return url;
  }

  for (let [key, value] of queryParams) {
    searchParams.append(key, value);
  }

  return `${url}?${searchParams.toString()}`;
}

export default useRequest;

import { useState } from "react";
import { Request } from ".";

export interface RequestWithMethod<T = {}> extends Request {
  method: "GET" | "PUT" | "POST" | "DELETE";
  body?: T;
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

function usePostRequest(request: RequestWithMethod) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function doRequest<TResult>(): Promise<TResult | null> {
    setIsLoading(true);
    const { method, url, body } = request;
    try {
      const result = await handleRequest(method, url, body);
      if (result?.error) {
        setError(result.error);
      } else {
        setError(null);
      }

      setIsLoading(false);

      return result as TResult;
    } catch (error) {
      setError(error.toString());
    }

    setIsLoading(false);

    return null;
  }

  return [doRequest, error, isLoading];
}

export default usePostRequest;

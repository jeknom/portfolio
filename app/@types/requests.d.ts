declare type PortfolioAPIRequest<TBody = {}, TQuery = {}> = {
  url: string;
  method: "GET" | "PUT" | "POST" | "DELETE";
  query?: TQuery;
  body?: TBody;
};

declare type PortfolioAPIResponse<T extends {}> = T & {
  code?: number;
  error?: string;
};

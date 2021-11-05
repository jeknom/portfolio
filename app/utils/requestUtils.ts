import { NextApiRequest, NextApiResponse } from "next";

export type RequestHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>;

export class ApiRoute {
  private getHandler?: RequestHandler;
  private requiredGetParams: string[] = [];

  private postHandler?: RequestHandler;
  private requiredPostParams: string[] = [];

  private putHandler?: RequestHandler;
  private requiredPutParams: string[] = [];

  private deleteHandler?: RequestHandler;
  private requiredDeleteParams: string[] = [];

  private handlerAssignedError: string = "A handler can only be assigned once!";

  get(handler: RequestHandler, ...requiredParams: string[]) {
    if (this.getHandler) {
      console.trace(this.handlerAssignedError);
      return this;
    }

    this.getHandler = handler;
    this.requiredGetParams = requiredParams;

    return this;
  }

  post(handler: RequestHandler, ...requiredParams: string[]) {
    if (this.postHandler) {
      console.trace(this.handlerAssignedError);
      return this;
    }

    this.postHandler = handler;
    this.requiredPostParams = requiredParams;

    return this;
  }

  put(handler: RequestHandler, ...requiredParams: string[]) {
    if (this.putHandler) {
      console.trace(this.handlerAssignedError);
      return this;
    }

    this.postHandler = handler;
    this.requiredPostParams = requiredParams;

    return this;
  }

  delete(handler: RequestHandler, ...requiredParams: string[]) {
    if (this.deleteHandler) {
      console.trace(this.handlerAssignedError);
      return this;
    }

    this.deleteHandler = handler;
    this.requiredDeleteParams = requiredParams;

    return this;
  }

  build() {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      const { method, body, query } = req;

      try {
        if (method === "GET" && this.getHandler) {
          await ApiRoute.getParamsValidatedHandler(
            req,
            res,
            this.getHandler,
            query,
            this.requiredGetParams
          );
        } else if (method === "POST" && this.postHandler) {
          await ApiRoute.getParamsValidatedHandler(
            req,
            res,
            this.postHandler,
            body,
            this.requiredPostParams
          );
        } else if (method === "PUT" && this.putHandler) {
          await ApiRoute.getParamsValidatedHandler(
            req,
            res,
            this.putHandler,
            body,
            this.requiredPutParams
          );
        } else if (method === "DELETE" && this.deleteHandler) {
          await ApiRoute.getParamsValidatedHandler(
            req,
            res,
            this.deleteHandler,
            body,
            this.requiredDeleteParams
          );
        }
      } catch (error) {
        console.trace(error);
        res.status(500).json({ code: 500, error });
      }
    };
  }

  private static isValidParams(obj: object, params: string[]) {
    for (let param of params) {
      if (!obj[param]) {
        return false;
      }
    }

    return true;
  }

  private static async getParamsValidatedHandler(
    req: NextApiRequest,
    res: NextApiResponse,
    handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
    obj: object,
    params: string[]
  ) {
    const isValid = this.isValidParams(obj, params);
    if (isValid) {
      await handler(req, res);
    } else {
      const error = "Missing request params.";
      console.warn(error);
      res.status(400).json({ code: 400, error });
    }
  }
}

export const sendResourceNotFound = (
  res: NextApiResponse,
  error: string = "The requested resource does not exist"
) => {
  console.warn(error);
  res.status(404).json({ code: 404, error });
};

export const sendBadRequest = (
  res: NextApiResponse,
  error: string = "Bad request"
) => {
  console.warn(error);
  res.status(400).json({ code: 400, error });
};

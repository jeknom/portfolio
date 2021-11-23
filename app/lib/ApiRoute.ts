import { getSession } from "next-auth/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { permissions } from "constants/index";

export type RequestHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>;

type ValidationOptions = {
  requiredPermissions?: string[];
  requiredQueryParams?: string[];
  requiredBodyParams?: string[];
};

class ApiRoute {
  private getHandler?: RequestHandler;
  private requiredGetParams: string[] = [];
  private requiredGetPermissions: string[] = [];

  private postHandler?: RequestHandler;
  private requiredPostParams: string[] = [];
  private requiredPostPermissions: string[] = [];

  private putHandler?: RequestHandler;
  private requiredPutParams: string[] = [];
  private requiredPutPermissions: string[] = [];

  private deleteHandler?: RequestHandler;
  private requiredDeleteParams: string[] = [];
  private requiredDeletePermissions: string[] = [];

  private static handlerAssignedError: string =
    "A handler can only be assigned once!";

  get(
    handler: RequestHandler,
    requiredPermissions: string[] = [],
    requiredParams: string[] = []
  ) {
    if (this.getHandler) {
      console.trace(ApiRoute.handlerAssignedError);
      return this;
    }

    this.getHandler = handler;
    this.requiredGetPermissions = requiredPermissions;
    this.requiredGetParams = requiredParams;

    return this;
  }

  post(
    handler: RequestHandler,
    requiredPermissions: string[] = [],
    requiredParams: string[] = []
  ) {
    if (this.postHandler) {
      console.trace(ApiRoute.handlerAssignedError);
      return this;
    }

    this.postHandler = handler;
    this.requiredPostPermissions = requiredPermissions;
    this.requiredPostParams = requiredParams;

    return this;
  }

  put(
    handler: RequestHandler,
    requiredPermissions: string[] = [],
    requiredParams: string[] = []
  ) {
    if (this.putHandler) {
      console.trace(ApiRoute.handlerAssignedError);
      return this;
    }

    this.putHandler = handler;
    this.requiredPutPermissions = requiredPermissions;
    this.requiredPutParams = requiredParams;

    return this;
  }

  delete(
    handler: RequestHandler,
    requiredPermissions: string[] = [],
    requiredParams: string[] = []
  ) {
    if (this.deleteHandler) {
      console.trace(ApiRoute.handlerAssignedError);
      return this;
    }

    this.deleteHandler = handler;
    this.requiredDeletePermissions = requiredPermissions;
    this.requiredDeleteParams = requiredParams;

    return this;
  }

  build() {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      const { method } = req;

      try {
        if (method === "GET" && this.getHandler) {
          await ApiRoute.getValidatedHandler(req, res, this.getHandler, {
            requiredPermissions: this.requiredGetPermissions,
            requiredQueryParams: this.requiredGetParams,
          });
        } else if (method === "POST" && this.postHandler) {
          await ApiRoute.getValidatedHandler(req, res, this.postHandler, {
            requiredPermissions: this.requiredPostPermissions,
            requiredBodyParams: this.requiredPostParams,
          });
        } else if (method === "PUT" && this.putHandler) {
          await ApiRoute.getValidatedHandler(req, res, this.putHandler, {
            requiredPermissions: this.requiredPutPermissions,
            requiredBodyParams: this.requiredPutParams,
          });
        } else if (method === "DELETE" && this.deleteHandler) {
          await ApiRoute.getValidatedHandler(req, res, this.deleteHandler, {
            requiredPermissions: this.requiredDeletePermissions,
            requiredBodyParams: this.requiredDeleteParams,
          });
        } else {
          res.status(404).json({
            code: 404,
            error: "Api endpoint does not exist",
          });
        }
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2001"
        ) {
          res.status(400).json({
            code: 404,
            error: "The requested resource does not exist.",
          });
        } else {
          console.trace(error);
          res.status(500).json({ code: 500, error });
        }
      }
    };
  }

  private static getMissingParams(obj: object, params: string[]) {
    const missing: string[] = [];
    for (let param of params) {
      if (!obj[param]) {
        missing.push(param);
      }
    }

    return missing;
  }

  private static async getValidatedHandler(
    req: NextApiRequest,
    res: NextApiResponse,
    handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
    options?: ValidationOptions
  ) {
    if (options) {
      const session = await getSession({ req });
      const userPermissions = session?.user?.permissions || [];
      const hasRequiredPermissions =
        (options.requiredPermissions || []).every((p) =>
          userPermissions.includes(p)
        ) || userPermissions.includes(permissions.ADMIN);
      const missingBodyParams = this.getMissingParams(
        req.body,
        options.requiredBodyParams || []
      );
      const missingQueryParams = this.getMissingParams(
        req.query,
        options.requiredQueryParams || []
      );

      if (missingQueryParams.length > 0) {
        const error = `Missing query params ${missingQueryParams.join(", ")}.`;
        console.warn(error);
        res.status(400).json({ code: 400, error });

        return;
      }

      if (missingBodyParams.length > 0) {
        const error = `Missing body params ${missingBodyParams.join(", ")}.`;
        console.warn(error);
        res.status(400).json({ code: 400, error });

        return;
      }

      if (!hasRequiredPermissions) {
        const error = "You are not authorized to access this resource.";
        console.warn(error);
        res.status(401).json({ code: 401, error });

        return;
      }
    }

    await handler(req, res);
  }
}

export default ApiRoute;

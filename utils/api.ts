import { NextApiRequest, NextApiResponse } from "next";
import { Schema } from "yup";

export const postOnly = (req: NextApiRequest, res: NextApiResponse) => !(req.method === "POST" || res.status(400));
export const getOnly = (req: NextApiRequest, res: NextApiResponse) => !(req.method === "GET" || res.status(400));

export const post = (schema: Schema<any>, handler: (req: NextApiRequest, res: NextApiResponse) => unknown) =>
  (req: NextApiRequest, res: NextApiResponse) => {
    if (postOnly(req, res)) return;

    schema.isValid(req.body).then(valid => {
      if (valid) {
        handler(req, res);
      } else {
        res.end(400);
      }
    });
  };

export const get = (handler: (req: NextApiRequest, res: NextApiResponse) => unknown) =>
  (req: NextApiRequest, res: NextApiResponse) => {
    if (getOnly(req, res)) return;

    handler(req, res);
  };

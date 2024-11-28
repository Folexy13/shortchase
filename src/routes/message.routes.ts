import { Router, Request, Response, NextFunction } from "express";
import { messageController } from "../controllers";

const router: any = Router();


router
  .route("/")
  .post( async (req: Request, res: Response) => {
    try {
      const resp = await messageController.createMessage(req.body);
      return res.json({
        status: true,
        message: "message created successfully",
        newMessage:resp
      });
    } catch (error: any) {
      return res
        .status(500)
        .json({
          status: false,
          message: `An error occured - ${error.message ?? error}`,
        });
    }
  })
  .patch( async (req: Request, res: Response) => {
    try {
      const resp = await messageController.getMessages(req.body);
      return res.json({
        status: true,
        message: "Messages fethed successfully",
        messages: resp,
      });
    } catch (error: any) {
      return res
        .status(500)
        .json({
          status: false,
          message: `An error occured - ${error.message ?? error}`,
        });
    }
  })

  

  export default router
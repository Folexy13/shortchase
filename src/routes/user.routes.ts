import { Router, Request, Response, NextFunction } from "express";
import { userController } from "../controllers";

const router: any = Router();

router.post("/auth", async (req: Request, res: Response) => {
  try {
    const resp = await userController.loginUser(req.body);
    return res.json({
      status: true,
      message: "User logged in successfully",
      token: resp,
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({
        status: false,
        message: `An error occured - ${error.message ?? error}`,
      });
  }
});
router
  .route("/")
  .get(async (req: Request, res: Response) => {
   try {
     const users = await userController.getAllUsers();
     return res.json({
       status: true,
       message: "Users fetched successfully",
       users,
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
  .post(async (req: Request, res: Response) => {
    try {
      const resp = await userController.createUser(req.body);
      return res.json({
        status: true,
        message: "User created successfully",
        user: resp,
      });
    } catch (error: any) {
      return res
        .status(500)
        .json({
          status: false,
          message: `An error occured - ${error.message ?? error}`,
        });
    }
  });

router
  .route("/:id")
  .get(async (req: Request, res: Response) => {
   try {
     const user = await userController.getUser(req.params.id);
     return res.json({
       status: true,
       message: "User fetched successfully",
       user,
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
  .post()
  .put(async (req: Request, res: Response) => {
   const id = req.params.id;
   try {
     const resp = await userController.updateUser({ ...req.body, id });
     return res.json({
       status: true,
       message: "User Updated successfully",
       user: resp,
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
  .delete (async (req: Request, res: Response) => {
      try {
        await userController.deleteUser(req.params.id);
        return res.json({
          status: true,
          message: "Users deleted successfully",
        });
      } catch (error: any) {
        return res
          .status(500)
          .json({
            status: false,
            message: `An error occured - ${error.message ?? error}`,
          });
      }
    }
  );

export default router;

import { BaseController } from "../base-controller";
import { IUserController } from "./IUserController";
import { CreateUserDto, ReturnUserDto } from "@src/domain/User/dtos";
import { IUserService } from "@src/application/Services/User/IUserService";
import { IValidator } from "@src/libs/Validator/IValidator";
import { NextFunction, Request, Response } from "express";

export class UserController extends BaseController implements IUserController {
  private readonly _userService: IUserService;
  private readonly _validator: IValidator;

  constructor(userService: IUserService, _validator: IValidator) {
    super();
    this._userService = userService;
    this._validator = _validator;
  }

/**
 * @openapi
 * /api/vbeta/users:
 *   post:
 *     description: Create a user
 *     responses:
 *       200:
 *         description: OK
 *         content:application/json:
 *         schema: 
 *          type: Object
 *          properties:
 *            data: 
 *              type: Object
 *
*/

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const createUserDto = this.bodyParser(
        CreateUserDto,
        req.body as Record<string, unknown>
      );
      await this._validator.validate(createUserDto);
      const user = await this._userService.create(createUserDto);
      const userData = this.transformToPlainObj(user);
      return this.ok(res, { user: userData });
    } catch (error) {
      if (!(error instanceof Error)) return;
      next(error);
    }
	}

  getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const user = await this._userService.getAll();
      return this.ok(res, { user });
    } catch (error) {
      if (!(error instanceof Error)) return;
      next(error);
    }
	}

}

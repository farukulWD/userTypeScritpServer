import { Request, Response } from 'express';

import User from './user.model';
import { userServices } from './user.service';
import UsersValidationSchema, { OrderDataValidation } from './user.validation';
const createUser = async (req: Request, res: Response) => {
  try {
    console.log('api hit');
    const userdata = req.body;
    // data validation using zod
    const userValidationData = UsersValidationSchema.parse(userdata);
    const result = await userServices.createUserIntoDb(userValidationData);
    console.log(userdata);
    res.status(200).json({
      status: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Something went wrong!',
      data: error,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUserFromDb();
    res.status(200).json({
      status: true,
      message: 'Users retrived successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Something went wrong!',
      data: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const isUserExists = await User.isUserExists(userId);
    if (isUserExists) {
      const result = await userServices.getSingleUserFromDb(Number(userId));
      res.status(200).json({
        status: true,
        message: 'User retrived successfully',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 404,
        description: err,
      },
    });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = req.body;
    const isUserExists = await User.isUserExists(userId);
    if (isUserExists) {
      const userDataValidation = UsersValidationSchema.parse(userData);
      const result = await userServices.updateSingleUserIntoDb(
        Number(userId),
        userDataValidation,
      );

      // find new updated user to send in the response data
      if (result) {
        const findUpdatedUser = await User.findOne(result._id, {
          password: 0,
          orders: 0,
          isDeleted: 0,
        });
        res.status(200).json({
          status: true,
          message: 'User updated successfully',
          data: findUpdatedUser,
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 404,
        description: err,
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // check if the user is exists or not
    const isUserExists = await User.isUserExists(userId);
    if (isUserExists) {
      const result = await userServices.deleteUserFromDb(Number(userId));

      res.status(200).json({
        status: true,
        message: 'Users deleted successfully',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Something went wrong!',
      data: error,
    });
  }
};
const addOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orderData = req.body;
    // check if the user is exist or not
    const isUserExists = await User.isUserExists(userId);
    if (isUserExists) {
      // orderdata validation using zod
      const orderValidationData = OrderDataValidation.parse(orderData);
      const result = await userServices.addOrderIntoDb(
        Number(userId),
        orderValidationData,
      );
      res.status(200).json({
        status: true,
        message: 'Order added successfully',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 404,
        description: err,
      },
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // check if the user is exist or not
    const isUserExists = await User.isUserExists(userId);
    if (isUserExists) {
      const result = await userServices.getAllOrdersFromDb(Number(userId));
      res.status(200).json({
        status: true,
        message: 'Order retrived successfully',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 404,
        description: err,
      },
    });
  }
};

const getTotalPriceOfOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // check if the user is exist or not
    const isUserExists = await User.isUserExists(userId);
    if (isUserExists) {
      const result = await userServices.getTotalPriceOfOrdersFromDb(
        Number(userId),
      );
      res.status(200).json({
        status: true,
        message: 'Total price retrived successfully',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 404,
        description: err,
      },
    });
  }
};
export const userControllers = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateSingleUser,
  addOrder,
  getAllOrders,
  getTotalPriceOfOrders,
};

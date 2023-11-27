import { TOrder, TUser } from './user.interface';
import User from './user.model';

const createUserIntoDb = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};

const getAllUserFromDb = async () => {
  const result = await User.aggregate([
    { $match: { isDeleted: { $eq: false } } },
    {
      $project: {
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
      },
    },
  ]);
  return result;
};

const getSingleUserFromDb = async (userId: number) => {
  const result = await User.findOne(
    { userId },
    {
      userId: 1,
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      isActive: 1,
      hobbies: 1,
      address: 1,
    },
  );
  return result;
};

const updateSingleUserIntoDb = async (
  userId: number,
  updatedUserData: TUser,
) => {
  const result = await User.findOneAndUpdate(
    { userId },
    { ...updatedUserData },
  );
  return result;
};

const deleteUserFromDb = async (userId: number) => {
  const result = await User.updateOne({ userId }, { isDeleted: true });
  return result;
};

const addOrderIntoDb = async (userId: number, orderData: TOrder) => {
  const result = await User.updateOne(
    { userId },
    { $push: { orders: orderData } },
  );
  return result;
};

const getAllOrdersFromDb = async (userId: number) => {
  const result = await User.findOne({ userId }, { orders: 1, _id: 0 });
  return result;
};

const getTotalPriceOfOrdersFromDb = async (userId: number) => {
  const result = await User.aggregate([
    {
      $match: {
        userId: userId,
      },
    },
    {
      $unwind: '$orders',
    },
    {
      $group: {
        _id: '$userId',
        totalPrice: { $sum: '$orders.price' },
      },
    },
  ]);
  return result;
};

export const userServices = {
  createUserIntoDb,
  getAllUserFromDb,
  getSingleUserFromDb,
  updateSingleUserIntoDb,
  deleteUserFromDb,
  addOrderIntoDb,
  getAllOrdersFromDb,
  getTotalPriceOfOrdersFromDb,
};

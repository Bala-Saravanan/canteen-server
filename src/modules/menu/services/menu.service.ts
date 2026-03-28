import { MenuModel, IMenu } from "./../models";
import { CreateMenuInput, UpdateMenuInput, MenuResponse } from "./../types";

const formatMenu = (menu: IMenu): MenuResponse => ({
  id: menu._id.toString(),
  name: menu.name,
  price: menu.price,
  category: menu.category,
  isAvailable: menu.isAvailable,
  createdAt: menu.createdAt,
});

export const getAllMenuItems = async (): Promise<MenuResponse[]> => {
  const items = await MenuModel.find().sort({ category: 1, name: 1 });
  return items.map(formatMenu);
};

export const createMenuItem = async (
  input: CreateMenuInput,
): Promise<MenuResponse> => {
  const existing = await MenuModel.findOne({ name: input.name });
  if (existing) throw new Error("Menu item with this name already exists");
  const item = await MenuModel.create(input);
  return formatMenu(item);
};

export const updateMenuItem = async (
  id: string,
  input: UpdateMenuInput,
): Promise<MenuResponse> => {
  const item = await MenuModel.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true,
  });
  if (!item) throw new Error("Menu item not found");
  return formatMenu(item);
};

export const deleteMenuItem = async (id: string): Promise<void> => {
  const item = await MenuModel.findByIdAndDelete(id);
  if (!item) throw new Error("Menu item not found");
};

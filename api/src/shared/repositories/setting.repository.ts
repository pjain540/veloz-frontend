import { ISetting } from "../../modules/settings/setting.interface";
import SettingModel from "../../modules/settings/setting.model";

export const createSetting = async (data: ISetting) => {
    return await SettingModel.create(data)
}

export const getSettingBySlug = async (slug: string) => {
    return await SettingModel.findOne({ slug })
}

export const updateSettingBySlug = async (slug: string, data: ISetting) => {
    return await SettingModel.findOneAndUpdate({ slug }, data, { new: true })
}

export const getAllSettings = async () => {
    return await SettingModel.find({ deletedAt: null })
}
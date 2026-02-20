import { Request } from "express";
import { slugify } from "../../helpers/slugify";
import { createSetting, getAllSettings, getSettingBySlug, updateSettingBySlug } from "../../shared/repositories/setting.repository";

export const createSettingService = async (req: Request) => {
    const { name } = req.body
    const slug = slugify(name)
    return await createSetting({ ...req.body, slug })
}

export const getSettingBySlugService = async (req: Request) => {
    const { slug } = req.params as { slug: string }
    if (!slug) {
        throw new Error('Slug is required')
    }
    return await getSettingBySlug(slug)
}

export const updateSettingBySlugService = async (req: Request) => {
    const { slug } = req.params as { slug: string }
    if (!slug) {
        throw new Error('Slug is required')
    }
    return await updateSettingBySlug(slug, req.body)
}

export const getAllSettingsService = async () => {
    return await getAllSettings()
}
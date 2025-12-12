export const getForm = (formData: FormData, key: string) => {
    return formData.get(key)?.toString().trim() ?? ""
}
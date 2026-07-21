import * as yup from "yup"

export const recipeSchema = yup.object().shape({
    title: yup.string().required("O título é obrigatório"),
    category: yup.string().required("A descrição é obrigatória"),
    description: yup.string().required("A descrição é obrigatória"),
    imageURL: yup.string().required("A URL da imagem é obrgatória"),
    prepTime: yup.string().required("O tempo de preparo é obrigatório"),
    cookTime: yup.string().required("O tempo de cozimento é obrigatório"),
    servings: yup
        .number()
        .typeError("As porções devem ser um número")
        .positive("O número de porções deve ser positivo")
        .integer("O número de porções deve ser inteiro")
        .min(1, "A receita deve render pelo menos 1 porção")
        .required("O número de pórções é obrigatório")
})

export type RecipeFormData = yup.InferType<typeof recipeSchema>
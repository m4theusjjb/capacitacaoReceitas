"use client";

import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import RecipeCard from "@/components/RecipeCard";
import RecipeFormModal from "@/components/RecipeFormModal";
import {recipes as initalRecipes} from "@/lib/data";
import type {Recipe} from "@/lib/data";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function ReceitasPage(){
    const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
    const [isDeletedConfirmationModalOpen, setIsDeletedConfirmationModalOpen] = useState(false)
    const [recipes, setRecipes] = useState<Recipe[]>(initalRecipes);
    const [modalMode, setModalMode] = useState<"create" | "edit">("create");
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);

    const handleOpenCreateModal = () => {
        setModalMode("create");
        setSelectedRecipe(undefined);
        setIsRecipeModalOpen(true);
    };

    const handleOpenEditModal =  (recipe: Recipe) => {
        setModalMode("edit");
        setSelectedRecipe(recipe);
        setIsRecipeModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsRecipeModalOpen(false);
    };

    const handleSaveRecipe = (recipeData: Omit <Recipe,"id"> | Recipe) => {
        if(modalMode === "create"){
            const newRecipe: Recipe = {
                ...recipeData,
                id: (recipes.length + 1).toString()
            };
            setRecipes((prev)=>[...prev, newRecipe])
        } else { // modalMode === "edit"
            const updateRecipe = recipeData as Recipe
            setRecipes((prev) => prev.map((recipe) => (recipe.id === updateRecipe.id ? updateRecipe : recipe)))
        }
        handleCloseModal()
    };

    const handleOpenDeleteConfirmationModal = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
        setIsDeletedConfirmationModalOpen(true)
    }

    const handleDeleteRecipe = () => {
        if(selectedRecipe){
            setRecipes((prev) => prev.filter((recipe) => recipe.id !== selectedRecipe.id))

            setIsDeletedConfirmationModalOpen(false)
            setSelectedRecipe(undefined)
        }
    }

    return (
        <main className="grow py-8">
            <div className="container mx-auto">
                <div className="flex justify-between w-full">
                    <h1 className="text-3xl font-bold">Todas as receitas</h1>

                    <button onClick={handleOpenCreateModal} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-black hover:bg-gray-800 transition-colors">
                        <Plus size={16}/>
                        Nova Receita
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-8 mt-8">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.id}recipe={recipe} onEdit={() => handleOpenEditModal(recipe)} onDelete={() => handleOpenDeleteConfirmationModal(recipe)}/>
                    ))}
                </div>
            </div>

            <RecipeFormModal isOpen={isRecipeModalOpen} onClose={handleCloseModal} onSave={handleSaveRecipe} mode={modalMode} recipe={selectedRecipe}/>

            <DeleteConfirmationModal isOpen={isDeletedConfirmationModalOpen} onClose={() => setIsDeletedConfirmationModalOpen(false)} onConfirm={handleDeleteRecipe} recipe={selectedRecipe}/>
        </main>
    )
}
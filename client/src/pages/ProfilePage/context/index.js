import { createContext } from "react";


export const modalContextStore = {
	selectedCategoryForDelete: '',
	selectedBlogForDelete: '',
	selectedRecipeForDelete: '',
	
	newPhraseToAdd: '',
	newCategoryToAdd: '',
	
	phraseForDelete: '',
	categoryForDelete: '',
	
	userEditEmailForChange: '',
	userEditNewNickname: '',
	userEditNewRole: '',


	selectRecipeForDelete(val) {
		this.selectedRecipeForDelete = val;
	},

	addNewPhrase(val) {
		this.newPhraseToAdd = val;
	},
	
	addNewCategory(val) {
		this.newCategoryToAdd = val;
	},

	selectPhraseForDelete(val) {
		this.phraseForDelete = val;
	},
	
	selectCategoryForDelete(val) {
		this.categoryForDelete = val;
	},

	selectBlogForDelete(val) {
		this.selectedBlogForDelete = val;
	},

	changeUserEditEmailForChange(val) {
		this.userEditEmailForChange = val;
	},

	changeUserEditNewNickname(val) {
		this.userEditNewNickname = val;
	},

	changeUserEditNewRole(val) {
		this.userEditNewRole = val;
	}

}


export const DataContext = createContext(modalContextStore);
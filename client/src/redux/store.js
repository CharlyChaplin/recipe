import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import infoSlice from "./slices/infoSlice";
import phraseSlice from "./slices/phraseSlice";
import categorySlice from "./slices/categorySlice";
import blogSlice from "./slices/blogSlice";
import recipeSlice from "./slices/recipeSlice";
import searchSlice from "./slices/searchSlice";



const store = configureStore({
	reducer: {
		userReducer: userSlice,
		infoReducer: infoSlice,
		phraseReducer: phraseSlice,
		categoryReducer: categorySlice,
		blogReducer: blogSlice,
		recipeReducer: recipeSlice,
		searchReducer: searchSlice
	}
});


export default store;
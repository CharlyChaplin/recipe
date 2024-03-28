import react, { FC, createContext, useContext } from "react";
import { EditorApi, useEditor } from "./useEditor";

const TextEditorContext = createContext<EditorApi | undefined>(undefined);

type TextEditorProvider = {
	children: string
}

export const TextEditorProvider: FC<TextEditorProvider> = ({ children }) => {
	const editorApi = useEditor();

	return (
		<TextEditorContext.Provider value={editorApi}>
			{children}
		</TextEditorContext.Provider>
	);
};

export const useEditorApi = () => {
	const context = useContext(TextEditorContext);
	if (context === undefined) {
		throw new Error("useEditorApi must be used within TextEditorProvider");
	}

	return context;
};

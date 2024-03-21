import * as React from "react";
import { Editor } from "draft-js";
import { BLOCK_RENDER_MAP, CUSTOM_STYLE_MAP } from "./config";
import { useEditorApi } from "./context";
import cn from "classnames";
import { Editor_Wrapper } from "./styled";

export type TextEditorProps = {
	className?: string;
};

const TextEditor: React.FC<TextEditorProps> = ({ className }) => {
	const editorApi = useEditorApi();

	return (
		<Editor_Wrapper cls={cn("text-editor", className)}>
			<Editor
				spellCheck
				handleKeyCommand={editorApi.handleKeyCommand}
				customStyleMap={CUSTOM_STYLE_MAP}
				blockRenderMap={BLOCK_RENDER_MAP}
				editorState={editorApi.state}
				onChange={editorApi.onChange}
				keyBindingFn={editorApi.handlerKeyBinding}
			/>
		</Editor_Wrapper>
	);
};

export default TextEditor;

import react, { FC } from "react";
import { useEditorApi } from "../TextEditor";
import cn from "classnames";
import { BlockType, InlineStyle } from "../TextEditor/config";
import './styled';
import { Tool_Panel } from "./styled";
import { Divisor } from "pages/BlogEditPage/styled";

const ToolPanel: FC = () => {
	const {
		toHtml,
		addLink,
		toggleBlockType,
		currentBlockType,
		toggleInlineStyle,
		hasInlineStyle,
	} = useEditorApi();

	return (

		<Tool_Panel>
			<button
				className={cn(
					"tool-panel__item",
					currentBlockType === BlockType.h1 && "tool-panel__item_active"
				)}
				onMouseDown={(e) => {
					e.preventDefault();
					toggleBlockType(BlockType.h1);
				}}
			>
				H1
			</button>
			<button
				className={cn(
					"tool-panel__item",
					currentBlockType === BlockType.h2 && "tool-panel__item_active"
				)}
				onMouseDown={(e) => {
					e.preventDefault();
					toggleBlockType(BlockType.h2);
				}}
			>
				H2
			</button>
			<button
				className={cn(
					"tool-panel__item",
					currentBlockType === BlockType.h3 && "tool-panel__item_active"
				)}
				onMouseDown={(e) => {
					e.preventDefault();
					toggleBlockType(BlockType.h3);
				}}
			>
				H3
			</button>
			<button
				className={cn(
					"tool-panel__item",
					currentBlockType === BlockType.h4 && "tool-panel__item_active"
				)}
				onMouseDown={(e) => {
					e.preventDefault();
					toggleBlockType(BlockType.h4);
				}}
			>
				H4
			</button>
			<button
				className={cn(
					"tool-panel__item",
					currentBlockType === BlockType.h5 && "tool-panel__item_active"
				)}
				onMouseDown={(e) => {
					e.preventDefault();
					toggleBlockType(BlockType.h5);
				}}
			>
				H5
			</button>
			<button
				className={cn(
					"tool-panel__item",
					currentBlockType === BlockType.h6 && "tool-panel__item_active"
				)}
				onMouseDown={(e) => {
					e.preventDefault();
					toggleBlockType(BlockType.h6);
				}}
			>
				H6
			</button>

			<Divisor n={3} />

			<button
				className={cn(
					"tool-panel__item",
					currentBlockType === BlockType.cite && "tool-panel__item_active"
				)}
				onMouseDown={(e) => {
					e.preventDefault();
					toggleBlockType(BlockType.cite);
				}}
			>
				Сноска
			</button>

			<Divisor n={3} />

			{Object.values(InlineStyle).map((v) => (
				<button
					key={v}
					className={cn(
						"tool-panel__item",
						hasInlineStyle(v) && "tool-panel__item_active"
					)}
					onMouseDown={(e) => {
						e.preventDefault();
						toggleInlineStyle(v);
					}}
				>
					{
						v === 'BOLD'
							? "B"
							: v === 'ITALIC'
								? "I"
								: v === 'UNDERLINE'
									? 'U'
									: v === 'ACCENT'
										? 'Выделить'
										: ''
					}
				</button>
			))}
			
			<Divisor n={3} />

			<button
				className="tool-panel__item"
				onClick={() => {
					const url = prompt("URL:");
					if (url) {
						addLink(url);
					}
				}}
			>
				Ссылка
			</button>

			{/* <button
				className="tool-panel__item"
				onClick={() => {
					console.log(toHtml());
				}}
			>
				Print
			</button> */}

			{/* <button
				className={cn(
					"tool-panel__item",
					currentBlockType === BlockType.default && "tool-panel__item_active"
				)}
				onMouseDown={(e) => {
					e.preventDefault();
					toggleBlockType(BlockType.default);
				}}
			>
				Очистить формат
			</button> */}
		</Tool_Panel>

	);
};

export default ToolPanel;

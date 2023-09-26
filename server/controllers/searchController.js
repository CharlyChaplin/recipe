import { config } from 'dotenv';
import db from '../db.js';


class SearchController {
	async searchQuery(req, res) {
		const { q } = req.query;
		
		let categoryResult, blogResult;

		try {
			const getDataFromRecipe = await db.query(`
				SELECT *
				FROM recipe
				WHERE
				id IN (
					SELECT DISTINCT(recipe_id)
					FROM ingredient
					WHERE caption ILIKE '%${q}%'
					ORDER BY recipe_id
				)
				
				OR
					(
						caption ILIKE '%${q}%' OR
						caption_lat ILIKE '%${q}%' OR
						shortdescription ILIKE '%${q}%' OR
						cookingtext ILIKE '%${q}%'
					);
			`);
			// если нашли, то формируем массив из найденого
			if (getDataFromRecipe.rowCount) {
				categoryResult = getDataFromRecipe.rows.map(item => {
					return (
						{
							image: config().parsed.LOCAL_ADDRESS + item.photopreview,
							description: item.caption,
							link: `/recipe/${item.caption_lat}`
						}
					)
				})
			}
			// ищем в блогах
			const getDataFromBlog = await db.query(`
				 SELECT caption,
				 		  caption_lat,
				 		  description,
						  photopreview
				 FROM blog
				 WHERE caption ILIKE '%${q}%' OR
				 		 caption_lat ILIKE '%${q}%' OR
				 		 description ILIKE '%${q}%';
			`);
			// если нашли, то формируем массив из найденого
			if (getDataFromBlog.rowCount) {
				blogResult = getDataFromBlog.rows.map(item => {
					return (
						{
							image: config().parsed.LOCAL_ADDRESS + item.photopreview,
							description: item.caption,
							link: `/blog/${item.caption_lat}`
						}
					)
				})
			}

			// формируем объект для выдачи
			const outData = {
				category: categoryResult,
				blog: blogResult
			}
						
			res.json(outData);
		} catch (err) {
			console.log(err);
			res.status(400).json({ message: err });
		}
	}
}

export default new SearchController;
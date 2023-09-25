import { Router } from "express";
import PhraseController from "../controllers/phraseController.js";
import roleCheck from "../middlewares/roleCheck.js";

const phraseRouter = Router();


phraseRouter.post('/add', PhraseController.addPhrase);
phraseRouter.post('/delete', PhraseController.deletePhrase);
phraseRouter.put('/change', PhraseController.changePhrase);
phraseRouter.get('/getbyid/:id', PhraseController.getPhraseById);
phraseRouter.get('/phrasernd', PhraseController.getRandomPhrase);
phraseRouter.get('/phrases', PhraseController.getAllPhrases);


export default phraseRouter;
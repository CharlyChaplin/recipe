import { Router } from "express";
import PhraseController from "../controllers/phraseController.js";
import roleCheck from "../middlewares/roleCheck.js";

const phraseRouter = Router();


phraseRouter.post('/add', roleCheck(1), PhraseController.addPhrase);
phraseRouter.post('/delete', roleCheck(1), PhraseController.deletePhrase);
phraseRouter.put('/change', roleCheck(1), PhraseController.changePhrase);
phraseRouter.get('/getbyid/:id', roleCheck(1), PhraseController.getPhraseById);
phraseRouter.get('/phrasernd',roleCheck(1), PhraseController.getRandomPhrase);
phraseRouter.get('/phrases', roleCheck(1), PhraseController.getAllPhrases);


export default phraseRouter;
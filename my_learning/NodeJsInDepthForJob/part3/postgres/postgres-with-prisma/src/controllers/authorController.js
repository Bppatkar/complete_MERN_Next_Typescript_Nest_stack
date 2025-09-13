import { addAuthor, deleteAuthor } from '../services/authorService.js';

async function addAuthorController(req, res) {
  try {
    const { name } = req.body;
    const author = await addAuthor(name);
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function deleteAuthorController(req, res) {
  try {
    const deletedResult = await deleteAuthor(parseInt(req.params.id));
    res.status(200).json({
      message: `Author deleted with id ${req.params.id}`,
      deletedResult,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export { addAuthorController, deleteAuthorController };

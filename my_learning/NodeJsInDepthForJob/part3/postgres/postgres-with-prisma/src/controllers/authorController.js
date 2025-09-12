import authorService from '../services/authorService.js';

async function addAuthor(req, res) {
  try {
    const { name } = req.body;
    const author = await authorService.addAuthor(name);
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function deleteAuthor(req, res) {
  try {
    const deletedResult = await authorService.deleteAuthor(
      parseInt(req.params.id)
    );
    res.status(200).json({
      message: `Author deleted with id ${req.params.id}`,
      deletedResult,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export { addAuthor, deleteAuthor };

const categoriaModel = require('./categoria');

class CategoriaView {
    constructor() {}

    async getAll(req, res) {
        try {
            const categorias = await categoriaModel.getCategoriaByUsuarioId(req.user.id);
            res.json(categorias);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const id = Number(req.params.id);
            const categoria = await categoriaModel.getCategoriaById(id);

            if (!categoria) {
                return res.status(404).json({ error: 'Categoria não encontrada' });
            }

            if (categoria.userId !== req.user.id) {
                return res.status(403).json({ error: 'Acesso negado' });
            }

            res.json(categoria);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const { title, description } = req.body || {};

            if (!title) {
                return res.status(400).json({ error: 'O campo title é obrigatório' });
            }

            const newCategoria = await categoriaModel.createCategoria(req.user.id, title, description);
            res.status(201).json(newCategoria);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const id = Number(req.params.id);
            const { title, description } = req.body || {};

            const categoria = await categoriaModel.getCategoriaById(id);

            if (!categoria) {
                return res.status(404).json({ error: 'Categoria não encontrada' });
            }

            if (categoria.userId !== req.user.id) {
                return res.status(403).json({ error: 'Acesso negado' });
            }

            const updateCategoria = await categoriaModel.updateCategoria(id, title, description);
            res.json(updateCategoria);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const id = Number(req.params.id);

            const categoria = await categoriaModel.getCategoriaById(id);

            if (!categoria) {
                return res.status(404).json({ error: 'Categoria não encontrada' });
            }

            if (categoria.userId !== req.user.id) {
                return res.status(403).json({ error: 'Acesso negado' });
            }

            await categoriaModel.deleteCategoria(id);

            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new CategoriaView();

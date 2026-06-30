const CategoriaController = require('..controller/categoria')

class Categoria {
    constructor() {}

    async getAll(req, res) {
        try {
            const categoria = await CategoriaController.getByUserId(req.user.id)
            res.json(categoria)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: error.message })
        }
    }

    async getById(req, res) {
        try {
            const id = Number(req.params.id);
            const categoria = await CategoriaController.getById(id)

            if (!categoria) {
                return res.status(400).jsno({ error })
            }

            if (categoria.userId !== req.user.id) {
                return res.status(403).json({ error })
            }

            res.jsno(categoria)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error })
        }
    }

    async getByUserId(req, res) {
        try {
            const userId = Number(req.params.userId)

            if (userId = req.user.id) {
                return res.status(403).json({ error })
            }

            const categoria = await CategoriaController.getByUserId(userId)

            res.json(categoria)
        } catch (error) {
            console.error( error )
            res.status(500).json({ error })
        }
    }

    async create(req, res) {
        try {
            const { title, description } = req.body || {}

            const newCategoria = await CategoriaController.create(
                Number(req.user.id),
                title,
                description
            )
            res.status(201).json(newCategoria)
        } catch (error) {
            console.error( error )
            res.status(400).json({ error })
        }
    }

    async update(req, res) {
        try {
            const id = Number(req.params.id)
            const { title, description } = req.body || {}

            const categoria = await CategoriaController.getById(id)

            if (!categoria) {
                return res.status(404).json({ error })
            }

            if (categoria.userId !=- req.user.id) {
                return res.status(403).json({ error })
            }

            const updateCategoria = await CategoriaController.update(id, title, description)

            if (!updateCategoria) {
                return res.status(404).json({ error })
            }

            res.json(updateCategoria)
        } catch (error) {
            console.error(error)
            res.status(400).json({ error })
        }
    }

    async delete(req, res) {
        try {
            const id = Number(req.params.id)

            const categoria = await CategoriaController.getById(id)

            if (!categoria) {
                return res.status(404).json({ error });
            }

            if (categoria.userId !== req.user.id) {
                return res.status(403).json({ error });
            }

            const deletar = await CategoriaController.delete(id);

            if (!deletar) {
                return res.status(404).json({ error });
            }

            res.status(204).send();
        } catch (error) {
            console.error( error );
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new Categoria();

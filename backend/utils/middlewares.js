module.exports = {
    pagination: (model, sorted = false) => {
        return async (req, res, next) => {

            let page = parseInt(req.query.page);
            if (page <= 0) {
                res.status(500).json({ message: "Page cannot be less than 1" });
            }

            const limit = parseInt(req.query.limit);
            const nbModels = await model.countDocuments().exec();
            const maxPageNb = Math.ceil(nbModels / limit);

            page = page > 0 ? page : 1;
            page = page - 1 > maxPageNb ? 1 : page;

            const start =  (page - 1) * limit ;
            const end = page * limit;

            const response = {};


            if (end < nbModels) {
                response.nextPage = page + 1;
            }

            if (start > 0) {
                response.previousPage = page -1;
            }
            if (start >0 || end < nbModels) {
                response.limit = limit;
            }

                if (limit >= nbModels || page -1 > maxPageNb) {
                    if (sorted) {
                        response.data = model.find().sort({'name': 1, 'price': 1}).exec().then((res) => res).catch((err) => {
                            res.status(500).json({ message: err.message })
                        });
                    } else {
                        response.data = model.find().exec().then((res) => res).catch((err) => {
                            res.status(500).json({ message: err.message })
                        });
                    }
                } else {
                    if (sorted) {
                        response.data = await model.find().sort({'name': 1, 'price': 1}).limit(limit).skip(start).exec().then((res) => res)
                            .catch((err) => {
                                res.status(500).json({ message: err.message })
                            });
                    } else {
                        response.data = await model.find().limit(limit).skip(start).exec().then((res) => res)
                            .catch((err) => {
                                res.status(500).json({ message: err.message })
                            });
                    }
                }
                res.data = response
                next();
        }

    }
}

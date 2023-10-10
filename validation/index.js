module.exports = (prop, schema) => async (req, _, next) => {
    try {
        await schema.validateAsync(req[prop]);
        next();
    } catch (error) {
        console.error(error);
    }
};

const getPatients = (req, res) => {
    try {
        return res.status(200).json({
            data: 'comunicacion con paciente',
            error: false
        })
    } catch (error) {
        return res.error(400).json({
            error: true,
            message: error
        });
    }
};

module.exports = {
    getPatients
}
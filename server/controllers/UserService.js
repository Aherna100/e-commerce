const { User } = require('../models');
const createError = require('http-errors');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json({ users })
    } catch (error) {
        throw createError(500, err);
    }
}

const getUserById = async (id) => {
    try {
        const user = await User.findOne({
            where: { id }
        });

        if (!user) {
            throw createError(500, 'User not Found');
        }

        return user;
        
    } catch (err) {
        throw createError(500, err);
    }
}

// const getUserById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const user = await User.findOne({
//             where: { id }
//         });
//         if (user) {
//             return res.status(200).json({ user });
//         }
//         return res.status(404).send('User does not exists');
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// }

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await User.update(req.body, {
            where: { id }
        });
        if (updated) {
            const updatedUser = await User.findOne({
                where: { id }
            });
            return res.status(200).json({ user: updatedUser })
        }
        throw new Error('User not Found');
    } catch (error) {
        throw createError(500, err);
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await User.destroy({
            where: { id }
        });
        if (deleted) {
            return res.status(204).send("User Deleted");
        }
        throw new Error("User not found");
    } catch (error) {
        throw createError(500, err);
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}
const express = require("express");
const bcrypt = require("bcryptjs");
const { User, Education, Experience } = require("../models/User");

exports.getUser = async (req, res) => {
    const user = await User.findByPk(req.params.id, { include: [Education, Experience] });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
};

exports.updateUser = async (req, res) => {
    if (req.user.id != req.params.id) return res.status(403).json({ message: "Not authorized" });
    const { education, experience, ...userData } = req.body;

    await User.update(userData, { where: { id: req.params.id } });

    if (education) {
        await Education.destroy({ where: { UserId: req.params.id } });
        for (const edu of education) {
            await Education.create({ ...edu, UserId: req.params.id });
        }
    }

    if (experience) {
        await Experience.destroy({ where: { UserId: req.params.id } });
        for (const exp of experience) {
            await Experience.create({ ...exp, UserId: req.params.id });
        }
    }

    res.json({ success: true, message: "User updated successfully" });
};

exports.deleteEducation = async (req, res) => {
    if (req.user.id != req.params.userId) return res.status(403).json({ message: "Not authorized" });
    await Education.destroy({ where: { id: req.params.eduId, UserId: req.params.userId } });
    res.json({ success: true, message: "Education deleted" })
};

exports.deleteExperience = async (req, res) => {
    if (req.user.id != req.params.userId) return res.status(403).json({ message: "Not authorized" });
    await Experience.destroy({ where: { id: req.params.expId, UserId: req.params.userId } });
    res.json({ success: true, message: "Experience deleted" });
}
const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const Blog = require("../models/blog-model")

const getAllUsers = async (req,res) =>{
    try {
        const users = await User.find({},{password:0});
        console.log(users);
        if(!users || users.length ===0){
            return res.status(404).json({message: "No Users Found"});
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) =>{
    try {
        const id = req.params.id;
        const data = await User.findOne({_id: id}, {password: 0});
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const updateUserById = async(req, res) =>{
    try {
        const id = req.params.id;
        const updatedUserData = req.body;
        const updatedData = await User.updateOne({_id: id},{
            $set: updatedUserData,
        });
        return res.status(200).json(updatedData);
    } catch (error) {
        next(error);
    }
};

const deleteUserById = async (req, res, next) =>{
    try {
        const id = req.params.id;
        await User.deleteOne({_id: id});
        return res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        next(error);
    }
};

const getAllContacts = async (req, res) =>{
    try {
        const contacts = await Contact.find();
        if(!contacts || contacts.length ===0){
            return res.status(404).json({message: "No Contacts Found"});
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};

const deleteContactById = async (req, res, next) =>{
    try {
        const id = req.params.id;
        await Contact.deleteOne({_id: id});
        return res.status(200).json({message: "Contact deleted successfully"});
    } catch (error) {
        next(error);
    }
};

const getAllBlogs = async (req,res) =>{
    try {
        const blogs = await Blog.find({});
        console.log(blogs);
        if(!blogs || blogs.length ===0){
            return res.status(404).json({message: "No Blogs Found"});
        }
        return res.status(200).json(blogs);
    } catch (error) {
        next(error);
    }
};

const getBlogById = async (req, res, next) =>{
    try {
        const id = req.params.id;
        const data = await Blog.findOne({_id: id});
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const createBlog = async (req, res, next) => {
    try {
        const { title, username, email, summary, content, cover } = req.body;
        const blogExist = await Blog.findOne({ title, username });
        if (blogExist) {
            return res.status(400).json({ message: "Blog with the same title and author already exists" });
        }
        // Create the new blog
        const blogCreated = await Blog.create({ title, username, email, summary, content, cover });

        res.status(201).json({ message: "Blog created successfully", blogId: blogCreated._id.toString() });
    } catch (error) {
        next(error);
    }
};

const updateBlogById = async(req, res) =>{
    try {
        const id = req.params.id;
        const updatedBlogData = req.body;
        const updatedData = await Blog.updateOne({_id: id},{
            $set: updatedBlogData,
        });
        return res.status(200).json(updatedData);
    } catch (error) {
        next(error);
    }
};

const deleteBlogById = async (req, res, next) =>{
    try {
        const id = req.params.id;
        await Blog.deleteOne({_id: id});
        return res.status(200).json({message: "Blog deleted successfully"});
    } catch (error) {
        next(error);
    }
};

module.exports = {getAllUsers, getAllContacts, deleteUserById, getUserById, updateUserById, deleteContactById, getAllBlogs, createBlog, getBlogById, updateBlogById, deleteBlogById};
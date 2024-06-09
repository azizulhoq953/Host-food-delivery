import {model, models, Schema } from "mongoose";
import { type } from "os";

const CategorySchema = new Schema({
    name: {type: String, required:true},

},{timestamps: true});

export const Category = model?.Category || model('Category', CategorySchema);
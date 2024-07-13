import { HelperText, Label } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { MdCancel } from "react-icons/md";
import {Link, useNavigate} from 'react-router-dom';

export default function DashRecipes() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        ingredients: '',
        instructions: '',
        cooking_time: 0,
        preparation_time: 0,
        servings: 3,
        category: '',
        cuisine: '',
        level: '',
        tags: [],
        total_time: 0,
        image: null,
    });
    const [cuisine, setCuisine] = useState([]);
    const [imageUrl, setImageUrl] = useState(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => {
            const updatedFormData = {
                ...prevFormData,
                [id]: value,
            };
            if (id === 'cooking_time' || id === 'preparation_time') {
                updatedFormData.total_time = parseInt(updatedFormData.cooking_time) + parseInt(updatedFormData.preparation_time);
            }
            return updatedFormData;
        });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFormData((prevFormData) => ({
            ...prevFormData,
            image: selectedFile,
        }));

        // Preview image before upload
        if (selectedFile) {
            const imageUrl = URL.createObjectURL(selectedFile);
            setImageUrl(imageUrl);
        } else {
            setImageUrl(null);
        }
    };

    const handleTagInput = (e) => {
        const newTags = e.target.value.split(',').map((tag) => tag.trim());
        setFormData((prevFormData) => ({
            ...prevFormData,
            tags: newTags,
        }));
    };

    const handleTagDelete = (tagToRemove) => {
        const updatedTags = formData.tags.filter((tag) => tag !== tagToRemove);
        setFormData((prevFormData) => ({
            ...prevFormData,
            tags: updatedTags,
        }));
    };

    const fetchCuisine = async () => {
        const res = await fetch('/api/cuisine/get');
        const data = await res.json();
        setCuisine(data);
    };

    useEffect(() => {
        fetchCuisine();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData || Object.values(formData).some(value => !value && value !== 0)) {
            toast.error('All fields are required', { autoClose: 1500 });
            return;
        }

        const formPayload = new FormData();

        for (const key in formData) {
            formPayload.append(key, formData[key]);
        }

        try {
            const res = await fetch('/api/recipe/create', {
                method: "POST",
                body: formPayload,
            });

            if (!res.ok) {
                setLoading(false);
                toast.error("Unable to create recipe", { autoClose: 1000 });
                return;
            }

            if(res.ok){
                toast.success("Recipe created", { autoClose: 1000 });
                navigate('/dashboard?tab=recipes');
            }

        } catch (error) {
            setLoading(false);
            toast.error("Unable to create", { autoClose: 1000 });
        }
    };

    return (
        <div className='flex flex-col max-w-6xl p-7'>
            <div>
                <h1 className='navText text-3xl mb-5'><span className='text-orange-500'>Recipe</span> Creation</h1>

                <form className='w-full flex flex-col md:inline' onSubmit={handleSubmit}>
                    <div className='flex gap-4 flex-col md:flex-row'>
                        <div className='flex-0'>
                            <Label>Recipe name</Label>
                            <input
                                type="text"
                                id="name"
                                className='w-full bg-slate-50 border-gray-400 rounded-lg'
                                placeholder='Recipe name'
                                autoComplete='off'
                                onChange={handleChange}
                                value={formData.name || ''}
                            />
                        </div>
                        <div className='flex-1'>
                            <Label>Cooking</Label>
                            <input
                                type="number"
                                id="cooking_time"
                                className='w-full bg-slate-50 border-gray-400 rounded-lg'
                                placeholder='Cooking time'
                                autoComplete='off'
                                onChange={handleChange}
                                value={formData.cooking_time || ''}
                            />
                        </div>
                        <div className='flex-1'>
                            <Label>Preparation</Label>
                            <input
                                type="number"
                                id="preparation_time"
                                className='w-full bg-slate-50 border-gray-400 rounded-lg'
                                placeholder='Preparation time'
                                autoComplete='off'
                                onChange={handleChange}
                                value={formData.preparation_time || ''}
                            />
                        </div>
                        <div className='flex-1'>
                            <Label>Total Time</Label>
                            <input
                                type="number"
                                disabled
                                id="total_time"
                                className='w-full bg-slate-50 border-gray-400 rounded-lg hover:cursor-not-allowed'
                                placeholder='Total time'
                                autoComplete='off'
                                value={formData.total_time || ''}
                            />
                        </div>
                        <div className='flex-1'>
                            <Label>Servings</Label>
                            <input
                                type="number"
                                id="servings"
                                className='w-full bg-slate-50 border-gray-400 rounded-lg'
                                placeholder='Servings'
                                autoComplete='off'
                                onChange={handleChange}
                                value={formData.servings || ''}
                            />
                        </div>
                    </div>
                    <div className='flex gap-4 flex-col md:flex-row mt-5'>
                        <div className='flex-1'>
                            <Label>Category</Label>
                            <select
                                type="text"
                                id="category"
                                className='w-full bg-slate-50 border-gray-400 rounded-lg'
                                placeholder='Recipe name'
                                autoComplete='off'
                                onChange={handleChange}
                                value={formData.category || ''}
                            >
                                <option value="">Select Category</option>
                                <option value="breakfast">Breakfast</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                                <option value="snacks">Snacks</option>
                                <option value="dessert">Dessert</option>
                            </select>
                        </div>
                        <div className='flex-1'>
                            <Label>Cuisine</Label>
                            <select
                                type="text"
                                id="cuisine"
                                className='w-full bg-slate-50 border-gray-400 rounded-lg'
                                placeholder='Cuisine'
                                autoComplete='off'
                                onChange={handleChange}
                                value={formData.cuisine}
                            >
                                <option value="">Select Cuisine</option>
                                {cuisine && cuisine.map((item) => (
                                    <option key={item._id} value={item.name.toLowerCase()} >
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='flex-1'>
                            <Label>Level</Label>
                            <select
                                type="text"
                                id="level"
                                className='w-full bg-slate-50 border-gray-400 rounded-lg'
                                placeholder='Level'
                                autoComplete='off'
                                onChange={handleChange}
                                value={formData.level || ''}
                            >
                                <option value="">Select Level</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex gap-4 flex-col md:flex-row mt-5'>
                        <div className='flex-1'>
                            <Label>Recipe Description</Label>
                            <textarea
                                type="text"
                                id="description"
                                className='w-full bg-slate-50 border-gray-400 rounded-lg'
                                placeholder='Recipe Description'
                                autoComplete='off'
                                rows='3'
                                onChange={handleChange}
                                value={formData.description || ''}
                            />
                        </div>
                    </div>
                    <div className='flex gap-4 flex-col md:flex-row mt-5'>
                        <div className='flex-1'>
                            <Label>Ingredients</Label>
                            <ReactQuill
                                id="ingredients"
                                value={formData.ingredients || ''}
                                onChange={(value) => setFormData({ ...formData, ingredients: value })}
                                className='bg-slate-50 border-gray-400 rounded-lg h-72 mb-10'
                            />
                        </div>
                    </div>
                    <div className='flex gap-4 flex-col md:flex-row mt-5'>
                        <div className='flex-1'>
                            <Label>Instructions</Label>
                            <ReactQuill
                                id="instructions"
                                value={formData.instructions || ''}
                                onChange={(value) => setFormData({ ...formData, instructions: value })}
                                className='bg-slate-50 border-gray-400 rounded-lg h-72  mb-10'
                            />
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row mt-5 gap-4'>
                        <div className='flex-1'>
                            <Label>Tags</Label>
                            <textarea
                                type="text"
                                id="tags"
                                className='w-full bg-slate-50 border-gray-400 rounded-lg'
                                placeholder='Tags (separated by commas)'
                                autoComplete='off'
                                onChange={handleTagInput}
                                value={formData.tags.join(', ') || ''}
                            ></textarea>
                            <div className='mt-2'>
                                {formData.tags.map((tag) => (
                                    <span key={tag} className='inline-flex items-center px-2 py-1 mr-2 bg-gray-200 rounded-full'>
                                        {tag}
                                        <button
                                            type="button"
                                            className='ml-1 text-red-500'
                                            onClick={() => handleTagDelete(tag)}
                                        >
                                            <MdCancel />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className='flex-1'>
                            <Label>Recipe Image</Label>
                            <input
                                type="file"
                                id="image"
                                className='w-full bg-slate-50 border-gray-400 rounded-lg'
                                placeholder='Recipe Image'
                                onChange={handleFileChange}
                            />
                            {imageUrl && (
                                <div className='mt-2'>
                                    <img src={imageUrl} alt="Recipe preview" className='w-24 h-24 object-cover rounded' />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='flex gap-3 justify-end mt-5'>
                        <Link
                            to='/dashboard?tab=recipes'
                            className='btn btn-primary bg-red-600 hover:opacity-85 text-white px-6 py-2 rounded-lg font-medium'
                        >
                            Back
                        </Link>
                        <button
                            type="submit"
                            className='btn btn-primary bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium'
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create Recipe'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

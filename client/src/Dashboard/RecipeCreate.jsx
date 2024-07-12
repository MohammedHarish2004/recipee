import { Label } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function DashRecipes() {
const [formData, setFormData] = useState({
    name: '',
    description: '',
    ingredients: '',
    instructions: '',
    cooking_time: 0,
    preparation_time: 0,
    servings: 3,
    total_time: 0,
    category: '',
    cuisine: ``,
    level: 'easy',
    tags: '',
});
console.log(formData);
const [cuisine, setCuisine] = useState([]);
const [imageUrl, setImageUrl] = useState([]);

const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: value,
    }));
};

const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFormData({
      ...formData,
      image: selectedFile
    });

    // Preview image before upload
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setImageUrl(imageUrl);
    } else {
      setImageUrl(null);
    }
  };

const fetchCuisine = async () => {
    const res = await fetch('/api/cuisine/get');
    const data = await res.json();
    setCuisine(data);
};

useEffect(() => {
    fetchCuisine();
}, []);

return (
    <div className='flex flex-col max-w-6xl p-7'>
        <div>
            <h1 className='navText text-3xl mb-5'><span className='text-orange-500'>Recipe</span> Creation</h1>

            <form className='w-full flex flex-col md:inline'>
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
                        <Label>Cooking time</Label>
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
                        <Label>Preparation time</Label>
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
                            value={parseInt(formData.cooking_time) + parseInt(formData.preparation_time) || ''}
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
                        <Label>Difficulty level</Label>
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
                    <div className='flex-1'>
                        <Label>Recipe Tags</Label>
                        <textarea
                            type="text"
                            id="tags"
                            className='w-full bg-slate-50 border-gray-400 rounded-lg'
                            placeholder='Recipe Tags'
                            autoComplete='off'
                            rows='3'
                            onChange={handleChange}
                            value={formData.tags || ''}
                        />
                    </div>
                    <div className='flex-1'>
                        <Label>Recipe image</Label>
                        <input
                            type="file"
                            id="image"
                            className='w-full bg-slate-50 border-gray-400 rounded-lg'
                            onChange={handleFileChange}
                        />
                        <div>
                            {formData.image && (
                                <img
                                    src={imageUrl}
                                    alt="Preview"
                                    style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px' }}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className='flex gap-4 flex-col md:flex-row mt-3'>
                    <div className='flex-1'>
                        <Label>Ingredients</Label>
                        <ReactQuill
                            theme='snow'
                            className='h-72 mb-16'
                            id='ingredients'
                            onChange={(value) => setFormData({ ...formData, ingredients: value || '' })}
                        />
                    </div>
                </div>
                <div className='flex gap-4 flex-col md:flex-row mt-3'>
                    <div className='flex-1'>
                        <Label>Instructions</Label>
                        <ReactQuill
                            theme='snow'
                            className='h-72 mb-16'
                            id='instructions'
                            onChange={(value) => setFormData({ ...formData, instructions: value || '' })}
                        />
                    </div>
                </div>
                <div className='w-full float-end mt-7 md:mt-14'>
                    <button type="submit" className='w-full bg-orange-500 rounded-lg p-2 px-10 text-white font-semibold hover:opacity-85 uppercase focus:shadow-lg block'>
                        Create Recipe
                    </button>
                </div>
            </form>
        </div>
    </div>
);
}

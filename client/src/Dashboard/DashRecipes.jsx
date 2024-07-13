import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

export default function DashRecipes() {

  const [recipe,setRecipe] = useState([])

  const fetchRecipes = async ()=>{
    const res = await fetch('/api/recipe/get')
    const data = await res.json()
    setRecipe(data)
  }

  useEffect(()=>{
    fetchRecipes()
  },[])

  return (
    <div className='w-full flex flex-col max-w-5xl p-7'>
    <div>
        <h1 className='navText text-3xl mb-5'><span className='text-orange-500'>Recipes</span> Creation</h1>
        <div className='float-end mt-7 md:mt-7'>
            <Link to='/dashboard?tab=create-recipes' className='w-full bg-orange-500 rounded-lg p-2 px-10 text-white font-semibold hover:opacity-85 uppercase focus:shadow-lg block'>
                Create Recipes
            </Link>
        </div>
    </div>

      <h1 className='navText text-3xl mb-5 mt-14 md:mt-0'><span className='text-orange-500'>Recipes</span> Lists</h1>
    <div className='overflow-auto '>
      <table className='w-full text-center '>
        <thead>
          <tr>
            <td>S No.</td>
            <td>Name</td>
            <td>Image</td>
            <td>Cuisine</td>
            <td>Category</td>
            <td>Level</td>
            <td colSpan='2'>Actions</td>
          </tr>
        </thead>
        <tbody>
          {
           recipe && recipe.length > 0 ? recipe.map((item,index)=>(
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td align='center'>
                  <img  src={`http://localhost:3000/${item.image}`}
                        alt={item.name}
                        style={{ width: '100px', height: 'auto'}}
                        className=''/>
                </td> 
                <td className='capitalize'>{item.cuisine}</td> 
                <td className='capitalize'>{item.category}</td> 
                <td className='capitalize'>{item.level}</td> 
                <td className='text-cyan-600 font-semibold cursor-pointer hover:underline'><span >Edit</span></td>
                <td className='text-red-600 font-semibold cursor-pointer hover:underline'><span >Delete</span></td>
              </tr>
            ))
            :
            <td colSpan='7' align='center'>Error on fetching recipes</td>
          }
             
        </tbody>
      </table>
    </div>
  </div>
  )
}

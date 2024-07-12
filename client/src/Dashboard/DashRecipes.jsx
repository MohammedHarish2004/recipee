import { Label, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

export default function DashRecipes() {
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
            <td>Created at</td>
            <td colSpan='2'>Actions</td>
          </tr>
        </thead>
        <tbody>
              <tr>
                <td>1.</td>
                <td>Biriyani</td>
                <td>
                  <img/>
                </td> 
                <td></td> 
                <td className='text-cyan-600 font-semibold cursor-pointer hover:underline'><span >Edit</span></td>
                <td className='text-red-600 font-semibold cursor-pointer hover:underline'><span >Delete</span></td>
              </tr>
        </tbody>
      </table>
    </div>
  </div>
  )
}

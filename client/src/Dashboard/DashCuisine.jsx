import { Label, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

  export default function DashCuisine() {
    const [formData, setFormData] = useState({
      image: null,
      name: '',
      id:''
    });
    const [loading, setLoading] = useState(false);
    const [cuisine, setCuisine] = useState([]);
    const [previewImageUrl, setPreviewImageUrl] = useState(null); 

    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      setFormData({
        ...formData,
        image: selectedFile
      });

      // Preview image before upload
      if (selectedFile) {
        const imageUrl = URL.createObjectURL(selectedFile);
        setPreviewImageUrl(imageUrl);
      } else {
        setPreviewImageUrl(null);
      }
    };

    const handleNameChange = (e) => {
      setFormData({
        ...formData,
        name: e.target.value
      });
    };

    // Edit form

    const handleEdit = (cuisineId, cuisineName, cuisineImg) => {
      setFormData({
        id: cuisineId,
        name: cuisineName,
        image: cuisineImg ? cuisineImg : null 
      });
    
      if (cuisineImg) {
        const imageUrl = `http://localhost:3000/${cuisineImg}`;
        setPreviewImageUrl(imageUrl);
      } else {
        setPreviewImageUrl(null);
      }
    };
    
    // Submitting form

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (!formData.image) {
        toast.error("Must upload an image", { autoClose: 2000 });
        return;
      }
    
      const formPayload = new FormData();
      formPayload.append('image', formData.image);
      formPayload.append('name', formData.name);
    
      try {
        setLoading(true);
        const res = await fetch(formData.id ? `/api/cuisine/edit/${formData.id}` : '/api/cuisine/create', {
          method: "POST",
          body: formPayload
        });
    
        if (!res.ok) {
          setLoading(false);
          toast.error("File is too large or Invalid format", { autoClose: 1000 });
          return;
        }
    
        toast.success(formData.id ? "Cuisine Updated" : "Cuisine Created", { autoClose: 1000 });
        setFormData({
          ...formData,
          image: null,
          name: ''
        });
        setLoading(false);
        fetchCuisine();
        setPreviewImageUrl(null);
      } catch (err) {
        setLoading(false);
        toast.error("Unable to upload", { autoClose: 1000 });
      }
    };
    
// Get cuisines
    const fetchCuisine = async () => {
      try {
        const res = await fetch('/api/cuisine/get');
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await res.json();
        setCuisine(data);
      } catch (error) {
        console.error('Error fetching cuisine:', error);
        toast.error("Failed to fetch cuisine data", { autoClose: 1000 });
      }
    };

    useEffect(() => {
      fetchCuisine();
    }, []);

// Delete cuisine

const handleDelete = (id,name)=>{
  Swal.fire({
    title: 'Are you sure?',
    text: `Want to delete ${name}!`,
    icon: 'error',
    color:'#fff',
    background:"rgb(58, 58, 58)",
    showCancelButton: true,
    cancelButtonColor: '#9ca3af',
    confirmButtonColor:'#ff5a1f ',
    confirmButtonText: 'Yes, delete !',
  }).then(async(result)=>{

    if(result.isConfirmed){
      const res = await fetch(`/api/cuisine/delete/${id}`,{
        method:"DELETE"
      })
      const data = await res.json()

      if(data.success == false){
        return
      }

      setCuisine(prev=>prev.filter((cuisine)=> cuisine._id !== id));
      toast.success('Cuisine deleted successfully',{autoClose:1500});
    }
  })
}
    return (
      <div className='w-full flex flex-col max-w-5xl p-7'>
        <div>
        <h1 className='navText text-3xl mb-5'><span className='text-orange-500'>Cuisine</span> Creation</h1>

          <form className='w-full flex flex-col md:inline' onSubmit={handleSubmit}>
            <div className='flex gap-4 flex-col md:flex-row'>
              <div>
                <Label>Cuisine name</Label>
                <input
                  type="text"
                  id="name"
                  className='w-full bg-slate-100 border-gray-400 rounded-lg'
                  placeholder='Cuisine name'
                  autoComplete='off'
                  value={formData.name}
                  onChange={handleNameChange}
                />
              </div>
              <div>
                <Label>Cuisine image</Label>
                <input
                  type="file"
                  id="image"
                  className='w-full bg-slate-100 border-gray-400 rounded-lg'
                  onChange={handleFileChange}
                />
                <div>
                {previewImageUrl && (
                  <img
                    src={previewImageUrl}
                    alt="Preview"
                    style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px' }}
                  />
                )}
                </div>
              </div>
            </div>
            <div className='float-end mt-7 md:mt-7'>
              <button type="submit" className='w-full bg-orange-500 rounded-lg p-2 px-10 text-white font-semibold hover:opacity-85 uppercase focus:shadow-lg block'>
                {loading ? (
                  <div className='flex gap-2 justify-center items-center'>
                    <Spinner color='gray' /> Loading...
                  </div>
                ) : (
                  <span>{formData.id ? "Update" : "Create"}</span>
                )}
              </button>
            </div>
          </form>
        </div>

          <h1 className='navText text-3xl mb-5 mt-14 md:mt-0'><span className='text-orange-500'>Cuisine</span> Lists</h1>
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
              {cuisine.map((item,index)=>(
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td align='center'>
                      <img
                        src={`http://localhost:3000/${item.image}`}
                        alt={item.name}
                        style={{ width: '100px', height: 'auto'}}
                        className=''
                      />
                    </td>  
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td className='text-cyan-600 font-semibold cursor-pointer hover:underline'><span onClick={()=>handleEdit(item._id,item.name,item.image)}>Edit</span></td>
                    <td className='text-red-600 font-semibold cursor-pointer hover:underline'><span onClick={()=>handleDelete(item._id,item.name)}>Delete</span></td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

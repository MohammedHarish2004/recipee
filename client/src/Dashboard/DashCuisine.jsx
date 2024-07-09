import { Label, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DashCuisine() {
  const [formData, setFormData] = useState({
    image: null,
    name: ''
  });
  const [loading, setLoading] = useState(false);
  const [cuisine, setCuisine] = useState([]);
  const [previewImageUrl, setPreviewImageUrl] = useState(null); // State to hold the preview image URL

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Must upload one image", { autoClose: 2000 });
      return;
    }

    const formPayload = new FormData();
    formPayload.append('image', formData.image);
    formPayload.append('name', formData.name);

    try {
      setLoading(true);
      const res = await fetch('/api/cuisine/create', {
        method: "POST",
        body: formPayload
      });

      if (!res.ok) {
        setLoading(false);
        toast.error("Unable to Create Cuisine", { autoClose: 1000 });
        return;
      }

      toast.success("Cuisine Created", { autoClose: 1000 });
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
                <span>Create</span>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className='overflow-auto'>
        <h1 className='navText text-3xl mb-5'><span className='text-orange-500'>Cuisine</span> List</h1>
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
                  <td   >
                    <img
                      src={`http://localhost:3000/${item.image}`}
                      alt={item.name}
                      style={{ width: '100px', height: 'auto' }}
                    />
                  </td>  
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className='text-cyan-600 font-semibold cursor-pointer hover:underline'>Edit</td>
                  <td className='text-red-600 font-semibold cursor-pointer hover:underline'>Delete</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

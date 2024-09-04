import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createListingAction } from '../store/actions';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import * as Actions from '../store/actions';

const UpdateListing = () => {
    const currentUser = useSelector((state) => state.user.userData);
    const singleList = useSelector((state) => state.user.singleList);

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { id } = useParams()
    const [files, setFiles] = useState([]);

    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
    });

    const [filePerc, setFilePerc] = useState(0);
    const [imageUploadError, setImageUploadError] = useState('');
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleImageSubmit = async () => {
        if (files.length > 0 && files.length + formData.imageUrls.length <= 6) {
            setUploading(true);
            setImageUploadError('');
            const promises = Array.from(files).map((file) => storeImage(file));

            try {
                const urls = await Promise.all(promises);
                setFormData((prev) => ({ ...prev, imageUrls: [...prev.imageUrls, ...urls] }));
            } catch (error) {
                setImageUploadError('Image size must be 2 MB or less');
            } finally {
                setUploading(false);
            }
        } else {
            setImageUploadError('You can only upload a maximum of 6 images per listing');
        }
    };

    const storeImage = async (file) => {
        const storage = getStorage(app);
        const fileName = `${new Date().getTime()}-${file.name}`;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setFilePerc(Math.round(progress));
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => resolve(downloadURL));
                }
            );
        });
    };

    const handleRemoveImage = (index) => {
        if (index >= 0 && index < formData.imageUrls.length) {
            setFormData({
                ...formData,
                imageUrls: formData.imageUrls.filter((_, i) => i !== index),
            });
        }
    };

    const handleChange = (e) => {
        const { id, value, checked, type } = e.target;

        if (id === 'discountPrice' && formData.regularPrice !== '' && Number(value) >= Number(formData.regularPrice)) {
            alert('Discount price must be less than the regular price.');
            return;
        }

        if (id === 'sale' || id === 'rent') {
            setFormData({ ...formData, type: id });
        } else if (type === 'checkbox') {
            setFormData({ ...formData, [id]: checked });
        } else {
            setFormData({ ...formData, [id]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (formData.imageUrls.length < 1) {
                return setError('you must upload at least one image');
            }
            const response = await dispatch(Actions.updateListingAction(formData, id, currentUser._id));

            navigate("/profile")
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {

        const getSingleListing = async () => {

            try {

                const response = await dispatch(Actions.singleListingAction(id));



            } catch (error) {

            }

        }


        getSingleListing()
    }, [])


    useEffect(() => {
        setFormData(singleList)
    }, [])
    return (
        <>
            <main className='p-3 max-w-4xl mx-auto'>
                <h1 className='text-3xl font-semibold text-center my-7'>Update a Listing</h1>
                <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
                    <div className='flex flex-col gap-4 flex-1'>
                        <input
                            type='text'
                            placeholder='Name'
                            className='border p-3 rounded-lg'
                            id='name'
                            maxLength='62'
                            minLength='10'
                            required
                            onChange={handleChange}
                            value={formData.name}
                        />
                        <textarea
                            type='text'
                            placeholder='Description'
                            className='border p-3 rounded-lg'
                            id='description'
                            required
                            onChange={handleChange}
                            value={formData.description}
                        />
                        <input
                            type='text'
                            placeholder='Address'
                            className='border p-3 rounded-lg'
                            id='address'
                            required
                            onChange={handleChange}
                            value={formData.address}
                        />
                        <div className='flex gap-6 flex-wrap'>
                            <div className='flex gap-2'>
                                <input
                                    type='checkbox'
                                    id='sale'
                                    className='w-5'
                                    onChange={handleChange}
                                    checked={formData.type === 'sale'}
                                />
                                <span>Sell</span>
                            </div>
                            <div className='flex gap-2'>
                                <input
                                    type='checkbox'
                                    id='rent'
                                    className='w-5'
                                    onChange={handleChange}
                                    checked={formData.type === 'rent'}
                                />
                                <span>Rent</span>
                            </div>
                            <div className='flex gap-2'>
                                <input
                                    type='checkbox'
                                    id='parking'
                                    className='w-5'
                                    onChange={handleChange}
                                    checked={formData.parking}
                                />
                                <span>Parking spot</span>
                            </div>
                            <div className='flex gap-2'>
                                <input
                                    type='checkbox'
                                    id='furnished'
                                    className='w-5'
                                    onChange={handleChange}
                                    checked={formData.furnished}
                                />
                                <span>Furnished</span>
                            </div>
                            <div className='flex gap-2'>
                                <input
                                    type='checkbox'
                                    id='offer'
                                    className='w-5'
                                    onChange={handleChange}
                                    checked={formData.offer}
                                />
                                <span>Offer</span>
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-6'>
                            <div className='flex items-center gap-2'>
                                <input
                                    type='number'
                                    id='bedrooms'
                                    min='1'
                                    max='10'
                                    required
                                    className='p-3 border border-gray-300 rounded-lg'
                                    onChange={handleChange}
                                    value={formData.bedrooms}
                                />
                                <p>Beds</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input
                                    type='number'
                                    id='bathrooms'
                                    min='1'
                                    max='10'
                                    required
                                    className='p-3 border border-gray-300 rounded-lg'
                                    onChange={handleChange}
                                    value={formData.bathrooms}
                                />
                                <p>Baths</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input
                                    type='number'
                                    id='regularPrice'
                                    min='50'
                                    max='10000000'
                                    required
                                    className='p-3 border border-gray-300 rounded-lg'
                                    onChange={handleChange}
                                    value={formData.regularPrice}
                                />
                                <div className='flex flex-col items-center'>
                                    <p>Regular price</p>
                                    {formData.type === 'rent' && (
                                        <span className='text-xs'>($ / month)</span>
                                    )}
                                </div>
                            </div>
                            {formData.offer && (
                                <div className='flex items-center gap-2'>
                                    <input
                                        type='number'
                                        id='discountPrice'
                                        min='0'
                                        max='10000000'
                                        required
                                        className='p-3 border border-gray-300 rounded-lg'
                                        onChange={handleChange}
                                        value={formData.discountPrice}
                                    />
                                    <div className='flex flex-col items-center'>
                                        <p>Discounted price</p>

                                        {formData.type === 'rent' && (
                                            <span className='text-xs'>($ / month)</span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='flex flex-col flex-1 gap-4'>
                        <p className='font-semibold'>
                            Images:
                            <span className='font-normal text-gray-600 ml-2'>
                                The first image will be the cover (max 6)
                            </span>
                        </p>
                        <div className='flex gap-4'>
                            <input
                                onChange={(e) => setFiles(e.target.files)}
                                className='p-3 border border-gray-300 rounded w-full'
                                type='file'
                                id='images'
                                accept='image/*'
                                multiple
                            />
                            <button
                                type='button'
                                disabled={uploading}
                                onClick={handleImageSubmit}
                                className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
                            >
                                {uploading ? 'Uploading...' : 'Upload'}
                            </button>
                        </div>
                        <p className='text-red-700 text-sm'>
                            {imageUploadError && imageUploadError}
                        </p>
                        {formData.imageUrls.length > 0 &&
                            formData.imageUrls.map((url, index) => (
                                <div
                                    key={url}
                                    className='flex justify-between p-3 border items-center'
                                >
                                    <img
                                        src={url}
                                        alt='listing image'
                                        className='w-20 h-20 object-contain rounded-lg'
                                    />
                                    <button
                                        type='button'
                                        onClick={() => handleRemoveImage(index)}
                                        className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        <button
                            type='submit'
                            disabled={loading || uploading}
                            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                        >
                            {loading ? 'Updating...' : 'Update listing'}
                        </button>
                        {error && <p className='text-red-700 text-sm'>{error}</p>}
                    </div>
                </form>
            </main>
        </>
    );
};

export default UpdateListing;



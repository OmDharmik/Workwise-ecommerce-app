'use client';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SignUp = () => {
  const router = useRouter();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/user/signup`, form);
      if (response.data.status === true) {
        localStorage.setItem('token', response.data.token);
        if (form.role === 'seller') {
          router.push('/seller/home');
        } else {
          router.push('/buyer/home');
        }
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      alert('Sign up failed. Please try again.');
    }
  };

  const handleCheckboxChange = (type) => {
    if (selected === type) {
      setSelected(null);
      setForm({ ...form, role: '' });
    } else {
      setSelected(type);
      setForm({ ...form, role: type });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="grid grid-cols-2">
        <div className="flex flex-col justify-center min-h-screen items-center bg-gray-50">
          <div className="flex flex-col justify-center items-center w-full">
            <h1 className="heading text-center">Sign Up</h1>
            <form onSubmit={onSubmit} className="flex w-full justify-center">
              <div className="mt-10 flex flex-col gap-7 w-8/12">
                <div className="mb-4 mt-5">
                  <input
                    type="text"
                    name="name"
                    value={form.username}
                    onChange={handleChange}
                    className="input"
                    placeholder="Name"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="input"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="input"
                    placeholder="Password"
                  />
                </div>
                <div className="flex justify-center">
                  <div className="flex justify-start">
                    <input
                      type="checkbox"
                      className="default:ring-2 mr-3"
                      checked={selected === 'buyer'}
                      onChange={() => handleCheckboxChange('buyer')}
                    />
                    <p>Customer</p>
                  </div>
                  <div className="flex justify-start ml-10">
                    <input
                      type="checkbox"
                      className="default:ring-2 mr-3"
                      checked={selected === 'seller'}
                      onChange={() => handleCheckboxChange('seller')}
                    />
                    <p>Seller</p>
                  </div>
                </div>

                <button type="submit" className="button hover:bg-blue-600">
                  Sign Up
                </button>
                <Link
                  href={'/signin'}
                  className="text-right mr-5 hover:underline font-bold hover:text-blue-600"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className="">
          <div className="relative h-full w-full">
            <Image
              src="/login-image.jpg"
              alt="signin"
              layout="fill"
              className="object-contain"
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

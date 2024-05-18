import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckBox';
import { Link } from 'react-router-dom';
import useSignUp from '../../Hooks/useSignUp.js';

const SignUp = () => {

	const [inputs, setInputs] = useState({
		fullName: "",
		userName: "",
		password: "",
		confirmPassword: "",
		gender: ""
	})

	 const {loading, signUp} = useSignUp()

	const submitHandler = async (e) => {
		e.preventDefault();
		await signUp(inputs);
	}

	const handleCheckBoxChange = (gender) => {
		setInputs({ ...inputs, gender })
	}

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-500'>
					Sign Up <span className='text-black'> ChatApp</span>
				</h1>

				<form onSubmit={submitHandler}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text text-black'>Full Name</span>
						</label>
						<input type='text' placeholder='Enter full name' className='w-full input input-bordered  h-10' value={inputs.fullName} onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })} />
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base label-text text-black'>Username</span>
						</label>
						<input type='text' placeholder='Enter your username' className='w-full input input-bordered h-10' value={inputs.userName} onChange={(e) => setInputs({ ...inputs, userName: e.target.value })} />
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text text-black'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text text-black'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
						/>
					</div>

					<GenderCheckbox onCheckBoxChange = {handleCheckBoxChange} selectedGender = {inputs.gender} />

					<Link to="/login" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-black' href='#'>
						Already have an account?
					</Link>

					<div>
						<button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700'>
							{loading ? (<span className='loading loading-spinner'></span>): "Sign Up"}</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;

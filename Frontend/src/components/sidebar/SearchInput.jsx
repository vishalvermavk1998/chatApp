import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import {toast} from "react-hot-toast";
import useGetConversation from '../../Hooks/useGetConversation.js';
import { useDispatch } from 'react-redux';
import { setSelectedConversation } from '../../redux/conversationSlice.js';

const SearchInput = () => {

	const[search, setSearch] = useState("");
	const {conversations} = useGetConversation();
	const dispatcher = useDispatch();
	

	const submitHandler = (e) =>{
		e.preventDefault();

		if(!search) return;
		if(search.length < 3){
			toast.error("Search input alteast have 3 character")
			return;
		}

		const conversation = conversations.find((conversation)=> conversation.fullName.toLowerCase().includes(search.toLowerCase()));

		if(conversation){
			dispatcher(setSelectedConversation(conversation))
			setSearch("")
		}else{
			console.log(search)
			toast.error(`There is no any conversation of :${search} `)
		}
		

	}
	return (
		<form className='flex items-center gap-2' onSubmit={submitHandler}>
			<input type='text' placeholder='Search…'
			 className='input input-bordered rounded-full'
			 value={search}
			 onChange={(e)=> setSearch(e.target.value)}
			  />
			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;

import { useSelector, useDispatch } from 'react-redux';
import { setSelectedConversation } from '../../redux/conversationSlice';
import { useSocketContext } from '../../context/SocketContext';

const Conversation = ({ conversation, lastIndex }) => {

	const dispatch = useDispatch();

	const selectedConversation = useSelector(state => state.conversation.selectedConversation)
	
	const isSelected = selectedConversation?._id === conversation._id;
	const {onlineUsers} = useSocketContext();
	console.log("Online users : ", onlineUsers);
	const isUserOnline = onlineUsers.includes(conversation._id);


	return (
		<>
			<div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected? "bg-sky-500" : ""} `}
			onClick={()=> dispatch(setSelectedConversation(conversation))}
			>
				<div className={`avatar ${isUserOnline ? "online" : ""}`}>
					<div className='w-12 rounded-full'>
						<img
							src='https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png'
							alt='user avatar'
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-black'>{conversation.fullName}</p>
					</div>
				</div>
			</div>

			{!lastIndex && <div className='divider my-0 py-0 h-1 ' />}
		</>
	);
};
export default Conversation;
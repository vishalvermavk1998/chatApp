import { useSelector } from "react-redux";
import { useAuthContext } from "../../context/AuthContext";
import extractTime from "../../utils/extractTime";


const Message = ({message}) => {

	const{ authUser } = useAuthContext();
	const fromMe = authUser._id === message.senderId;
	const chatClassName = fromMe ?"chat-end" : "chat-start";
	const messageColor = fromMe ?"bg-sky-500": "";


	return (
		<div className={`chat ${chatClassName} `}>
			<div className='chat-image  avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src='https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png' />
				</div>
			</div>
			<div className={`chat-bubble text-white  pb-2 ${messageColor}`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center text-black'>{extractTime(message.createdAt)}</div>
		</div>
	);
};
export default Message;
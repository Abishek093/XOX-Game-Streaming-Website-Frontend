// import React, { useState, useEffect, useCallback, useRef } from "react";
// import {
//   Avatar,
//   Typography,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   IconButton,
//   TextField,
// } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
// import AttachFileIcon from "@mui/icons-material/AttachFile";
// import GifIcon from "@mui/icons-material/Gif";
// import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
// import GamepadIcon from "@mui/icons-material/Gamepad";
// import { IChatConversation, IMessage, ISender } from "../../interfaces/userInterfaces/apiInterfaces";
// import axiosInstanceChat from "../../services/userServices/axiosInstanceChat";
// import { useAppSelector } from "../../store/hooks";
// import { selectUser } from "../../Slices/userSlice/userSlice";
// import io from "socket.io-client";

// const socket = io(import.meta.env.VITE_CHAT_SOCKET_URL);

// const ChatPage: React.FC = () => {
//   const ownUser = useAppSelector(selectUser);
//   const [selectedChat, setSelectedChat] = useState<IChatConversation | null>(null);
//   const [message, setMessage] = useState<string>("");
//   const [messages, setMessages] = useState<IMessage[]>([]);
//   const [conversations, setConversations] = useState<IChatConversation[]>([]);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const fetchMessages = useCallback(async (chatId: string) => {
//     try {
//       const response = await axiosInstanceChat.get(`/fetch-messages/${chatId}`);
//       setMessages(response.data);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchConversations = async () => {
//       try {
//         const response = await axiosInstanceChat.get(`fetch-conversations/${ownUser?.id}`);
//         setConversations(response.data);
//       } catch (error) {
//         console.error("Error fetching conversations:", error);
//       }
//     };
//     fetchConversations();
//   }, [ownUser?.id]);

//   useEffect(() => {
//     if (selectedChat) {
//       fetchMessages(selectedChat._id);
//       socket.emit('join', selectedChat._id);
//     }
//     return () => {
//       if (selectedChat) {
//         socket.emit('leave', selectedChat._id);
//       }
//     };
//   }, [selectedChat, fetchMessages]);

//   useEffect(() => {
//     const handleNewMessage = (msg: IMessage) => {
//       console.log("Received message:", msg);
//       console.log("Current user ID:", ownUser?.id);
//       setMessages((prevMessages) => {
//         // Check if the message already exists in the state
//         const messageExists = prevMessages.some((m) => m._id === msg._id);
//         if (!messageExists) {
//           console.log("Adding new message to state");
//           return [...prevMessages, msg];
//         }
//         console.log("Message already exists in state");
//         return prevMessages;
//       });
//     };

//     socket.on('message', handleNewMessage);

//     return () => {
//       socket.off('message', handleNewMessage);
//     };
//   }, [ownUser?.id]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSend = () => {
//     if (message.trim() && selectedChat && ownUser) {
//       const newMessage: IMessage = {
//         chatId: selectedChat._id,
//         sender: {
//           _id: ownUser.id,
//           displayName: ownUser.username,
//           profileImage: ownUser.profileImage
//         },
//         content: message,
//         createdAt: new Date(),
//       };

//       console.log("Sending message:", newMessage);

//       // Emit the message to the server
//       socket.emit("message", newMessage);

//       // Clear the input field
//       setMessage("");
//     }
//   };

//   const renderChatArea = () => {
//     if (!selectedChat) {
//       return (
//         <div className="flex-1 flex flex-col items-center justify-center bg-gray-900 text-white">
//           <div className="w-64 h-64 bg-gray-800 rounded-lg shadow-lg p-4 mb-8 relative overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-20"></div>
//             <div className="relative z-10 h-full flex flex-col items-center justify-center">
//               <GamepadIcon style={{ fontSize: 64, marginBottom: 16 }} />
//               <Typography variant="h5" className="text-center mb-4 font-pixel">
//                 Gamer Chat
//               </Typography>
//               <Typography variant="body2" className="text-center mb-4 font-pixel">
//                 Select chat to start Conversation!
//               </Typography>
//               <div className="flex space-x-2">
//                 <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
//                 <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-75"></div>
//                 <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-150"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     const otherUser = selectedChat.users.find(user => user._id !== ownUser?.id);

//     return (
//       <>
//         <div className="bg-gray-800 p-4 flex items-center text-white border-b border-gray-300">
//           <Avatar
//             src={otherUser?.profileImage}
//             style={{ backgroundColor: "#FB923C", color: "white" }}
//             className="mr-2"
//           >
//             {otherUser?.displayName?.[0] || '?'}
//           </Avatar>
//           <Typography variant="h6" className="font-bold">
//             {otherUser?.displayName || 'Unknown User'}
//           </Typography>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
//           {messages.map((msg, index) => {
//             const isOwnMessage = msg.sender._id === ownUser?.id;
//             console.log("Rendering message:", msg);
//             console.log("Is own message:", isOwnMessage);

//             return (
//               <div key={index} className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-2`}>
//                 {!isOwnMessage && (
//                   <Avatar
//                     src={msg.sender.profileImage}
//                     style={{ backgroundColor: "#FB923C", color: "white" }}
//                     className="mr-2"
//                   >
//                     {msg.sender.displayName?.[0] || '?'}
//                   </Avatar>
//                 )}
//                 <div className={`rounded-lg p-3 max-w-xs ${isOwnMessage ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}>
//                   <Typography>{msg.content}</Typography>
//                 </div>
//                 {isOwnMessage && (
//                   <Avatar
//                     src={ownUser?.profileImage}
//                     style={{ backgroundColor: "#FB923C", color: "white" }}
//                     className="ml-2"
//                   >
//                     {ownUser?.username?.[0] || '?'}
//                   </Avatar>
//                 )}
//               </div>
//             );
//           })}
//           <div ref={messagesEndRef} />
//         </div>

//         <div className="bg-white p-4 flex items-center border-t border-gray-300">
//           <IconButton className="text-gray-600 hover:text-gray-800">
//             <EmojiEmotionsIcon />
//           </IconButton>
//           <IconButton className="text-gray-600 hover:text-gray-800">
//             <GifIcon />
//           </IconButton>
//           <IconButton className="text-gray-600 hover:text-gray-800">
//             <AttachFileIcon />
//           </IconButton>
//           <TextField
//             fullWidth
//             variant="outlined"
//             placeholder="Type your message..."
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//             className="mx-2"
//             InputProps={{
//               style: {
//                 backgroundColor: "white",
//                 borderRadius: "20px",
//               },
//             }}
//           />
//           <IconButton
//             style={{ backgroundColor: "#FB923C", color: "white" }}
//             className="hover:bg-orange-500 rounded-full p-2"
//             onClick={handleSend}
//           >
//             <SendIcon />
//           </IconButton>
//         </div>
//       </>
//     );
//   };

//   return (
//     <div className="flex h-screen bg-gray-200">
//       <div className="w-1/4 bg-white shadow-md border-r border-gray-300">
//         <div className="p-4 bg-gray-800 flex items-center">
//           <SportsEsportsIcon className="text-white mr-2" />
//           <Typography variant="h6" className="text-white font-bold">
//             Gamer Chat
//           </Typography>
//         </div>
//         {conversations.map((conversation) => {
//           const otherUser = conversation.users.find((user: ISender) => user._id !== ownUser?.id);
//           return (
//             <ListItem
//               button
//               key={conversation._id}
//               className="hover:bg-gray-100"
//               onClick={() => setSelectedChat(conversation)}
//             >
//               <ListItemAvatar>
//                 <Avatar
//                   src={otherUser?.profileImage}
//                   style={{ backgroundColor: "#FB923C", color: "white" }}
//                 >
//                   {otherUser?.displayName?.[0] || '?'}
//                 </Avatar>
//               </ListItemAvatar>
//               <ListItemText
//                 primary={<Typography variant="body1" className="font-semibold">{otherUser?.displayName || 'Unknown User'}</Typography>}
//                 secondary={<Typography variant="body2" className="text-gray-600">Ready to play!</Typography>}
//               />
//             </ListItem>
//           );
//         })}
//       </div>

//       <div className="flex-1 flex flex-col bg-white">
//         {renderChatArea()}
//       </div>
//     </div>
//   );
// };

// export default ChatPage;




  // const handleSend = async () => {
  //   if ((message.trim() || attachment) && selectedChat && ownUser) {
  //     let mediaUrl = "";
  //     if (attachment) {
  //       const formData = new FormData();
  //       formData.append("file", attachment);
  //       try {
  //         const response = await axiosInstanceChat.post("/upload-media", formData);
  //         mediaUrl = response.data.url;
  //       } catch (error) {
  //         console.error("Error uploading file:", error);
  //         toast.error("Failed to upload file");
  //         return;
  //       }
  //     }

  //     const newMessage: IMessage = {
  //       chatId: selectedChat._id,
  //       sender: {
  //         _id: ownUser.id,
  //         displayName: ownUser.username,
  //         profileImage: ownUser.profileImage
  //       },
  //       content: message,
  //       media: mediaUrl ? [{ type: attachment?.type.split("/")[0] as IMedia["type"], url: mediaUrl }] : undefined,
  //       createdAt: new Date(),
  //     };

  //     socket.emit("message", newMessage);
  //     setMessage("");
  //     removeAttachment();
  //   }
  // };



// import React, { useState, useEffect, useCallback, useRef } from "react";
// import {
//   Avatar,
//   Typography,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   IconButton,
//   TextField,
//   Popover,
//   // Modal,
//   // Box,
// } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
// import AttachFileIcon from "@mui/icons-material/AttachFile";
// import GifIcon from "@mui/icons-material/Gif";
// import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
// import GamepadIcon from "@mui/icons-material/Gamepad";
// // import CloseIcon from "@mui/icons-material/Close";
// import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
// import { IChatConversation, IMessage, ISender, IMedia } from "../../interfaces/userInterfaces/apiInterfaces";
// import axiosInstanceChat from "../../services/userServices/axiosInstanceChat";
// import { useAppSelector } from "../../store/hooks";
// import { selectUser } from "../../Slices/userSlice/userSlice";
// import io from "socket.io-client";
// import { toast } from "sonner";
// import AttachmentPreview from "../../components/User/ChagPage/AttachmentPreview";



// const socket = io(import.meta.env.VITE_CHAT_SOCKET_URL);

// const ChatPage: React.FC = () => {
//   const ownUser = useAppSelector(selectUser);
//   const [selectedChat, setSelectedChat] = useState<IChatConversation | null>(null);
//   const [message, setMessage] = useState<string>("");
//   const [messages, setMessages] = useState<IMessage[]>([]);
//   const [conversations, setConversations] = useState<IChatConversation[]>([]);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
//   const [attachment, setAttachment] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);


//   const fetchMessages = useCallback(async (chatId: string) => {
//     try {
//       const response = await axiosInstanceChat.get(`/fetch-messages/${chatId}`);
//       setMessages(response.data);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchConversations = async () => {
//       try {
//         const response = await axiosInstanceChat.get(`fetch-conversations/${ownUser?.id}`);
//         setConversations(response.data);
//       } catch (error) {
//         console.error("Error fetching conversations:", error);
//       }
//     };
//     fetchConversations();
//   }, [ownUser?.id]);

//   useEffect(() => {
//     if (selectedChat) {
//       fetchMessages(selectedChat._id);
//       socket.emit('join', selectedChat._id);
//     }
//     return () => {
//       if (selectedChat) {
//         socket.emit('leave', selectedChat._id);
//       }
//     };
//   }, [selectedChat, fetchMessages]);

//   useEffect(() => {
//     const handleNewMessage = (msg: IMessage) => {
//       setMessages((prevMessages) => {
//         const messageExists = prevMessages.some((m) => m._id === msg._id);
//         if (!messageExists) {
//           return [...prevMessages, msg];
//         }
//         return prevMessages;
//       });
//     };

//     socket.on('message', handleNewMessage);

//     return () => {
//       socket.off('message', handleNewMessage);
//     };
//   }, [ownUser?.id]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleEmojiClick = (emojiData: EmojiClickData) => {
//     setMessage((prevMessage) => prevMessage + emojiData.emoji);
//   };

//   const handleEmojiButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseEmojiPicker = () => {
//     setAnchorEl(null);
//   };

//   const handleAttachmentClick = () => {
//     fileInputRef.current?.click();
//   };


//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       if (file.size > 10 * 1024 * 1024) {
//         toast.error("File size is larger than 10 MB");
//         return;
//       }
//       setAttachment(file);
//       const url = URL.createObjectURL(file);
//       setPreviewUrl(url);
//     }
//   };

//   const removeAttachment = () => {
//     setAttachment(null);
//     setPreviewUrl(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };


//   const uploadFile = async (file: File): Promise<string> => {
//     const formData = new FormData();
//     formData.append("file", file);
//     try {
//       const response = await axiosInstanceChat.post("/upload-media", formData);
//       return response.data.url;
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       toast.error("Failed to upload file");
//       throw error;
//     }
//   };

//   const handleSend = async () => {
//     if ((message.trim() || attachment) && selectedChat && ownUser) {
//       let mediaUrl = "";
//       if (attachment) {
//         try {
//           mediaUrl = await uploadFile(attachment);
//         } catch (error) {
//           return;
//         }
//       }

//       const newMessage: IMessage = {
//         chatId: selectedChat._id,
//         sender: {
//           _id: ownUser.id,
//           displayName: ownUser.username,
//           profileImage: ownUser.profileImage
//         },
//         content: message,
//         media: mediaUrl ? [{ type: attachment?.type.split("/")[0] as IMedia["type"], url: mediaUrl }] : undefined,
//         createdAt: new Date(),
//       };

//       socket.emit("message", newMessage);
//       setMessage("");
//       removeAttachment();
//     }
//   };

//   const renderChatArea = () => {
//     if (!selectedChat) {
//       return (
//         <div className="flex-1 flex flex-col items-center justify-center bg-gray-900 text-white">
//           <div className="w-64 h-64 bg-gray-800 rounded-lg shadow-lg p-4 mb-8 relative overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-20"></div>
//             <div className="relative z-10 h-full flex flex-col items-center justify-center">
//               <GamepadIcon style={{ fontSize: 64, marginBottom: 16 }} />
//               <Typography variant="h5" className="text-center mb-4 font-pixel">
//                 Gamer Chat
//               </Typography>
//               <Typography variant="body2" className="text-center mb-4 font-pixel">
//                 Select chat to start Conversation!
//               </Typography>
//               <div className="flex space-x-2">
//                 <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
//                 <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-75"></div>
//                 <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-150"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     const otherUser = selectedChat.users.find(user => user._id !== ownUser?.id);

//     return (
//       <>
//         <div className="bg-gray-800 p-4 flex items-center text-white border-b border-gray-300">
//           <Avatar
//             src={otherUser?.profileImage}
//             style={{ backgroundColor: "#FB923C", color: "white" }}
//             className="mr-2"
//           >
//             {otherUser?.displayName?.[0] || '?'}
//           </Avatar>
//           <Typography variant="h6" className="font-bold">
//             {otherUser?.displayName || 'Unknown User'}
//           </Typography>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
//           {messages.map((msg, index) => {
//             const isOwnMessage = msg.sender._id === ownUser?.id;
//             return (
//               <div key={index} className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-2`}>
//                 {!isOwnMessage && (
//                   <Avatar
//                     src={msg.sender.profileImage}
//                     style={{ backgroundColor: "#FB923C", color: "white" }}
//                     className="mr-2"
//                   >
//                     {msg.sender.displayName?.[0] || '?'}
//                   </Avatar>
//                 )}
//                 <div className={`rounded-lg p-3 max-w-xs ${isOwnMessage ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}>
//                   <Typography>{msg.content}</Typography>
//                 </div>
//                 {isOwnMessage && (
//                   <Avatar
//                     src={ownUser?.profileImage}
//                     style={{ backgroundColor: "#FB923C", color: "white" }}
//                     className="ml-2"
//                   >
//                     {ownUser?.username?.[0] || '?'}
//                   </Avatar>
//                 )}
//               </div>
//             );
//           }
//           )}
//           <div ref={messagesEndRef} />
//         </div>
//         <div className="bg-white p-4 flex flex-col border-t border-gray-300">
//           {attachment && (
//             <AttachmentPreview
//               previewUrl={previewUrl}
//               attachment={attachment}
//               removeAttachment={removeAttachment}
//             />
//           )}
//           <div className="flex w-full items-center">
//             <IconButton
//               className="text-gray-600 hover:text-gray-800"
//               onClick={handleEmojiButtonClick}
//             >
//               <EmojiEmotionsIcon />
//             </IconButton>
//             <Popover
//               open={Boolean(anchorEl)}
//               anchorEl={anchorEl}
//               onClose={handleCloseEmojiPicker}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               transformOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//             >
//               <EmojiPicker onEmojiClick={handleEmojiClick} />
//             </Popover>
//             <IconButton className="text-gray-600 hover:text-gray-800">
//               <GifIcon />
//             </IconButton>
//             <IconButton className="text-gray-600 hover:text-gray-800" onClick={handleAttachmentClick}>
//               <AttachFileIcon />
//             </IconButton>
//             <input
//               type="file"
//               ref={fileInputRef}
//               onChange={handleFileChange}
//               accept="image/*,video/*,audio/*,application/pdf,.gif"
//               style={{ display: 'none' }}
//             />
//             <TextField
//               fullWidth
//               variant="outlined"
//               placeholder="Type your message..."
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//               className="mx-2"
//               InputProps={{
//                 style: {
//                   backgroundColor: "white",
//                   borderRadius: "20px",
//                 },
//               }}
//             />
//             <IconButton
//               style={{ backgroundColor: "#FB923C", color: "white" }}
//               className="hover:bg-orange-500 rounded-full p-2"
//               onClick={handleSend}
//             >
//               <SendIcon />
//             </IconButton>
//           </div>
//         </div>
//       </>
//     );
//   };

//   {/* <div></div> */ }

//   return (
//     <div className="flex h-screen bg-gray-200">
//       <div className="w-1/4 bg-white shadow-md border-r border-gray-300">
//         <div className="p-4 bg-gray-800 flex items-center">
//           <SportsEsportsIcon className="text-white mr-2" />
//           <Typography variant="h6" className="text-white font-bold">
//             Gamer Chat
//           </Typography>
//         </div>
//         {conversations.map((conversation) => {
//           const otherUser = conversation.users.find((user: ISender) => user._id !== ownUser?.id);
//           return (
//             <ListItem
//               button
//               key={conversation._id}
//               className="hover:bg-gray-100"
//               onClick={() => setSelectedChat(conversation)}
//             >
//               <ListItemAvatar>
//                 <Avatar
//                   src={otherUser?.profileImage}
//                   style={{ backgroundColor: "#FB923C", color: "white" }}
//                 >
//                   {otherUser?.displayName?.[0] || '?'}
//                 </Avatar>
//               </ListItemAvatar>
//               <ListItemText
//                 primary={<Typography variant="body1" className="font-semibold">{otherUser?.displayName || 'Unknown User'}</Typography>}
//                 secondary={<Typography variant="body2" className="text-gray-600">Ready to play!</Typography>}
//               />
//             </ListItem>
//           );
//         })}
//       </div>

//       <div className="flex-1 flex flex-col bg-white">
//         {renderChatArea()}
//       </div>
//     </div>
//   );
// };

// export default ChatPage;





import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Avatar,
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  TextField,
  Popover,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import GifIcon from "@mui/icons-material/Gif";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import GamepadIcon from "@mui/icons-material/Gamepad";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { IChatConversation, IMessage, ISender, IMedia } from "../../interfaces/userInterfaces/apiInterfaces";
import axiosInstanceChat from "../../services/userServices/axiosInstanceChat";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../Slices/userSlice/userSlice";
import io from "socket.io-client";
import { toast } from "sonner";
import AttachmentPreview from "../../components/User/ChagPage/AttachmentPreview";

const socket = io(import.meta.env.VITE_CHAT_SOCKET_URL);

const ChatPage: React.FC = () => {
  const ownUser = useAppSelector(selectUser);
  const [selectedChat, setSelectedChat] = useState<IChatConversation | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [conversations, setConversations] = useState<IChatConversation[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMessages = useCallback(async (chatId: string) => {
    try {
      const response = await axiosInstanceChat.get(`/fetch-messages/${chatId}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, []);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axiosInstanceChat.get(`fetch-conversations/${ownUser?.id}`);
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };
    fetchConversations();
  }, [ownUser?.id]);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat._id);
      socket.emit('join', selectedChat._id);
    }
    return () => {
      if (selectedChat) {
        socket.emit('leave', selectedChat._id);
      }
    };
  }, [selectedChat, fetchMessages]);

  useEffect(() => {
    const handleNewMessage = (msg: IMessage) => {
      setMessages((prevMessages) => {
        const messageExists = prevMessages.some((m) => m._id === msg._id);
        if (!messageExists) {
          return [...prevMessages, msg];
        }
        return prevMessages;
      });
    };

    socket.on('message', handleNewMessage);

    return () => {
      socket.off('message', handleNewMessage);
    };
  }, [ownUser?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji);
  };

  const handleEmojiButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseEmojiPicker = () => {
    setAnchorEl(null);
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size is larger than 10 MB");
        return;
      }
      setAttachment(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeAttachment = () => {
    setAttachment(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axiosInstanceChat.post("/upload-media", formData);
      return response.data.url;
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file");
      throw error;
    }
  };

  const handleSend = async () => {
    if ((message.trim() || attachment) && selectedChat && ownUser) {
      let mediaUrl = "";
      if (attachment) {
        try {
          mediaUrl = await uploadFile(attachment);
        } catch (error) {
          return;
        }
      }

      const newMessage: IMessage = {
        chatId: selectedChat._id,
        sender: {
          _id: ownUser.id,
          displayName: ownUser.username,
          profileImage: ownUser.profileImage
        },
        content: message,
        media: mediaUrl ? [{ type: attachment?.type.split("/")[0] as IMedia["type"], url: mediaUrl }] : undefined,
        createdAt: new Date(),
      };

      socket.emit("message", newMessage);
      setMessage("");
      removeAttachment();
    }
  };

  const renderMessage = (msg: IMessage, isOwnMessage: boolean) => {
    return (
      <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-2`}>
        {!isOwnMessage && (
          <Avatar
            src={msg.sender.profileImage}
            style={{ backgroundColor: "#FB923C", color: "white" }}
            className="mr-2"
          >
            {msg.sender.displayName?.[0] || '?'}
          </Avatar>
        )}
        <div className={`rounded-lg p-3 max-w-xs ${isOwnMessage ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}>
          {msg.content && <Typography>{msg.content}</Typography>}
          {msg.media && msg.media.map((media, index) => (
            <div key={index} className="mt-2">
              {media.type === 'image' && (
                <img src={media.url} alt="Shared image" className="max-w-full h-auto rounded" />
              )}
              {media.type === 'video' && (
                <video src={media.url} controls className="max-w-full h-auto rounded" />
              )}
              {media.type === 'audio' && (
                <audio src={media.url} controls className="max-w-full" />
              )}
              {media.type === 'application' && (
                <a href={media.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  View Document
                </a>
              )}
            </div>
          ))}
        </div>
        {isOwnMessage && (
          <Avatar
            src={ownUser?.profileImage}
            style={{ backgroundColor: "#FB923C", color: "white" }}
            className="ml-2"
          >
            {ownUser?.username?.[0] || '?'}
          </Avatar>
        )}
      </div>
    );
  };

  const renderChatArea = () => {
    if (!selectedChat) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-900 text-white">
          <div className="w-64 h-64 bg-gray-800 rounded-lg shadow-lg p-4 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-20"></div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center">
              <GamepadIcon style={{ fontSize: 64, marginBottom: 16 }} />
              <Typography variant="h5" className="text-center mb-4 font-pixel">
                Gamer Chat
              </Typography>
              <Typography variant="body2" className="text-center mb-4 font-pixel">
                Select chat to start Conversation!
              </Typography>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-75"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-150"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const otherUser = selectedChat.users.find(user => user._id !== ownUser?.id);

    return (
      <>
        <div className="bg-gray-800 p-4 flex items-center text-white border-b border-gray-300">
          <Avatar
            src={otherUser?.profileImage}
            style={{ backgroundColor: "#FB923C", color: "white" }}
            className="mr-2"
          >
            {otherUser?.displayName?.[0] || '?'}
          </Avatar>
          <Typography variant="h6" className="font-bold">
            {otherUser?.displayName || 'Unknown User'}
          </Typography>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          {messages.map((msg, index) => {
            const isOwnMessage = msg.sender._id === ownUser?.id;
            return (
              <div key={index}>
                {renderMessage(msg, isOwnMessage)}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        <div className="bg-white p-4 flex flex-col border-t border-gray-300">
          {attachment && (
            <AttachmentPreview
              previewUrl={previewUrl}
              attachment={attachment}
              removeAttachment={removeAttachment}
            />
          )}
          <div className="flex w-full items-center">
            <IconButton
              className="text-gray-600 hover:text-gray-800"
              onClick={handleEmojiButtonClick}
            >
              <EmojiEmotionsIcon />
            </IconButton>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleCloseEmojiPicker}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </Popover>
            <IconButton className="text-gray-600 hover:text-gray-800">
              {/* <GifIcon /> */}
            </IconButton>
            <IconButton className="text-gray-600 hover:text-gray-800" onClick={handleAttachmentClick}>
              <AttachFileIcon />
            </IconButton>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,video/*,audio/*,application/pdf,.gif"
              style={{ display: 'none' }}
            />
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="mx-2"
              InputProps={{
                style: {
                  backgroundColor: "white",
                  borderRadius: "20px",
                },
              }}
            />
            <IconButton
              style={{ backgroundColor: "#FB923C", color: "white" }}
              className="hover:bg-orange-500 rounded-full p-2"
              onClick={handleSend}
            >
              <SendIcon />
            </IconButton>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="flex h-screen bg-gray-200">
      <div className="w-1/4 bg-white shadow-md border-r border-gray-300">
        <div className="p-4 bg-gray-800 flex items-center">
          <SportsEsportsIcon className="text-white mr-2" />
          <Typography variant="h6" className="text-white font-bold">
            Gamer Chat
          </Typography>
        </div>
        {conversations.map((conversation) => {
          const otherUser = conversation.users.find((user: ISender) => user._id !== ownUser?.id);
          return (
            <ListItem
              button
              key={conversation._id}
              className="hover:bg-gray-100"
              onClick={() => setSelectedChat(conversation)}
            >
              <ListItemAvatar>
                <Avatar
                  src={otherUser?.profileImage}
                  style={{ backgroundColor: "#FB923C", color: "white" }}
                >
                  {otherUser?.displayName?.[0] || '?'}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="body1" className="font-semibold">{otherUser?.displayName || 'Unknown User'}</Typography>}
                secondary={<Typography variant="body2" className="text-gray-600">Ready to play!</Typography>}
              />
            </ListItem>
          );
        })}
      </div>

      <div className="flex-1 flex flex-col bg-white">
        {renderChatArea()}
      </div>
    </div>
  );
};

export default ChatPage;
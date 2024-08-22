import React, { useState } from "react";
import {
  Avatar,
  TextField,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import GifIcon from "@mui/icons-material/Gif";

const ChatPage: React.FC = () => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    // Handle sending message
    setMessage("");
  };

  return (
    <div className="flex h-window bg-gray-100">
      {/* User list */}
      <div className="w-1/4 bg-white shadow-md">
        <div className="p-4 bg-white flex items-center">
          <SportsEsportsIcon className="mr-2 text-white" />
          {/* <Typography variant="h6" className="font-bold text-white">
            Gamer Chat
          </Typography> */}
        </div>
        <List>
          {["Pixel8or", "LevelUp99", "QuestMaster"].map((user, index) => (
            <ListItem button key={index} className="hover:bg-orange-50">
              <ListItemAvatar>
                <Avatar className="bg-orange-200 text-orange-600">
                  {user[0]}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <span className="text-gray-800 font-semibold">{user}</span>
                }
                secondary={
                  <Typography variant="body2" className="text-gray-500">
                    Ready to play!
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col bg-white shadow-md">
        {/* Chat header */}
        <div className="bg-white p-4 flex items-center">
          <Avatar className="bg-white text-orange-600 mr-2">P</Avatar>
          <Typography variant="h6" className="font-bold text-white">
            Pixel8or
          </Typography>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-orange-50">
          {/* Received message */}
          <div className="flex items-end">
            <Avatar className="bg-orange-200 text-orange-600 mr-2">P</Avatar>
            <div className="bg-white rounded-2xl p-3 max-w-xs shadow-sm">
              <Typography className="text-gray-800">
                Hey! Want to join my quest? 🗡️
              </Typography>
            </div>
          </div>

          {/* Sent message */}
          <div className="flex items-end justify-end">
            <div className="bg-orange-200 rounded-2xl p-3 max-w-xs shadow-sm">
              <Typography className="text-gray-800">
                Sure! I'm all geared up! 🛡️
              </Typography>
            </div>
            <Avatar className="bg-orange-400 text-white ml-2">M</Avatar>
          </div>
        </div>

        {/* Message input */}
        <div className="bg-white p-4 flex items-center border-t border-gray-200">
          <IconButton className="text-orange-400 hover:text-orange-500">
            <EmojiEmotionsIcon />
          </IconButton>
          <IconButton className="text-orange-400 hover:text-orange-500">
            <GifIcon />
          </IconButton>
          <IconButton className="text-orange-400 hover:text-orange-500">
            <AttachFileIcon />
          </IconButton>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mx-2"
            InputProps={{
              style: {
                backgroundColor: "white",
                borderRadius: "20px",
              },
            }}
          />
          <IconButton
            className="bg-orange-400 hover:bg-orange-500 text-white rounded-full p-2"
            onClick={handleSend}
          >
            <SendIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

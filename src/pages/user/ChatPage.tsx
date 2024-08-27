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
                        <div className="flex h-screen bg-gray-200">
                          {/* User list */}
                          <div className="w-1/4 bg-white shadow-md border-r border-gray-300">
                            <div className="p-4 bg-gray-800 flex items-center">
                              <SportsEsportsIcon className="text-white mr-2" />
                              <Typography variant="h6" className="text-white font-bold">
                                Gamer Chat
                              </Typography>
                            </div>
                            <List>
                              {["Pixel8or", "LevelUp99", "QuestMaster"].map((user, index) => (
                                <ListItem button key={index} className="hover:bg-gray-100">
                                  <ListItemAvatar>
                                    <Avatar style={{ backgroundColor: '#FB923C', color: 'white' }}>
                                      {user[0]}
                                    </Avatar>
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={<Typography variant="body1" className="font-semibold">{user}</Typography>}
                                    secondary={
                                      <Typography variant="body2" className="text-gray-600">
                                        Ready to play!
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </div>

                          {/* Chat area */}
                          <div className="flex-1 flex flex-col bg-white">
                            {/* Chat header */}
                            <div className="bg-gray-800 p-4 flex items-center text-white border-b border-gray-300">
                              <Avatar style={{ backgroundColor: '#FB923C', color: 'white' }} className="mr-2">
                                P
                              </Avatar>
                              <Typography variant="h6" className="font-bold">
                                Pixel8or
                              </Typography>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
                              {/* Received message */}
                              <div className="flex items-start mb-2">
                                <Avatar style={{ backgroundColor: '#FB923C', color: 'white' }} className="mr-2">
                                  P
                                </Avatar>
                                <div className="bg-white rounded-lg p-3 max-w-xs shadow-md">
                                  <Typography className="text-gray-800">
                                    Hey! Want to join my quest? 🗡️
                                  </Typography>
                                </div>
                              </div>

                              {/* Sent message */}
                              <div className="flex items-start justify-end mb-2">
                                <div className="bg-[#FB923C] rounded-lg p-3 max-w-xs shadow-md">
                                  <Typography className="text-gray-800">
                                    Sure! I'm all geared up! 🛡️
                                  </Typography>
                                </div>
                                <Avatar style={{ backgroundColor: '#FB923C', color: 'white' }} className="ml-2">
                                  M
                                </Avatar>
                              </div>
                            </div>

                            {/* Message input */}
                            <div className="bg-white p-4 flex items-center border-t border-gray-300">
                              <IconButton className="text-gray-600 hover:text-gray-800">
                                <EmojiEmotionsIcon />
                              </IconButton>
                              <IconButton className="text-gray-600 hover:text-gray-800">
                                <GifIcon />
                              </IconButton>
                              <IconButton className="text-gray-600 hover:text-gray-800">
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
                                style={{ backgroundColor: '#FB923C', color: 'white' }}
                                className="hover:bg-orange-500 rounded-full p-2"
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
                                  
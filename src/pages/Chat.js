import { useHistory, Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { Empty, PageHeader, Skeleton } from "antd";
import { Layout } from "antd";
import { Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { getChat, storeChat, seenChat } from "@/api/vendor/index"
import { getChatRider, storeChatRider, seenChatRider } from "@/api/rider/index"
import { vendorAuth, getUser } from '@/reducers/reducers'
import { isAuthRider, getUser as riderUser } from "@/reducers/rider/reducers"
import { useSelector } from "react-redux";
import Pusher from "pusher-js"
import Echo from 'laravel-echo';
import axios from "axios";
import Avatar from "antd/lib/avatar/avatar";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Content } = Layout;

const Chat = () => {
  const history = useHistory();
  const { id } = useParams();
  let messagesEnd = useRef();
  let messagesEndVendor = useRef();
  const isVendor = useSelector(vendorAuth)
  const isRider = useSelector(isAuthRider)
  const profileRider = useSelector(riderUser)
  const profileVendor = useSelector(getUser)
  const [messages, setMessages] = useState(null);
  const [loader, setLoader] = useState(true);
  const [isTyping, setTyping] = useState(false)
  const [send, setSend] = useState(false)

  const antIcon = <LoadingOutlined style={{ fontSize: 18}} spin />;

  let options = {
    broadcaster: process.env.REACT_APP_BROADCAST,
    key: process.env.REACT_APP_PUSHER_KEY,
    cluster: 'ap2',
    wsHost: 'socket.sathichha.com',
    wsPort: 443,
    forceTLS: true,
    disableStats: true,
    enabledTransports: ["ws", "wss"],
    authorizer: (channel, options) => {
        return {
            authorize: (socketId, callback) => {
                if(isVendor){
                    axios({
                      method: "POST",
                      url: `${process.env.REACT_APP_API_URL}api/vendor/broadcasting/auth`,
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem('_token')}`,
                      },
                      data: {
                        socket_id: socketId,
                        channel_name: channel.name,
                      },
                    })
                      .then((response) => {
                        callback(false, response.data);
                      })
                      .catch((error) => {
                        callback(true, error);
                    });
                }else{
                    axios({
                      method: "POST",
                      url: `${process.env.REACT_APP_API_URL}api/rider/broadcasting/auth`,
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem('_riderToken')}`,
                      },
                      data: {
                        socket_id: socketId,
                        channel_name: channel.name,
                      },
                    })
                      .then((response) => {
                        callback(false, response.data);
                      })
                      .catch((error) => {
                        callback(true, error);
                  });
                }
            }
        };
    }
  };

  let echo = new Echo(options);

  const scrollToBottom = () => {
    if(isVendor){
      messagesEndVendor?.current?.scrollIntoView();
    }else{
      messagesEnd?.current?.scrollIntoView();
    }
  }

  const showMessage = () => {
    if(isVendor){
      getChat(id)
      .then(res => {
          setMessages(res.data)
          setLoader(false)

          // check seen
          seenChat(id)
          .then(res => {});
          scrollToBottom()
      })
  }

  if(isRider){
      getChatRider(id)
      .then(res => {
          setMessages(res.data)
          setLoader(false)
          scrollToBottom()

          // check seen
          seenChatRider(id)
          .then(res => {});
          
      })
  }
  }

  useEffect(() => {
    echo.join(`chat.${id}`)
    .listen('.chat-listen', event => {
      showMessage()
      setSend(false)
      setTyping(false)
    })
    .listenForWhisper('typings', event => {
      setTyping(event)
      if(isVendor){
          messagesEndVendor?.current?.scrollIntoView();
        }else{
          messagesEnd?.current?.scrollIntoView();
        }
    })

    showMessage()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()
    setSend(true)
    
    const formData = new FormData(e.target)
    formData.append('package_id', id);    

    if(isVendor){
        storeChat(formData)
        .then(res => {
          document.querySelector('textarea').value = ''
          document.querySelector('#form').reset()
        })
        return;
    }

    storeChatRider(formData)
    .then(res => {
      document.querySelector('textarea').value = ''
      document.querySelector('#form').reset()
    })
  }

  const typing = () => {
    if(isVendor){
      setTimeout( () => {
        echo.join(`chat.${id}`).whisper('typings', {
          userId: localStorage.getItem('_vendorID'),
          type: 'is_vendor',
          typing: true
        })
      }, 300)
    }else{
      setTimeout( () => {
        echo.join(`chat.${id}`).whisper('typings', {
          userId: localStorage.getItem('_riderID'),
          type: 'is_rider',
          typing: true
        })
      }, 300)
    }
  }

  if(loader) { return <Content
    className="site-layout"
    style={{
      padding: "0 14px",
      marginTop: 60,
    }}
  > <Skeleton active/></Content> }

  return (
    <Layout>
      <PageHeader
        style={{ position: "fixed", zIndex: 1, width: "100%" }}
        className="site-page-header bg-red "
        title="Chat"
        onBack={() => history.goBack()}
      />

      <Content
        className="site-layout"
        style={{
          height:"-webkit-fill-available!important",
          paddingTop: 54,
          paddingBottom: 54,
        }}
      >
        <div className="site-layout-background">
          <div className="chat-screen px-3"
            >
            {isVendor ?

            <Link to="/Delivery">
              <div className="d-flex justify-content flex-column mt-4 mb-4">
                <Avatar
                  size={"large"}
                  className="ticket-img mx-auto rounded-circle"
                >
                  {profileVendor?.first_name?.charAt(0)} 
                </Avatar>
                <p className="font-14 font-weight-600 pt-2 text-center">
                  {profileVendor?.first_name} {profileVendor?.last_name}
                </p>
                <p className="message-time text-center py-1 f-w-600">
                  {profileVendor?.location?.whole_address}
                </p>
                <p className="message-time text-center">+977 { profileVendor?.phone }</p>
              </div>
            </Link>
            : 
              <Link to="/Delivery">
              <div className="d-flex justify-content flex-column mt-5 mb-4">
                <Avatar
                  size={"large"}
                  className="ticket-img mx-auto rounded-circle"
                >
                  {profileRider?.first_name?.charAt(0)} 
                </Avatar>
                <p className="font-14 font-weight-600 pt-2 text-center">
                  {profileRider?.first_name} {profileRider?.last_name}
                </p>
                <p className="message-time text-center py-1 f-w-600">
                  <i className="fa fa-certificate text-success"></i> Verified
                </p>
                <p className="message-time text-center">+977 {profileRider?.phone}</p>
              </div>
            </Link>
            }
            {
                messages.map((res, i) => (
                        <div key={i}>
                        {isVendor ?
                            res.vendor_id === null ?
                            <div className={'send my-3 ml-auto'}>
                                <p>{res.message}</p>
                            </div>
                            : <div className={'recieve my-3'}>
                                <p>{res.message}</p>
                            </div>

                        : res.rider_id === null ?
                            <div className={'send my-3 ml-auto'}>
                                <p>{res.message}</p>
                            </div>
                            : <div className={'recieve my-3'}>
                                <p>{res.message}</p>
                            </div>
                        }
                        </div>
                ))
            }
            
            {
              messages.length === 0 ? 
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              : 

              isVendor ?
                isTyping && isTyping.type !== 'is_vendor' ? 
                  <div className="my-3">
                    <div className="chat-bubble">
                      <div className="typing">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                    </div>
                  </div> : ''
                : isTyping && isTyping.type !== 'is_rider' ? 
                  <div className="my-3">
                    <div className="chat-bubble">
                      <div className="typing">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                    </div>
                  </div> : ''
            }
           
            {
               isVendor ?
               <div style={{ float:"left", clear: "both" }}
                  ref={messagesEndVendor}>
              </div>
              : <div style={{ float:"left", clear: "both" }}
                  ref={messagesEnd}>
              </div>
            }
            { send ? <div style={{ float:"left", clear: "both" }}>
              <Spin indicator={antIcon} />
              </div> : ''
            }
      
          </div>
          <div className="chat-bg position-fixed py-2 px-3">
            <form onSubmit={sendMessage} className="d-flex" id="form">
                <textarea rows={1} name="message" placeholder="Type your message here" onKeyUp={typing} required/>
                <Button
                    htmlType="submit"
                    type="primary"
                    shape="circle"
                    icon={<SendOutlined />}
                    className="ml-2 my-auto"
                />
            </form>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Chat;

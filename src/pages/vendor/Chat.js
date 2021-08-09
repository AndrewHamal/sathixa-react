import { useHistory, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { PageHeader, Skeleton } from "antd";
import { Layout } from "antd";
import { Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { storeChatVendor } from "@/api/vendor/index"
import { ticket, ticketChat } from "@/api/vendor/index"
import Pusher from "pusher-js"
import Echo from 'laravel-echo';
import axios from "axios";
import '@/assets/css/ticketchat.css'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Content } = Layout;

const Chat = () => {
  const history = useHistory();
  const { id } = useParams();
  let messagesEnd = useRef();
  const [messages, setMessages] = useState(null);
  const [loader, setLoader] = useState(true);
  const [ticketInfo, setTicket] = useState(null);
  const antIcon = <LoadingOutlined style={{ fontSize: 18}} spin />;
  const [send, setSend] = useState(false)

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
            }
        }
     }
}

  let echo = new Echo(options);

  const scrollToBottom = () => {
      messagesEnd.current.scrollIntoView();
  }

  const showMessage = () => {
    ticketChat(id)
    .then(res => {
        setMessages(res.data)
        setLoader(false)
        scrollToBottom()
    })
  }

  useEffect(() => {
    ticket(id)
    .then(res => {
        setTicket(res?.data)
        showMessage()
    })

    echo.channel(`ticket.${id}`)
    .listen('.tickets', event => {
      showMessage()
      setSend(false)
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()
    scrollToBottom()
    setSend(true)

    const formData = new FormData(e.target)
    formData.append('ticket_id', id);    

    storeChatVendor(id, formData)
    .then(res => {
      scrollToBottom()
      document.querySelector('textarea').value = ''
      document.querySelector('#form').reset()
    })
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
        title="Ticket Message"
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
            <div className="d-flex justify-content flex-column mt-3 mb-4 ">
              <p className="font-14 font-weight-600 pt-2 text-center text-capitalize">
                  { ticketInfo?.message }
              </p>
              <p className="font-10 text-center">Ticket status: {
                    ticketInfo.status == 0 ? <span className="text-success">Active</span> : <span className="text-danger">Closed</span>
                }</p>
            </div>
            { ticketInfo?.ticket_file?.length ?
            <>
            <p className="mb-2">Attachments</p>
            <div className="row">
    
                {
                    ticketInfo?.ticket_file?.map((res, i) => (
                        // eslint-disable-next-line jsx-a11y/alt-text
                        <div className="col-4 p-3 text-center bg-white" key={i}>
                            <img src={res.url} alt={'d'} className="img-fluid"/>
                        </div>
                    ))
                }
            </div>
            </>
            :" "}

            {
                messages.map((res, i) => (
                  <div key={i}>
                    {
                      res.vendor_id === null ?
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
           { send ? <div style={{ float:"left", clear: "both" }}>
              <Spin indicator={antIcon} />
              </div> : ''
            }

            <div style={{ float:"left", clear: "both" }}
                ref={messagesEnd}>
            </div>
          </div>
          <div className="chat-bg position-fixed py-2 px-3">
            <form onSubmit={sendMessage} className="d-flex" id="form">
                <textarea rows={1} name="message" placeholder="Type your message here" required/>
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

import React, { useState, useEffect, useRef } from 'react';
import sdk from 'matrix-js-sdk';
import TopNavigation from './TopNavigation';

import { BsPlusCircleFill } from 'react-icons/bs';
const USERID = process.env.NEXT_PUBLIC_USERID;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
const HOME_URL = process.env.NEXT_PUBLIC_HOME_URL;

const MatrixRoom = () => {
  const [userId, setUserId] = useState(USERID);
  const [channelName, setChannelName] = useState('matrix-example');
  const [accessToken, setAccessToken] = useState(ACCESS_TOKEN);
  const [currentSender, setCurrentSender] = useState();
  const [currentMsg, setCurrentMsg] = useState();
  const timestamp = useRef();
  const [chatting, setChatting] = useState([]);
  const msgTextRef = useRef();

  const client = sdk.createClient({
    baseUrl: HOME_URL,
    accessToken: ACCESS_TOKEN,
    userId: `@${USERID}:matrix.org`,
  });

  client.startClient();
  useEffect(() => {
    let currentMsgTimestamp;
    setChatting([]);
    client.once('sync', function (state, prevState, res) {
      console.log(state); // state will be 'PREPARED' when the client is ready to use
    });

    client.on('Room.timeline', function (event, room, toStartOfTimeline) {
      if (timestamp.current !== event.localTimestamp) {
        console.log('event :', event);
        const currentDate = new Date(event.localTimestamp);
        console.log(' currentDate:', currentDate);
        timestamp.current = event.localTimestamp;

        if (
          event.event.sender &&
          event.event.content.body &&
          room.roomId == '!yNqmGRvjfHgcpofloP:matrix.org'
        ) {
          setCurrentMsg(event.event.content.body);
          setChatting((current) => [
            ...current,
            {
              sender: event.event.sender,
              msg: event.event.content.body,
            },
          ]);
        }
      }
    });
  }, []);
  const sendMsg = (msg) => {
    var content = {
      body: msg,
      msgtype: 'm.text',
    };
    let testRoomId = '!yNqmGRvjfHgcpofloP:matrix.org';
    client
      .sendEvent(testRoomId, 'm.room.message', content, '') //
      .then((res) => {
        // message sent successfully
        alert('msg sent successfully');
      })
      .catch((err) => {
        console.log(err);
        console.log('***************err***********');
      });
  };

  return (
    <div className="content-container">
      <TopNavigation channelName={channelName} />

      <div className="content-list">
        {chatting.map((chat, index) => {
          return (
            <Post
              name={chat.sender}
              timestamp={'646444+44'}
              content={chat.msg}
              key={index}
            />
          );
        })}
      </div>

      <div className="bottom-bar">
        {/* <PlusIcon /> */}
        <input
          type="text"
          placeholder="Enter message..."
          className="w-full bottom-bar-input"
          ref={msgTextRef}
        />
        <button
          onClick={() => {
            sendMsg(msgTextRef.current.value);
          }}
          className="px-4 py-1 bg-blue-500 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

const Post = ({ name, timestamp, content }) => {
  const seed = Math.round(Math.random() * 100);
  return (
    <div className={'post'}>
      <div className="avatar-wrapper">
        <img
          src={`https://avatars.dicebear.com/api/open-peeps/${seed}.svg`}
          alt=""
          className="avatar"
        />
      </div>

      <div className="post-content">
        <p className="post-owner">
          {name}
          <small className="timestamp">{timestamp}</small>
        </p>
        <p className="post-text">{content}</p>
      </div>
    </div>
  );
};

// const PlusIcon = () => (
//   <BsPlusCircleFill
//     size="22"
//     className="mx-2 text-green-500 dark:shadow-lg dark:text-primary"
//   />
// );

export default MatrixRoom;

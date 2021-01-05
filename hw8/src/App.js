import './App.css'
import React, { useEffect, useRef, useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';
import useChat from './useChat'
import { Button, Input, message, Tag } from 'antd'
import { CREATE_POST_MUTATION, POSTS_QUERY, POSTS_SUBSCRIPTION } from './graphql'

function App() {
  const { status, opened, messages, sendMessage, clearMessages } = useChat()

  const [username, setUsername] = useState('')
  const [body, setBody] = useState('')
  const [host, setHost] = useState('')
  const [addPost] = useMutation(CREATE_POST_MUTATION);
  const { data, subscribeToMore }= useQuery(POSTS_QUERY(host));
  // const response = useQuery(POSTS_QUERY(host));
  // console.log("HE!@#$%67",response.loading,response.data,response.error)
  const bodyRef = useRef(null)
  const sendMessages = () => {
    addPost({
      variables: {
        sender: host,
        receiver: username,
        body: body,
      }
    })
      setUsername('');
      setBody('');
  }
  //console.log("QUERY",useQuery(POSTS_QUERY(host)))

  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s
      const content = {
        content: msg,
        duration: 0.5
      }

      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'info':
          message.info(content)
          break
        case 'danger':
        default:
          message.error(content)
          break
      }
    }
  }

  useEffect(() => {
    // console.log('dd', data)
    //console.log('dd',subscribeToMore)
    if (host) { 
      //console.log(POSTS_QUERY(host))
      // console.log('dd', data)
      subscribeToMore({
        document: POSTS_SUBSCRIPTION(host),
        updateQuery: (prev, { subscriptionData }) => { 
          if (!subscriptionData.data.message) { 
            console.log('no!!!')
            return prev;
          }
          else { 
            switch (subscriptionData.data.message.mutation) { 
              case "SEND":
              case "RECEIVE":
                const msg = subscriptionData.data.message
                return { ...prev, post: [...prev.post, msg.data] }
              default:
                return prev
            }
          }
        }
      })
    }
    
  }, [subscribeToMore,host])

  return (
    <div className="App">
      {host === '' &&
        <div>
        <input
          style={{
            height: '50px',
            width: '300px',
            borderRadius: '15px',
            borderColor: '#AAAAAA',
            fontSize: '24px',
            paddingLeft:'10px'
          }}
          placeholder='Enter host name'
          onKeyDown={(e) => { 
            if (e.key === 'Enter') { 
              if (e.target.value !== '') setHost(e.target.value);
            }
          }}
        ></input>
        </div>
      }
      {host !== '' && 
        <div>
        <div className="App-title">
          <h1>{ host}'s simple Chat</h1>
        <Button type="primary" danger onClick={clearMessages}>
          Clear
        </Button>
      </div>
        <div className="App-messages">
          {/* {(data !== undefined) ? <span>{JSON.stringify(data.post)}</span> : <span />} */}
          {(data) ?
            data.post.map(({ sender, receiver, body }, i) => (
              (sender === host) ?
                (<p className="App-message" key={i} style={{ textAlign:'right'}}>
                  {body}
                  <Tag color="purple">To {receiver}</Tag> 
                </p>)
                : <p className="App-message" key={i}>
                  <Tag color="blue">{sender}</Tag> {body}
                </p>
            ))
          : null
          }
        {/* {messages.length === 0 ? (
          <p style={{ color: '#ccc' }}>
            {opened? 'No messages...' : 'Loading...'}
          </p>
        ) : (
          messages.map(({ name, body }, i) => (
            <p className="App-message" key={i}>
              <Tag color="blue">{name}</Tag> {body}
            </p>
          ))
        )} */}
      </div>
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: 10 }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            bodyRef.current.focus()
          }
        }}
      ></Input>
      <Input.Search
        rows={4}
        value={body}
        ref={bodyRef}
        enterButton="Send"
        onChange={(e) => setBody(e.target.value)}
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg || !username) {
            displayStatus({
              type: 'error',
              msg: 'Please enter a username and a message body.'
            })
            return
          }
          sendMessages()
          setBody('')
        }}
      ></Input.Search>
        </div>
      }
      </div>
  )
}

export default App

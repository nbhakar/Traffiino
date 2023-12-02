import axios from "axios";
import { useEffect, useState } from "react";
import { PrettyChatWindow } from "react-chat-engine-pretty";
import {
  MultiChatWindow,
  MultiChatSocket,
  useMultiChatLogic,
} from "react-chat-engine-advanced";

const ChatsPage = (props) => {
  const [user, setUser] = useState();
  const token = localStorage.getItem("token");
  const chatProps = useMultiChatLogic(
    "efaecc72-d17e-4128-b3ec-ecefb34b40be",
    token,
    token
  );
  useEffect(() => {
    axios
      .post("http://localhost:4000/chatLogin", { token, token })
      .then((r) => {
        setUser({ ...r.data, secret: token });
        console.log(r.data);
      }) // NOTE: over-ride secret
      .catch((e) => console.log(JSON.stringify(e.response.data)));
  }, []);

  // return (
  //   <div style={{ height: "100vh", width: "100vw" }}>
  //     <PrettyChatWindow
  //       projectId={"e6a5d4c8-251a-45bd-82ad-75a6b8b5432c"}
  //       username={props.user?.username} // adam
  //       secret={props.user?.secret} // pass1234
  //       style={{ height: "100%" }}
  //     />
  //   </div>
  // );
  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        padding: "30px 60px",
        backgroundColor: "rgb(73 189 122)",
      }}
    >
      <div
        style={{
          height: "100vh",
          width: "90vw",
          border: "1px solid gainsboro",
          borderRadius: "10px",
          overflow: "hidden",
          padding: "4px",
          backgroundColor: "white",
        }}
      >
        <MultiChatSocket {...chatProps} />
        <MultiChatWindow {...chatProps} style={{ height: "100vh" }} />
      </div>
    </div>
  );
};

export default ChatsPage;

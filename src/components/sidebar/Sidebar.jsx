import { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "@/assets/assets";
import { Context } from "@/context/Context";

const Sidebar = () => {
  // Assuming Context provides an object with onSent, prevPrompts, and setRecentPrompt
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const [extended, setExtended] = useState(false);

  const loadPrompt = async (prompt) =>{
    setRecentPrompt(prompt)
   await onSent(prompt)
  }
  return (
    <div className="sidebar">
      <div className="top">
        {/* Menu Icon to toggle the extended state */}
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="Toggle Menu"
        />
        {/* New chat button */}
        <div onClick={()=> newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="New Chat Icon" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {/* Conditional rendering of recent prompts when sidebar is extended */}
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div onClick={()=>loadPrompt(item)} className="recent-entry" key={index}>
                  <img src={assets.message_icon} alt="Message Icon" />
                  <p>{item.slice(0,18)} ...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="bottom">
        {/* Help Section */}
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Help Icon" />
          {extended ? <p>Help</p> : null}
        </div>

        {/* Activity Section */}
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="Activity Icon" />
          {extended ? <p>Activity</p> : null}
        </div>

        {/* Settings Section */}
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Settings Icon" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

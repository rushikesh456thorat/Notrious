
const Msg = ({ msg,action }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span>{msg}</span>
      <div>
  
       {action && <button style={retryStyle} onClick={action}>Retry</button>}
      </div>
    </div>
  );
  
  const retryStyle = {
    backgroundColor: "#444",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "8px",
  };
  

  
  export default Msg;
  
  
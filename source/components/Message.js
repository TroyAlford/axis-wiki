export default Message = ({ className = '', title = '', children = null }) => (
  <div className={`message ${className}`}>
    <div className="message-header">{title}</div>
    <div className="message-body">{children}</div>
  </div>
)

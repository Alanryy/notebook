import React from 'react'
import './styles.css'

const UsersPage = () => {
    return (
      <div className="notebook">
        <header className="header">
          <h1>Your Notebook Title</h1>
        </header>
        <div className="content">
          <div className="left-sidebar">
            {/* Content for the left sidebar */}
            <div className="left-sidebar-item">Section 1</div>
            <div className="left-sidebar-item">Section 2</div>
            <div className="left-sidebar-item">Section 3</div>
          </div>
          <div className="pages">
            {/* Your notebook content goes here */}
            <div className="page">
              Page 1 Content
            </div>
            <div className="page">
              Page 2 Content
            </div>
          </div>
        </div>
      </div>
    );
}

export default UsersPage
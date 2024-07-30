import React from 'react'

const WriteComment = () => {
  return (
    <div className="write-comment">
    <form action="">
      <label htmlFor="align-center">Leave Reply</label>
      <textarea name="review" id="review" rows="5" cols={"15"}></textarea>
      <div className="grid">
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
      </div>
      <button className="btn-submit">Submit</button>
    </form>
  </div>
  )
}

export default WriteComment
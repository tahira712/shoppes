import React, { useEffect ,useState } from 'react'

const RecentPost = () => {
    let [recent, setRecent] = useState([]);
    useEffect(() => {
        fetch("/blogs.json")
          .then((a) => a.json())
          .then((a) => setRecent(a.blogs));
    })
  return (
    <div>
        <div className="recent-posts">
        <label>Recent Posts</label>
            {
                recent.slice(0, 4).map((a) => (
                    <div className="recent-post">
                        <div className="recent-post-img">
                            <img src={a.image} alt="" />
                        </div>
                        <div className="recent-post-text blog">
                            <h3 className='blog-title'>{a.title}</h3>
                            <span className=" date">Jan 14, 2022</span>
                        </div>
                    </div>
                ))
            }
            
        </div>
        <div className="popular-posts">
            <label>Popular Posts</label>
            {
                recent.slice(0, 4).map((a) => (
                    <div className="popular-post">
                      
                        <div className="popular-post-text blog">
                            <h3 className='blog-title'>{a.title}</h3>
                            <span className=" date">Jan 14, 2022</span>
                        </div>
                    </div>
                ))

            }
        </div>
        <div className="popular-author">
            <label>Popular Author</label>
            {
                recent.slice(0, 4).map((a) => (
                    <div className="popular-author-name-img">
                        <img src={a.authorImage} alt="" />
                        <span className="author-name">{a.authorName}</span>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default RecentPost
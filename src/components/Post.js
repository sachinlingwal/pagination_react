import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./Post.css";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const postPerPage = 10;
  const pageCount = Math.ceil(posts.length / postPerPage);

  const pageVisited = pageNumber * postPerPage;

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  console.log(pageNumber);
  console.log(pageVisited);

  const displayPosts = posts
    .slice(pageVisited, pageVisited + postPerPage)
    .map((post) => {
      return <li key={post.id}>{post.title}</li>;
    });

  return (
    <div>
      <ol>
        {/* {posts.map((post) => {
          return <li key={post.id}>{post.title}</li>;
        })} */}
        {displayPosts}
      </ol>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={changePage}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        // renderOnZeroPageCount={null}

        containerClassName="paginationBttns"
        previousLinkClassName="previousBttn"
        nextLinkClassName="nextBttn"
        disabledClassName="paginationDisabled"
        activeClassName="paginationActive"
      />
    </div>
  );
};

export default Post;

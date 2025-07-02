import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BookService from '../../services/BookService';
import HomeNavbar from './HomeNavbar';
import HomeFooter from './HomeFooter';
import BookPageCss from './BookPage.module.css'
import ReviewBook from './ReviewBook';
import UpvoteButton from './UpvoteButton';
import SimilarBooks from './SimilarBooks';
import { ThreeDots } from 'react-loader-spinner';

function BookPage() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const navigate = useNavigate();
    const[loading, setLoading]=useState(false);

    useEffect(()=>{
      setLoading(true);
      setTimeout(()=>{
        setLoading(false);
      },1000)
    },[])

    useEffect(() => {
        BookService.getBookById(id).then((response) => {
            setBook(response.data);
        });
    }, [id]);

    const handleIssue = async () => {
        navigate(`/issue/${book.id}`);
    }

    if (!book) return <div>Loading...</div>;    return (
        <div className="home-page-body">
        {loading?<div className={BookPageCss.loader}><ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        /></div>:
        <div>
            <HomeNavbar />
            <div className={BookPageCss.bookpagecontainer}>
                <img src={book.imageUrl} alt="UPLOAD" className={BookPageCss.bookicon} />
                <div className={BookPageCss.right}>
                    <div className={BookPageCss.firstline}>
                        <h1>{book.title}</h1>
                        <UpvoteButton bookId={id} />
                    </div>
                    <h3>Author: {book.author}</h3>
                    <h4>Genre: {book.genre}</h4>
                    <h4>ISBN: {book.isbn}</h4>
                    <div className={BookPageCss.description}>
                        <p>Description:</p>
                        <div className={BookPageCss.descriptionContent}>{book.description}</div>
                    </div>
                    <h3>Copies Available: {book.copies}</h3>
                    <button onClick={handleIssue} className={BookPageCss.issueButton}>Issue</button>
                </div>
            </div>
            <ReviewBook bookId={id} />
            <SimilarBooks bookId={id} />
            <HomeFooter />
        </div>
        }
        </div>
    );
}

export default BookPage;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { withAuthHeader } from '../utils/auth';

const ReviewBook = ({bookId}) => {
    const [review, setReview] = useState({ title: '', description: '' });
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const loadReviews = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8086/reviews/book/${bookId}`, 
                    { headers: withAuthHeader() }
                );
                setReviews(response.data);
            } catch (error) {
                console.log("Error loading reviews:", error);
            }
        }
        
        loadReviews();
    }, []);

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:8086/reviews/book/${bookId}`, 
                review,
                { headers: withAuthHeader() }
            );
            setReview({ title: '', description: '' });
            setReviews([...reviews, response.data]);
        } catch (error) {
            console.log("Error posting review:", error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={review.title} 
                    placeholder='Review Title' 
                    onChange={(e) => setReview({ ...review, title: e.target.value })}
                />
                <textarea 
                    name="description" 
                    id="review-description" 
                    placeholder='Give your Review' 
                    onChange={(e) => setReview({ ...review, description: e.target.value })} 
                    value={review.description}
                ></textarea>
                <button type='submit'>Submit</button>
            </form>
            <div>
                <h2>Reviews:</h2>
                {reviews.map((rev, index) => (
                    <div key={index}>
                        <h3>{rev.title}</h3>
                        <p>{rev.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReviewBook;

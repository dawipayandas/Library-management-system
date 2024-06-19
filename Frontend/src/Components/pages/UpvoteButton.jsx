// src/components/UpvoteButton.js
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import { withAuthHeader } from '../utils/auth';
import './UpvoteButton.css'

const UpvoteButton = ({ bookId }) => {
    const cookies = new Cookies();
    const [upvotes, setUpvotes] = useState(0);
    const [upvoted, setUpvoted] = useState(false);

    useEffect(() => {
        const fetchUpvoteCount = async () => {
            const response = await axios.get(`http://localhost:8086/book/upvote/${bookId}`, {
                headers: withAuthHeader()
            });
            setUpvotes(response.data);
        };

        fetchUpvoteCount();
    }, [bookId]);

    const upvote = async () => {
        const username = jwtDecode(cookies.get('token')).sub;
        try {
            const response = await axios.post(
                `http://localhost:8086/book/upvote/${username}/${bookId}`, 
                {},
                { headers: withAuthHeader() }
            );
            setUpvoted(response.data);
            setUpvotes(response.data ? upvotes + 1 : upvotes - 1);
        } catch (error) {
            console.log("Error upvoting:", error);
        }
    };

    return (
        <div>
            <button onClick={upvote} className="upvoteButton">
                    {upvoted ? "Upvoted | " + upvotes : "Upvote | " + upvotes}
            </button>
        </div>
    );
};

export default UpvoteButton;

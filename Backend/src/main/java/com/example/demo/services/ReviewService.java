package com.example.demo.services;

import com.example.demo.models.Book;
import com.example.demo.models.Review;
import com.example.demo.repositories.BookRepository;
import com.example.demo.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ReviewService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    public Review save(Long bookId, Review review) {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new RuntimeException("Book not found"));
        review.setBook(book);
        return reviewRepository.save(review);
    }

    public List<Review> findByBookId(Long bookId) {
        return reviewRepository.findByBookId(bookId);
    }
}




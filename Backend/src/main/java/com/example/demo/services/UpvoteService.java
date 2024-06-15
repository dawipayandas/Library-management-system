package com.example.demo.services;

import com.example.demo.models.Upvote;
import com.example.demo.repositories.UpvoteRepository;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UpvoteService {

    @Autowired
    private UpvoteRepository upvoteRepository;

    @Autowired
    private UserRepository userRepository;

    public boolean upvote(Long bookId, String username) {
        long userId = userRepository.findByUsername(username).get().getId();
        Optional<Upvote> existingUpvote = upvoteRepository.findByUserIdAndBookId(userId, bookId);
        if (existingUpvote.isPresent()) {
            upvoteRepository.delete(existingUpvote.get());
            return false; // Upvote removed
        }
        Upvote upvote = new Upvote();
        upvote.setBookId(bookId);
        upvote.setUserId(userId);
        upvoteRepository.save(upvote);
        return true; // Upvote added
    }

    public long count(Long bookId) {
        return upvoteRepository.countByBookId(bookId);
    }
}

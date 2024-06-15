package com.example.demo.repositories;

import com.example.demo.models.Upvote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UpvoteRepository extends JpaRepository<Upvote, Long> {
    Optional<Upvote> findByUserIdAndBookId(Long userId, Long bookId);
    long countByBookId(Long bookId);
}

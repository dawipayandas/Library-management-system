package com.example.demo.repositories;

import com.example.demo.models.BooksIssued;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BooksIssuedRepository extends JpaRepository<BooksIssued, Long> {
    List<BooksIssued> findByUsername(String username);
    List<BooksIssued> findByReturnTimeLessThan(long currentTime);

    List<BooksIssued> findByBookId(Long bookId);
}

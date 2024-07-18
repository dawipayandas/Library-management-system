package com.example.demo.repositories;

import com.example.demo.models.BooksRead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BooksReadRepository extends JpaRepository<BooksRead, Long> {
    List<BooksRead> findByUsername(String username);
}

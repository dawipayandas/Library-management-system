package com.example.demo.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class BooksIssued {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private long bookId;
    private String username;
    private long returnTime;
}

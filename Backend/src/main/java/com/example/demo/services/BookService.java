package com.example.demo.services;

import com.example.demo.models.Book;
import com.example.demo.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
    public Book getBookById(Long id) {
        return bookRepository.findById(id).get();
    }
    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }
    public void deleteBookById(Long id) {
        bookRepository.deleteById(id);
    }
    public Book updateBook(Book book) {
        return bookRepository.save(book);
    }
    public Book getBookByIsbn(String isbn) {return bookRepository.findByIsbn(isbn);}
}

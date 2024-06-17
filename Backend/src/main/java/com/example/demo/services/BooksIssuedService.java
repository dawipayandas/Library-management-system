package com.example.demo.services;

import com.example.demo.models.Book;
import com.example.demo.models.BooksIssued;
import com.example.demo.repositories.BookRepository;
import com.example.demo.repositories.BooksIssuedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BooksIssuedService {
    @Autowired
    private BooksIssuedRepository booksIssuedRepository;
    @Autowired
    BookRepository bookRepository;

    public BooksIssued issueBook(Long bookId, String username) {
        Book book=bookRepository.findById(bookId).get();
        book.setCopies(book.getCopies()-1);
        bookRepository.save(book);
        BooksIssued booksIssued = new BooksIssued();
        booksIssued.setBookId(bookId);
        booksIssued.setUsername(username);
        return booksIssuedRepository.save(booksIssued);
    }

    public List<Book> getBooksbyUsername(String username) {
        List<BooksIssued> booksIssuedList = booksIssuedRepository.findByUsername(username);

        List<Long> bookIds = booksIssuedList.stream()
                .map(BooksIssued::getBookId)
                .collect(Collectors.toList());

        return bookRepository.findAllById(bookIds);
    }
}

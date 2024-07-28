package com.example.demo.services;

import com.example.demo.models.Book;
import com.example.demo.models.BooksIssued;
import com.example.demo.models.User;
import com.example.demo.repositories.BookRepository;
import com.example.demo.repositories.BooksIssuedRepository;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BooksIssuedService {
    @Autowired
    private BooksIssuedRepository booksIssuedRepository;
    @Autowired
    BookRepository bookRepository;
    @Autowired
    UserRepository userRepository;

    public BooksIssued issueBook(Long bookId, String username, long returnTime) {
        Book book=bookRepository.findById(bookId).get();
        book.setCopies(book.getCopies()-1);
        bookRepository.save(book);
        BooksIssued booksIssued = new BooksIssued();
        booksIssued.setBookId(bookId);
        booksIssued.setUsername(username);
        booksIssued.setReturnTime(returnTime);
        return booksIssuedRepository.save(booksIssued);
    }

    public List<Book> getBooksbyUsername(String username) {
        List<BooksIssued> booksIssuedList = booksIssuedRepository.findByUsername(username);

        List<Long> bookIds = booksIssuedList.stream()
                .map(BooksIssued::getBookId)
                .collect(Collectors.toList());

        return bookRepository.findAllById(bookIds);
    }

    public List<User> getUsersbyBookId(Long bookId) {
        List<BooksIssued> booksIssuedList = booksIssuedRepository.findByBookId(bookId);

        List<User> users = new ArrayList<>();
        for (BooksIssued booksIssued : booksIssuedList) {
            String booksIssuedUsername = booksIssued.getUsername();
            users.add(userRepository.findByUsername(booksIssuedUsername).get());
        }
        return users;
    }
}

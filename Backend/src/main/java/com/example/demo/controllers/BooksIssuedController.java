package com.example.demo.controllers;

import com.example.demo.models.Book;
import com.example.demo.models.BooksIssued;
import com.example.demo.models.User;
import com.example.demo.services.BooksIssuedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/issue/book")
public class BooksIssuedController {

    @Autowired
    private BooksIssuedService booksIssuedService;

    @PostMapping("/{bookId}/{username}")
    public BooksIssued issueBook(@PathVariable Long bookId, @PathVariable String username, @RequestParam long returnTime) {
        return booksIssuedService.issueBook(bookId, username, returnTime);
    }

    @GetMapping("/{username}")
    public List<Book> getBook(@PathVariable String username) {
        return booksIssuedService.getBooksbyUsername(username);
    }

    @GetMapping("/copies/{bookId}")
    public List<User> getBooksIssued(@PathVariable Long bookId) {
        return booksIssuedService.getUsersbyBookId(bookId);
    }
}

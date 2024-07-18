package com.example.demo.controllers;

import com.example.demo.models.Book;
import com.example.demo.services.BooksReadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/readbook")
public class BooksReadController {
    @Autowired
    private BooksReadService booksReadService;
    @GetMapping("/{username}")
    public List<Book> getBooksByUsername(@PathVariable String username) {
        return booksReadService.getBooksByUsername(username);
    }
    @GetMapping("/update")
    public void updateBook(@RequestParam long currentTime) {
        booksReadService.updateBooks(currentTime);
    }
}

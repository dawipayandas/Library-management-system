package com.example.demo.controllers;

import com.example.demo.services.UpvoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/book/upvote")
public class UpvoteController {

    @Autowired
    private UpvoteService upvoteService;

    @PostMapping("/{username}/{bookId}")
    public boolean upvote(@PathVariable String username, @PathVariable long bookId) {
        return upvoteService.upvote(bookId, username);
    }

    @GetMapping("/{bookId}")
    public long count(@PathVariable long bookId) {
        return upvoteService.count(bookId);
    }
}

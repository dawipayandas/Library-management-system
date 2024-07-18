package com.example.demo.services;

import com.example.demo.models.Book;
import com.example.demo.models.BooksIssued;
import com.example.demo.models.BooksRead;
import com.example.demo.repositories.BookRepository;
import com.example.demo.repositories.BooksIssuedRepository;
import com.example.demo.repositories.BooksReadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BooksReadService {
    @Autowired
    private BooksReadRepository readRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private BooksIssuedRepository booksIssuedRepository;

    public List<Book> getBooksByUsername(String username) {
        List<BooksRead> books=readRepository.findByUsername(username);
        List<Long> bookIds = books.stream()
                .map(BooksRead::getBookId)
                .collect(Collectors.toList());

        return bookRepository.findAllById(bookIds);
    }

    public void updateBooks(long currentTime) {
        List<BooksIssued> booksIssuedList= booksIssuedRepository.findByReturnTimeLessThan(currentTime);

        for (BooksIssued booksIssued : booksIssuedList) {
            Long bookId = booksIssued.getBookId();
            String username = booksIssued.getUsername();

            // Increase the number of available copies of the book by 1
            Book book = bookRepository.findById(bookId).orElseThrow(() -> new RuntimeException("Book not found"));
            book.setCopies(book.getCopies() + 1);
            bookRepository.save(book);

            // Store the book ID and user ID in the BooksRead repository
            BooksRead booksRead = new BooksRead();
            booksRead.setBookId(bookId);
            booksRead.setUsername(username);
            readRepository.save(booksRead);

            // Delete the record from the BooksIssued repository
            booksIssuedRepository.delete(booksIssued);
        }
    }
}

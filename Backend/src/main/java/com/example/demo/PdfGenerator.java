package com.example.demo;

import com.example.demo.models.Book;
import com.example.demo.models.User;
import com.example.demo.repositories.BookRepository;
import com.example.demo.repositories.UserRepository;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;

@Configuration
public class PdfGenerator {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    public ByteArrayOutputStream generatePdf(String to, long bookId) throws IOException, DocumentException {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new IllegalArgumentException("Book not found"));
        User user = userRepository.findByEmail(to).orElseThrow(() -> new IllegalArgumentException("User not found"));

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        Document document = new Document(PageSize.A4, 50, 50, 50, 50);
        PdfWriter.getInstance(document, outputStream);

        document.open();

        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 24, BaseColor.DARK_GRAY);
        Font subtitleFont = FontFactory.getFont(FontFactory.HELVETICA, 18, BaseColor.GRAY);
        Font regularFont = FontFactory.getFont(FontFactory.HELVETICA, 12, BaseColor.BLACK);

        Paragraph userHeader = new Paragraph("User Details", titleFont);
        document.add(userHeader);

        Paragraph username = new Paragraph("Username: " + user.getUsername(), subtitleFont);
        document.add(username);
        Paragraph email = new Paragraph("Email: " + user.getEmail(), subtitleFont);
        document.add(email);

        document.add(new Paragraph("\n"));

        Paragraph bookHeader = new Paragraph("Book Details", titleFont);
        document.add(bookHeader);

        String imageUrl = book.getImageUrl();
        if (imageUrl != null && !imageUrl.isEmpty()) {
            try {
                Image image = Image.getInstance(imageUrl);
                image.scaleToFit(150f, 200f);
                document.add(image);
                document.add(new Paragraph("\n"));
            } catch (BadElementException | IOException e) {
                System.err.println("Error loading book image: " + e.getMessage());
            }
        }
        Paragraph title = new Paragraph("Title: " + book.getTitle(), regularFont);
        document.add(title);
        Paragraph author = new Paragraph("Author: " + book.getAuthor(), regularFont);
        document.add(author);

        document.add(new Paragraph("\n"));

        Paragraph date = new Paragraph("Date of issue: " + LocalDate.now(), titleFont);
        document.add(date);

        document.close();

        return outputStream;
    }
}

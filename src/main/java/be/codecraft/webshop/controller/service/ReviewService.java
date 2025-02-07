package be.codecraft.webshop.controller.service;

import be.codecraft.webshop.datamodel.model.Product;
import be.codecraft.webshop.datamodel.model.Review;
import be.codecraft.webshop.datamodel.model.dto.ReviewDTO;
import be.codecraft.webshop.datamodel.repository.ProductRepository;
import be.codecraft.webshop.datamodel.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final EntityMapper entityMapper;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository, ProductRepository productRepository, EntityMapper entityMapper) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
        this.entityMapper = entityMapper;
    }

    @Transactional
    public ReviewDTO createReview(ReviewDTO reviewDTO) {
        Review review = entityMapper.convertReviewToEntity(reviewDTO);
        review = reviewRepository.save(review);

        return entityMapper.convertReviewToDTO(review);
    }

    @Transactional(readOnly = true)
    public ReviewDTO getReviewById(UUID id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        return entityMapper.convertReviewToDTO(review);
    }

    @Transactional(readOnly = true)

    public List<ReviewDTO> getReviewsByProduct(UUID productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        List<Review> reviews = reviewRepository.findAllByProduct(product);
        return reviews.stream()
                .map(entityMapper::convertReviewToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public ReviewDTO updateReview(UUID id, ReviewDTO reviewDTO) {
        Review existingReview = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        existingReview.setRating(reviewDTO.getRating());
        existingReview.setComment(reviewDTO.getComment());

        Review updatedReview = reviewRepository.save(existingReview);
        return entityMapper.convertReviewToDTO(updatedReview);
    }

    @Transactional
    public void deleteReview(UUID id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        reviewRepository.delete(review);
    }
}
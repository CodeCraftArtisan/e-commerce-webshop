package be.codecraft.webshop.datamodel.repository;

import be.codecraft.webshop.datamodel.model.Product;
import be.codecraft.webshop.datamodel.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ReviewRepository extends JpaRepository<Review, UUID> {
    List<Review> findAllByProduct(Product product);
}

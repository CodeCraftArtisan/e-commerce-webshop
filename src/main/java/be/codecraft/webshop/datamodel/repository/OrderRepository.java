package be.codecraft.webshop.datamodel.repository;

import be.codecraft.webshop.datamodel.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {
}

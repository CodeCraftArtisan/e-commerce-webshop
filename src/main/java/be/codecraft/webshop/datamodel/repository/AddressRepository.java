package be.codecraft.webshop.datamodel.repository;

import be.codecraft.webshop.datamodel.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface AddressRepository extends JpaRepository<Address, UUID> {

    @Query("SELECT a FROM Address a WHERE a.user.email = :email")
    Optional<Address> findByUserEmail(String email);
}

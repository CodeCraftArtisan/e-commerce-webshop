package be.codecraft.webshop.datamodel.model;

import be.codecraft.webshop.controller.securityJWT.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Embedded // Use embeddable for address components
    private AddressDetails addressDetails;

}


package be.codecraft.webshop.controller.securityJWT.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartRequest {

    private String email;
    private UUID productId;
    private int quantity;
}

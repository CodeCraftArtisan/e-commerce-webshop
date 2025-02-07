package be.codecraft.webshop.datamodel.model.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartDTO {

    private UUID id;
    private String userEmail;
    private BigDecimal totalPrice;
    private List<CartItemDTO> items;
}

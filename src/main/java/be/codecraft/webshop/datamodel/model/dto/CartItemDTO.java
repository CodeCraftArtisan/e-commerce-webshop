package be.codecraft.webshop.datamodel.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDTO {

    private UUID productId;
    private UUID cartId;
    private String productName;
    private BigDecimal productPrice;
    private Integer quantity;
    private BigDecimal price;
    private List<String> imageUrls = new ArrayList<>();
}

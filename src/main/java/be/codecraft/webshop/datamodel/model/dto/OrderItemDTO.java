package be.codecraft.webshop.datamodel.model.dto;

import be.codecraft.webshop.datamodel.model.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDTO {

    private UUID orderId;
    private UUID productId;
    private Integer quantity;
    private BigDecimal price;
}

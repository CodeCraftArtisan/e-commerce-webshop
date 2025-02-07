package be.codecraft.webshop.datamodel.model.dto;

import be.codecraft.webshop.datamodel.model.OrderStatus;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {

    private UUID id;
    private String userEmail;
    private List<OrderItemDTO> items = new ArrayList<>();
    private BigDecimal totalPrice;
    private OrderStatus orderStatus;
    private Date createdAt;
    private Date updatedAt;
}

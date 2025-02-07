package be.codecraft.webshop.datamodel.model.dto;

import lombok.*;

import java.util.Date;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDTO {

    private UUID id;
    private UUID productId;
    private String userEmail;
    private Integer rating;
    private String comment;
    private Date createdAt;
}

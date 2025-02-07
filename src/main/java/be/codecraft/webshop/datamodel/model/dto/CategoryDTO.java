package be.codecraft.webshop.datamodel.model.dto;

import lombok.*;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {

    private UUID id;
    private String name;
    private UUID parentCategoryId;
    private List<CategoryDTO> subcategories;
    private String imageUrl;
}

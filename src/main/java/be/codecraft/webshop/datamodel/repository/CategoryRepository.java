package be.codecraft.webshop.datamodel.repository;

import be.codecraft.webshop.datamodel.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {

    List<Category> findByParentCategoryId(UUID parentCategoryId);
    Category findByName(String name);
}

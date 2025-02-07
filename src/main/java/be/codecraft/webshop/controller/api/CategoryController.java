package be.codecraft.webshop.controller.api;

import be.codecraft.webshop.controller.service.CategoryService;
import be.codecraft.webshop.datamodel.model.dto.CategoryDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<CategoryDTO> getCategoryById(@PathVariable UUID categoryId) {
        CategoryDTO categoryDTO = categoryService.getCategoryById(categoryId);
        return new ResponseEntity<>(categoryDTO, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        List<CategoryDTO> categories = categoryService.getAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody CategoryDTO categoryDTO) {
        CategoryDTO createdCategory = categoryService.createCategory(categoryDTO);
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<CategoryDTO> updateCategory(
            @PathVariable UUID categoryId,
            @RequestBody CategoryDTO categoryDTO) {
        CategoryDTO updatedCategory = categoryService.updateCategory(categoryId, categoryDTO);
        return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Void> deleteCategory(@PathVariable UUID categoryId) {
        categoryService.deleteCategory(categoryId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/parent/{parentCategoryId}")
    public ResponseEntity<Void> deleteCategoryByParentId(@PathVariable UUID parentCategoryId) {
        categoryService.deleteCategoryByParentId(parentCategoryId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/parent/{parentCategoryId}")
    public ResponseEntity<List<CategoryDTO>> getCategoriesByParentId(@PathVariable UUID parentCategoryId) {
        List<CategoryDTO> categories = categoryService.getCategoriesByParentId(parentCategoryId);
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/hierarchy/{categoryId}")
    public ResponseEntity<CategoryDTO> getCategoryHierarchy(@PathVariable UUID categoryId) {
        CategoryDTO categoryDTO = categoryService.getCategoryHierarchy(categoryId);
        return new ResponseEntity<>(categoryDTO, HttpStatus.OK);
    }
}

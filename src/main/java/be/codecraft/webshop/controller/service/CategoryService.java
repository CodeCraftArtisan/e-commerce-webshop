package be.codecraft.webshop.controller.service;

import be.codecraft.webshop.datamodel.model.Category;
import be.codecraft.webshop.datamodel.model.dto.CategoryDTO;
import be.codecraft.webshop.datamodel.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final EntityMapper entityMapper;

    public CategoryService(CategoryRepository categoryRepository, EntityMapper entityMapper) {
        this.categoryRepository = categoryRepository;
        this.entityMapper = entityMapper;
    }

    @Transactional
    public CategoryDTO getCategoryById(UUID categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Category not found for ID: " + categoryId));
        return entityMapper.convertCategoryToDTO(category);
    }

    @Transactional
    public List<CategoryDTO> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream()
                .map(entityMapper::convertCategoryToDTO)
                .toList();
    }

    @Transactional
    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        Category category = entityMapper.convertDTOToCategory(categoryDTO);

        Category savedCategory = categoryRepository.save(category);

        return entityMapper.convertCategoryToDTO(savedCategory);
    }

    @Transactional
    public CategoryDTO updateCategory(UUID categoryId, CategoryDTO categoryDTO) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Category not found for ID: " + categoryId));

        category.setName(categoryDTO.getName());

        if (categoryDTO.getParentCategoryId() != null) {
            Category parentCategory = categoryRepository.findById(categoryDTO.getParentCategoryId())
                    .orElseThrow(() -> new IllegalArgumentException("Parent category not found for ID: " + categoryDTO.getParentCategoryId()));
            category.setParentCategory(parentCategory);
        }

        if (categoryDTO.getSubcategories() != null && !categoryDTO.getSubcategories().isEmpty()) {
            categoryDTO.getSubcategories().forEach(this::updateSubcategory);
        }

        Category updatedCategory = categoryRepository.save(category);

        return entityMapper.convertCategoryToDTO(updatedCategory);
    }

    private void updateSubcategory(CategoryDTO subcategoryDTO) {
        Category subcategory = categoryRepository.findById(subcategoryDTO.getId())
                .orElseThrow(() -> new IllegalArgumentException("Subcategory not found for ID: " + subcategoryDTO.getId()));

        if (!subcategory.getParentCategory().getId().equals(subcategoryDTO.getParentCategoryId())) {
            Category parentCategory = categoryRepository.findById(subcategoryDTO.getParentCategoryId())
                    .orElseThrow(() -> new IllegalArgumentException("Parent category not found for ID: " + subcategoryDTO.getParentCategoryId()));

            subcategory.setParentCategory(parentCategory);
            categoryRepository.save(subcategory);
        }
    }



    @Transactional
    public void deleteCategory(UUID categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Category not found for ID: " + categoryId));
        categoryRepository.delete(category);
    }

    @Transactional
    public void deleteCategoryByParentId(UUID parentCategoryId) {
        List<Category> subcategories = categoryRepository.findByParentCategoryId(parentCategoryId);
        subcategories.forEach(categoryRepository::delete);
    }

    @Transactional
    public List<CategoryDTO> getCategoriesByParentId(UUID parentCategoryId) {
        List<Category> categories = categoryRepository.findByParentCategoryId(parentCategoryId);
        return categories.stream()
                .map(entityMapper::convertCategoryToDTO)
                .toList();
    }

    @Transactional
    public CategoryDTO getCategoryHierarchy(UUID categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Category not found for ID: " + categoryId));

        return buildCategoryHierarchy(category);
    }

    private CategoryDTO buildCategoryHierarchy(Category category) {
        CategoryDTO categoryDTO = entityMapper.convertCategoryToDTO(category);
        categoryDTO.setSubcategories(category.getSubcategories().stream()
                .map(this::buildCategoryHierarchy)
                .toList());
        return categoryDTO;
    }
}

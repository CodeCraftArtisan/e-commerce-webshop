package be.codecraft.webshop.controller.service;

import be.codecraft.webshop.datamodel.model.Product;
import be.codecraft.webshop.datamodel.model.dto.ProductDTO;
import be.codecraft.webshop.datamodel.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final EntityMapper entityMapper;

    public ProductService(ProductRepository productRepository, EntityMapper entityMapper) {
        this.productRepository = productRepository;
        this.entityMapper = entityMapper;
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> getAllProducts(String lang) {
        return productRepository.findAll()
                .stream()
                .map(entityMapper ::convertProductToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProductDTO getProductById(UUID id, String lang) {
        return productRepository.findById(id)
                .map(entityMapper ::convertProductToDTO)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @Transactional
    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = entityMapper.convertProductToEntity(productDTO);
        product = productRepository.save(product);
        return entityMapper.convertProductToDTO(product);
    }

    @Transactional
    public ProductDTO updateProduct(UUID id, ProductDTO productDTO) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setName(productDTO.getName());
        product.setPrice(productDTO.getPrice());
        product.setDescription(productDTO.getDescription());
        product.setStockQuantity(productDTO.getStockQuantity());
        product = productRepository.save(product);
        return entityMapper.convertProductToDTO(product);
    }

    @Transactional
    public void deleteProduct(UUID id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found");
        }
        productRepository.deleteById(id);
    }
}
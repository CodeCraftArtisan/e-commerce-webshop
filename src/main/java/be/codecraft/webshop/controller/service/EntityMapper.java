package be.codecraft.webshop.controller.service;

import be.codecraft.webshop.controller.securityJWT.model.User;
import be.codecraft.webshop.controller.securityJWT.model.UserRepository;
import be.codecraft.webshop.datamodel.model.*;
import be.codecraft.webshop.datamodel.model.dto.*;
import be.codecraft.webshop.datamodel.repository.CategoryRepository;
import be.codecraft.webshop.datamodel.repository.ProductRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class EntityMapper {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public EntityMapper(UserRepository userRepository, ProductRepository productRepository, CategoryRepository categoryRepository){
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public ProductDTO convertProductToDTO(Product product) {
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getDescription(),
                product.getStockQuantity(),
                product.getCategory().getId(),
                product.getImageUrls(),
                product.getCategory().getName(),
                Math.round(product.getRatings().stream()
                        .mapToInt(Integer::intValue)
                        .average()
                        .orElse(0.0) * 10) / 10.0 //Get the average rating and round it at 1 decimal
        );
    }

    public Product convertProductToEntity(ProductDTO productDTO) {
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setPrice(productDTO.getPrice());
        product.setDescription(productDTO.getDescription());
        product.setStockQuantity(productDTO.getStockQuantity());
        product.setImageUrls(productDTO.getImageUrls());
        product.setCategory(categoryRepository.findByName(productDTO.getCategory()));
        return product;
    }

    public OrderDTO convertOrderToDTO(Order order) {
        if (order == null) {
            return null;
        }

        return OrderDTO.builder()
                .id(order.getId())
                .userEmail(order.getUser() != null ? order.getUser().getEmail() : null)
                .items(order.getItems() != null
                        ? order.getItems().stream()
                        .map(this::convertOrderItemToDTO)
                        .toList()
                        : new ArrayList<>())
                .totalPrice(order.getTotalPrice())
                .orderStatus(order.getOrderStatus())
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .build();
    }

    public Order convertOrderToEntity(OrderDTO orderDTO) {
        if (orderDTO == null) {
            return null;
        }

        Order order = Order.builder()
                .id(orderDTO.getId())
                .items(orderDTO.getItems() != null
                        ? orderDTO.getItems().stream()
                        .map(this::convertOrderItemToEntity)
                        .toList()
                        : new ArrayList<>())
                .totalPrice(orderDTO.getTotalPrice())
                .orderStatus(orderDTO.getOrderStatus())
                .createdAt(orderDTO.getCreatedAt() != null ? orderDTO.getCreatedAt() : new Date())
                .updatedAt(orderDTO.getUpdatedAt() != null ? orderDTO.getUpdatedAt() : new Date())
                .build();

        userRepository.findByEmail(orderDTO.getUserEmail()).ifPresent(order::setUser);

        if (order.getItems() != null) {
            order.getItems().forEach(item -> item.setOrder(order));
        }

        return order;
    }

    public OrderItemDTO convertOrderItemToDTO(OrderItem orderItem) {
        if (orderItem == null) {
            return null;
        }

        return OrderItemDTO.builder()
                .orderId(orderItem.getOrderId())
                .productId(orderItem.getProductId())
                .quantity(orderItem.getQuantity())
                .price(orderItem.getPrice())
                .build();
    }

    public OrderItem convertOrderItemToEntity(OrderItemDTO orderItemDTO) {
        if (orderItemDTO == null) {
            return null;
        }

        OrderItem orderItem = OrderItem.builder()
                .orderId(orderItemDTO.getOrderId())
                .productId(orderItemDTO.getProductId())
                .product(productRepository.findById(orderItemDTO.getProductId()).orElse(null))
                .quantity(orderItemDTO.getQuantity())
                .price(orderItemDTO.getPrice())
                .build();

        productRepository.findById(orderItemDTO.getProductId()).ifPresent(orderItem::setProduct);
        return orderItem;
    }

    public ReviewDTO convertReviewToDTO(Review review) {
        if (review == null) {
            return null;
        }

        return ReviewDTO.builder()
                .id(review.getId())
                .productId(review.getProduct().getId())
                .userEmail(review.getUser().getEmail())
                .rating(review.getRating())
                .comment(review.getComment())
                .createdAt(review.getCreatedAt())
                .build();
    }

    public Review convertReviewToEntity(ReviewDTO reviewDTO) {
        if (reviewDTO == null) {
            return null;
        }

        Review review = Review.builder()
                .id(reviewDTO.getId())
                .rating(reviewDTO.getRating())
                .comment(reviewDTO.getComment())
                .createdAt(reviewDTO.getCreatedAt() != null ? reviewDTO.getCreatedAt() : new Date())
                .build();

        productRepository.findById(reviewDTO.getProductId()).ifPresent(review::setProduct);
        userRepository.findByEmail(reviewDTO.getUserEmail()).ifPresent(review::setUser);

        return review;
    }

    public Cart convertCartToEntity(CartDTO cartDTO) {
        Cart cart = new Cart();
        cart.setId(cartDTO.getId());

        userRepository.findByEmail(cartDTO.getUserEmail()).ifPresent(cart::setUser);
        cart.setTotalPrice(cartDTO.getTotalPrice());

        List<CartItem> cartItems = cartDTO.getItems().stream()
                .map(this::convertCartItemToEntity)
                .collect(Collectors.toList());

        cart.setItems(cartItems);

        return cart;
    }

    public CartItem convertCartItemToEntity(CartItemDTO cartItemDTO) {
        CartItem cartItem = new CartItem();
        cartItem.setProductId(cartItemDTO.getProductId());
        cartItem.setCartId(cartItemDTO.getCartId());

        productRepository.findById(cartItemDTO.getProductId()).ifPresent(cartItem::setProduct);

        cartItem.setQuantity(cartItemDTO.getQuantity());
        cartItem.setPrice(cartItemDTO.getPrice());

        return cartItem;
    }

    public CartDTO convertCartToDTO(Cart cart) {
        List<CartItemDTO> itemDTOs = cart.getItems().stream()
                .map(this::convertCartItemToDTO)
                .collect(Collectors.toList());

        return CartDTO.builder()
                .id(cart.getId())
                .userEmail(cart.getUser().getEmail())
                .totalPrice(cart.getTotalPrice())
                .items(itemDTOs)
                .build();
    }

    private CartItemDTO convertCartItemToDTO(CartItem cartItem) {
        return CartItemDTO.builder()
                .productId(cartItem.getProductId())
                .cartId(cartItem.getCartId())
                .productName(Optional.ofNullable(cartItem.getProduct().getName()).filter(name -> !name.isEmpty()).orElse(""))
                .productPrice(cartItem.getProduct().getPrice())
                .quantity(cartItem.getQuantity())
                .price(cartItem.getPrice())
                .build();
    }

    public AddressDTO convertAddressToDTO(Address address) {
        if (address == null) {
            return null;
        }

        AddressDetails details = address.getAddressDetails();

        return AddressDTO.builder()
                .id(address.getId())
                .userEmail(address.getUser() != null ? address.getUser().getEmail() : null)
                .street(details != null ? details.getStreet() : null)
                .streetNumber(details != null ? details.getStreetNumber() : null)
                .city(details != null ? details.getCity() : null)
                .postalCode(details != null ? details.getPostalCode() : null)
                .country(details != null ? details.getCountry() : null)
                .build();
    }

    public Address convertAddressToEntity(AddressDTO addressDTO) {
        if (addressDTO == null) {
            return null;
        }

        AddressDetails addressDetails = new AddressDetails(
                addressDTO.getStreet(),
                addressDTO.getStreetNumber(),
                addressDTO.getCity(),
                addressDTO.getPostalCode(),
                addressDTO.getCountry()
        );

        Address address = Address.builder()
                .id(addressDTO.getId())
                .addressDetails(addressDetails)
                .build();

        User user = userRepository.findByEmail(addressDTO.getUserEmail()).orElseThrow(() -> new IllegalArgumentException("User not found"));
        address.setUser(user);

        return address;
    }

    public CategoryDTO convertCategoryToDTO(Category category) {
        return CategoryDTO.builder()
                .id(category.getId())
                .name(category.getName())
                .parentCategoryId(category.getParentCategory() != null ? category.getParentCategory().getId() : null)
                .subcategories(category.getSubcategories().stream()
                        .map(subcategory -> CategoryDTO.builder()
                                .id(subcategory.getId())
                                .name(subcategory.getName())
                                .parentCategoryId(subcategory.getParentCategory() != null ? subcategory.getParentCategory().getId() : null)
                                .build())
                        .collect(Collectors.toList()))
                .imageUrl(category.getImageUrl())
                .build();
    }

    public Category convertDTOToCategory(CategoryDTO categoryDTO) {
        Category parentCategory = null;
        if (categoryDTO.getParentCategoryId() != null) {
            parentCategory = categoryRepository.findById(categoryDTO.getParentCategoryId())
                    .orElseThrow(() -> new IllegalArgumentException("Parent category not found for ID: " + categoryDTO.getParentCategoryId()));
        }

        Category category = Category.builder()
                .id(categoryDTO.getId())
                .name(categoryDTO.getName())
                .parentCategory(parentCategory)
                .imageUrl(categoryDTO.getImageUrl())
                .build();

        if (categoryDTO.getSubcategories() != null && !categoryDTO.getSubcategories().isEmpty()) {
            category.setSubcategories(categoryDTO.getSubcategories().stream()
                    .map(this::convertDTOToCategory)
                    .collect(Collectors.toList()));
        }
        return category;
    }
}

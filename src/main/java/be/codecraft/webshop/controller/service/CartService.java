package be.codecraft.webshop.controller.service;

import be.codecraft.webshop.controller.securityJWT.model.UserRepository;
import be.codecraft.webshop.datamodel.model.Cart;
import be.codecraft.webshop.datamodel.model.CartItem;
import be.codecraft.webshop.datamodel.model.Product;
import be.codecraft.webshop.datamodel.model.dto.CartDTO;
import be.codecraft.webshop.datamodel.repository.CartRepository;
import be.codecraft.webshop.datamodel.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.UUID;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final EntityMapper entityMapper;

    public CartService(CartRepository cartRepository, ProductRepository productRepository, EntityMapper entityMapper, UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.entityMapper = entityMapper;
        this.userRepository = userRepository;
    }

    @Transactional
    public CartDTO getCartByUserEmail(String userEmail) {
        Cart cart = cartRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("Cart not found for user email: " + userEmail));
        return entityMapper.convertCartToDTO(cart);
    }

    @Transactional
    public CartDTO addItemToCart(String userEmail, UUID productId, int quantity) {
        Cart cart = cartRepository.findByUserEmail(userEmail).orElseGet(() -> createCartForUser(userEmail));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found: " + productId));

        CartItem cartItem = cart.getItems().stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst()
                .orElse(new CartItem());

        if (cartItem.getCartId() == null) {
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(0);
            cart.getItems().add(cartItem);
        }

        cartItem.setQuantity(cartItem.getQuantity() + quantity);
        cartItem.setPrice(product.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));

        calculateCartTotal(cart);
        cartRepository.save(cart);

        return entityMapper.convertCartToDTO(cart);
    }

    @Transactional
    public CartDTO removeItemFromCart(String userEmail, UUID productId) {
        Cart cart = cartRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("Cart not found for user id: " + userEmail));

        cart.getItems().removeIf(item -> item.getProductId().equals(productId));

        calculateCartTotal(cart);
        cartRepository.save(cart);

        return entityMapper.convertCartToDTO(cart);
    }

    @Transactional
    public void clearCart(String userEmail) {
        Cart cart = cartRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("Cart not found for user id: " + userEmail));

        cart.getItems().clear();
        cart.setTotalPrice(BigDecimal.ZERO);

        cartRepository.save(cart);
    }

    private void calculateCartTotal(Cart cart) {
        BigDecimal total = cart.getItems().stream()
                .map(CartItem::getPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        cart.setTotalPrice(total);
    }

    private Cart createCartForUser(String userEmail) {
        Cart cart = new Cart();
        cart.setItems(new ArrayList<>());
        cart.setTotalPrice(BigDecimal.ZERO);
        userRepository.findByEmail(userEmail).ifPresent(user -> {
            user.setCart(cart);
            cart.setUser(user);
        });
        return cartRepository.save(cart);
    }

}
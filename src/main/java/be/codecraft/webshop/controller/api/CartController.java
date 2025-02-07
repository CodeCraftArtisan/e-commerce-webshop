package be.codecraft.webshop.controller.api;

import be.codecraft.webshop.datamodel.model.dto.CartDTO;
import be.codecraft.webshop.controller.service.CartService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/carts")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{email}")
    public ResponseEntity<CartDTO> getCartByUserEmail(@PathVariable String email) {
        try {
            CartDTO cartDTO = cartService.getCartByUserEmail(email);
            return ResponseEntity.ok(cartDTO);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }

    @PostMapping("/{email}/items")
    public ResponseEntity<CartDTO> addItemToCart(@PathVariable String email,
                                                 @RequestParam UUID productId,
                                                 @RequestParam int quantity) {
        try {
            CartDTO updatedCartDTO = cartService.addItemToCart(email, productId, quantity);
            return ResponseEntity.status(HttpStatus.CREATED).body(updatedCartDTO);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }

    @DeleteMapping("/{email}/items/{productId}")
    public ResponseEntity<CartDTO> removeItemFromCart(@PathVariable String email,
                                                      @PathVariable UUID productId) {
        try {
            CartDTO updatedCartDTO = cartService.removeItemFromCart(email, productId);
            return ResponseEntity.ok(updatedCartDTO);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<Void> clearCart(@PathVariable String email) {
        try {
            cartService.clearCart(email);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}

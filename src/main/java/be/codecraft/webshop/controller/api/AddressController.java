package be.codecraft.webshop.controller.api;

import be.codecraft.webshop.datamodel.model.dto.AddressDTO;
import be.codecraft.webshop.controller.service.AddressService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/addresses")
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping("/{addressId}")
    public ResponseEntity<AddressDTO> getAddressById(@PathVariable UUID addressId) {
        AddressDTO addressDTO = addressService.getAddressById(addressId);
        return ResponseEntity.ok(addressDTO);
    }

    @GetMapping("/user/{userEmail}")
    public ResponseEntity<AddressDTO> getAddressByUserEmail(@PathVariable String userEmail) {
        AddressDTO addressDTO = addressService.getAddressByUserEmail(userEmail);
        return ResponseEntity.ok(addressDTO);
    }

    @PostMapping
    public ResponseEntity<AddressDTO> createAddress(@RequestBody AddressDTO addressDTO) {
        AddressDTO createdAddress = addressService.createAddress(addressDTO);
        return ResponseEntity.status(201).body(createdAddress);
    }

    @PutMapping("/{addressId}")
    public ResponseEntity<AddressDTO> updateAddress(
            @PathVariable UUID addressId,
            @RequestBody AddressDTO addressDTO) {
        AddressDTO updatedAddress = addressService.updateAddress(addressId, addressDTO);
        return ResponseEntity.ok(updatedAddress);
    }

    @DeleteMapping("/{addressId}")
    public ResponseEntity<Void> deleteAddress(@PathVariable UUID addressId) {
        addressService.deleteAddress(addressId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/user/{userEmail}")
    public ResponseEntity<Void> deleteAddressByUserEmail(@PathVariable String userEmail) {
        addressService.deleteAddressByUserEmail(userEmail);
        return ResponseEntity.noContent().build();
    }
}

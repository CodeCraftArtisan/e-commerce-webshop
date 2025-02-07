package be.codecraft.webshop.controller.securityJWT.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String street;
    private String streetNumber;
    private String postalCode;
    private String city;
    private String country;
}

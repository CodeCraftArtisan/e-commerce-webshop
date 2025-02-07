package be.codecraft.webshop.controller.securityJWT.model;

import org.springframework.stereotype.Repository;
import java.util.HashSet;
import java.util.Set;

@Repository
public class TokenRepository {
    private final Set<String> blacklistedTokens = new HashSet<>();

    public void invalidateToken(String token) {
        blacklistedTokens.add(token);
    }

    public boolean isTokenValid(String token) {
        return !blacklistedTokens.contains(token);
    }
}

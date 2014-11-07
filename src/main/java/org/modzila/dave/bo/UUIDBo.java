package org.modzila.dave.bo;

import java.util.UUID;
import org.springframework.stereotype.Component;

@Component
public class UUIDBo {

    public String generate() {
        UUID uuid = UUID.randomUUID();
        return String.format("widget-%s", uuid.toString());
    }
}

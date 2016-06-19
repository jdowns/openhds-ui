package openhds.service;

import openhds.domain.Request;
import openhds.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Optional;

@Service
public class FieldworkerService extends HttpService {

    @Autowired
    private RestTemplate restTemplate;

    private Optional<User> getUser(String username, String password, User[] forEntity) {
        return Arrays.asList(forEntity).stream()
                .filter(u -> u.getUsername().equals(username) && BCrypt.checkpw(password, u.getPasswordHash()))
                .findFirst();
    }

    public String login(String username, String password) {
        ResponseEntity<User[]> forEntity = get("/fieldWorkers/bulk", User[].class);
        if (forEntity.getStatusCode() != HttpStatus.OK) {
            throw new RuntimeException(forEntity.getStatusCode().toString());
        }

        Optional<User> user = getUser(username, password, forEntity.getBody());

        return user.orElseThrow(RuntimeException::new).getUuid();
    }

    @Override
    public String createEntity(Request request) {
        return null;
    }
}

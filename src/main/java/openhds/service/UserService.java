package openhds.service;

import openhds.domain.Request;
import openhds.domain.User;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService extends HttpService {

    private Optional<User> getUser(String username, String password, User[] forEntity) {
        return Arrays.asList(forEntity).stream()
                .filter(u -> username.equals(u.getUsername()) && BCrypt.checkpw(password, u.getPasswordHash()))
                .findFirst();
    }

    private Optional<User> getFieldworker(String username, String password, User[] forEntity) {
        return Arrays.asList(forEntity).stream()
                .filter(u -> username.equals(u.getFieldWorkerId()) && BCrypt.checkpw(password, u.getPasswordHash()))
                .findFirst();
    }

    public String login(String username, String password, boolean isSupervisor) {
        String url = isSupervisor ? "/users/bulk" : "fieldWorkers/bulk";
        ResponseEntity<User[]> forEntity = get(url, User[].class);
        if (forEntity.getStatusCode() != HttpStatus.OK) {
            throw new RuntimeException(forEntity.getStatusCode().toString());
        }

        Optional<User> user = isSupervisor ?
                getUser(username, password, forEntity.getBody()) :
                getFieldworker(username, password, forEntity.getBody());

        return user.orElseThrow(RuntimeException::new).getUuid();
    }

    @Override
    public String createEntity(Request request) {
        return null;
    }
}

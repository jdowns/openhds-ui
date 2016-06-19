package openhds.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import openhds.domain.*;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public abstract class HttpService {
    @Autowired
    private RestTemplate restTemplate;

    private String baseUrl = "http://localhost:8080";

    public abstract String createEntity(Request request);

    private HttpHeaders getHttpHeaders() {
        String plainCreds = "user:password";
        byte[] plainCredsBytes = plainCreds.getBytes();
        byte[] base64CredsBytes = Base64.encodeBase64(plainCredsBytes);
        String base64Creds = new String(base64CredsBytes);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add("Authorization", "Basic " + base64Creds);
        return headers;
    }

    private HttpEntity<String> createRequest() {
        HttpHeaders headers = getHttpHeaders();

        return new HttpEntity<>(headers);
    }

    private HttpEntity<String> createRequest(String body) {
        HttpHeaders headers = getHttpHeaders();

        return new HttpEntity<>(body, headers);
    }

    public ResponseEntity get(String url, Class responseEntityClass) {
        String uri = baseUrl + url;
        return restTemplate.exchange(uri, HttpMethod.GET, createRequest(), responseEntityClass);
    }

    public ResponseEntity post(String url, Object body, Class responseEntityClass) throws JsonProcessingException {
        String uri = baseUrl + url;
        ObjectMapper objectMapper = new ObjectMapper();
        String value = objectMapper.writeValueAsString(body);
        HttpEntity request = createRequest(value);
        return restTemplate.exchange(uri, HttpMethod.POST, request, responseEntityClass);
    }

    public String create(String url, Request body, Class responseEntityClass) {
        ResponseEntity<Response> forEntity;
        try {
            forEntity = post(url, body, responseEntityClass);
            if (forEntity.getStatusCode() != HttpStatus.CREATED) {
                throw new RuntimeException(forEntity.getStatusCode().toString());
            }
            return forEntity.getBody().getUuid();

        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}

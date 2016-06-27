package openhds;

import openhds.domain.LoginAttempt;
import openhds.domain.OpenHdsRestResponse;
import openhds.projectcode.Model;
import openhds.service.*;
import openhds.visit.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.WebMvcAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.List;

@SpringBootApplication
@RestController
@EnableWebMvc
public class Application extends WebMvcAutoConfiguration {

    @Autowired
    private UserService userService;

    public static String stringify(String result) {
        return "\"" + result + "\"";
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<String> login(@RequestBody LoginAttempt loginAttempt) {
        try {
            String result = userService.login(loginAttempt.getUsername(), loginAttempt.getPassword(), loginAttempt.isSupervisor());
            return ResponseEntity.ok(stringify(result));
        } catch (RuntimeException e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}

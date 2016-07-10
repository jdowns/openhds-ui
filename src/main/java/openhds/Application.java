package openhds;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.WebMvcAutoConfiguration;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@RestController
@EnableWebMvc
public class Application extends WebMvcAutoConfiguration {

//    @Autowired
//    private UserService userService;
//
//    public static String stringify(String result) {
//        return "\"" + result + "\"";
//    }
//
//    @RequestMapping(value = "/login", method = RequestMethod.POST)
//    public ResponseEntity<String> login(@RequestBody LoginAttempt loginAttempt) {
//        try {
//            String result = userService.login(loginAttempt.getUsername(), loginAttempt.getPassword(), loginAttempt.isSupervisor());
//            return ResponseEntity.ok(stringify(result));
//        } catch (RuntimeException e) {
//            System.out.println(e);
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
//        }
//    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}

package openhds;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;

import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = { Application.class, TestConfiguration.class})
@IntegrationTest({"server.port=0"})
@WebAppConfiguration
public abstract class FunctionalTestBase {

    @Value("${local.server.port}") protected int port;

    @Autowired
    protected ObjectMapper objectMapper;

    @Before
    public void setUp() {
        RestAssured.port = port;
    }

}

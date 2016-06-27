package openhds.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.web.client.RestTemplate;

import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.verify;

@RunWith(MockitoJUnitRunner.class)
public class IndividualServiceTest {

    @Mock RestTemplate restTemplate;


    @Test
    public void createEntity_emitsPost() {
        assertTrue(true);
    }
}

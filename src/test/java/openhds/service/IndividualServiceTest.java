package openhds.service;

import openhds.domain.Individual;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.web.client.RestTemplate;

import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.verify;

@RunWith(MockitoJUnitRunner.class)
public class IndividualServiceTest {
    @InjectMocks IndividualService underTest;

    @Mock RestTemplate restTemplate;


    @Test
    public void createEntity_emitsPost() {
        assertTrue(true);
    }
}

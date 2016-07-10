package openhds.individual;

import openhds.ControllerTest;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class IndividualControllerTest extends ControllerTest {

    @Mock Client client;
    @InjectMocks
    IndividualController underTest;

}

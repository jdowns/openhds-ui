package openhds;

import feign.Feign;
import feign.auth.BasicAuthRequestInterceptor;
import feign.gson.GsonDecoder;
import feign.gson.GsonEncoder;
import openhds.user.FieldWorkerClient;
import openhds.user.UserClient;
import openhds.visit.Client;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class AppConfig {
    @Value("${openHdsRestUrl}")
    private String baseUrl;

    @Value("${apiUser}")
    private String apiUser;

    @Value("${apiPassword}")
    private String apiPassword;

    private <T> T feignClientBuilder(Class target) {
        return (T) Feign.builder()
                .decoder(new GsonDecoder())
                .encoder(new GsonEncoder())
                .requestInterceptor(new BasicAuthRequestInterceptor(apiUser, apiPassword))
                .target(target, baseUrl);
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }


    @Bean public openhds.death.Client deathClient() {
        return feignClientBuilder(openhds.death.Client.class);
    }

    @Bean public openhds.errorLog.Client errorLogClient() {
        return feignClientBuilder(openhds.errorLog.Client.class);
    }

    @Bean public openhds.event.Client eventClient() {
        return feignClientBuilder(openhds.event.Client.class);
    }

    @Bean public FieldWorkerClient fieldWorkerClient() {
        return feignClientBuilder(FieldWorkerClient.class);
    }

    @Bean public openhds.individual.Client individualClient() {
        return feignClientBuilder(openhds.individual.Client.class);
    }

    @Bean public openhds.inmigration.Client inMigrationClient() {
        return feignClientBuilder(openhds.inmigration.Client.class);
    }

    @Bean public openhds.location.Client locationClient() {
        return feignClientBuilder(openhds.location.Client.class);
    }

    @Bean public openhds.locationhierarchy.Client locationHierarchyClient() {
        return feignClientBuilder(openhds.locationhierarchy.Client.class);
    }

    @Bean public openhds.locationhierarchylevel.Client locationHierarchyLevelClient() {
        return feignClientBuilder(openhds.locationhierarchylevel.Client.class);
    }

    @Bean public openhds.membership.Client membershipClient() {
        return feignClientBuilder(openhds.membership.Client.class);
    }

    @Bean public openhds.outmigration.Client outMigrationClient() {
        return feignClientBuilder(openhds.outmigration.Client.class);
    }

    @Bean public openhds.pregnancyobservation.Client pregnancyObservationClient() {
        return feignClientBuilder(openhds.pregnancyobservation.Client.class);
    }

    @Bean public openhds.pregnancyoutcome.Client pregnancyOutcomeClient() {
        return feignClientBuilder(openhds.pregnancyoutcome.Client.class);
    }

    @Bean public openhds.pregnancyresult.Client pregnancyResultClient() {
        return feignClientBuilder(openhds.pregnancyresult.Client.class);
    }

    @Bean public openhds.projectcode.Client projectCodeClient() {
        return feignClientBuilder(openhds.projectcode.Client.class);
    }

    @Bean public openhds.relationship.Client relationshipClient() {
        return feignClientBuilder(openhds.relationship.Client.class);
    }

    @Bean public openhds.residency.Client residencyClient() {
        return feignClientBuilder(openhds.residency.Client.class);
    }

    @Bean public openhds.socialgroup.Client socialGroupClient() {
        return feignClientBuilder(openhds.socialgroup.Client.class);
    }

    @Bean public UserClient userClient() {
        return feignClientBuilder(UserClient.class);
    }

    @Bean public Client visitClient() {
        return feignClientBuilder(Client.class);
    }
}

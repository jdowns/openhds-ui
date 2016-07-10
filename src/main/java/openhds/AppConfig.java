package openhds;

import feign.Feign;
import feign.auth.BasicAuthRequestInterceptor;
import feign.gson.GsonDecoder;
import feign.gson.GsonEncoder;
import openhds.domain.Client;
import openhds.user.FieldWorkerClient;
import openhds.user.UserClient;
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

    private <T> T feignClientBuilder(Class target, String url) {
        return (T) Feign.builder()
                .decoder(new GsonDecoder())
                .encoder(new GsonEncoder())
                .requestInterceptor(new BasicAuthRequestInterceptor(apiUser, apiPassword))
                .target(target, baseUrl + url);
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }


    @Bean public RestClient<openhds.death.Model> deathClient() {
        return feignClientBuilder(openhds.death.Client.class, "/death");
    }

    @Bean public openhds.errorLog.Client errorLogClient() {
        return feignClientBuilder(openhds.errorLog.Client.class, "/errors");
    }

    @Bean public openhds.event.Client eventClient() {
        return feignClientBuilder(openhds.event.Client.class, "/events");
    }

    @Bean public FieldWorkerClient fieldWorkerClient() {
        return feignClientBuilder(FieldWorkerClient.class, "/fieldWorkers");
    }

    @Bean public openhds.individual.Client individualClient() {
        return feignClientBuilder(openhds.individual.Client.class, "/individuals");
    }

    @Bean public openhds.inmigration.Client inMigrationClient() {
        return feignClientBuilder(openhds.inmigration.Client.class, "/inMigrations");
    }

    @Bean public openhds.location.Client locationClient() {
        return feignClientBuilder(openhds.location.Client.class, "/locations");
    }

    @Bean public openhds.locationhierarchy.Client locationHierarchyClient() {
        return feignClientBuilder(openhds.locationhierarchy.Client.class, "/locationHierarchies");
    }

    @Bean public openhds.locationhierarchylevel.Client locationHierarchyLevelClient() {
        return feignClientBuilder(openhds.locationhierarchylevel.Client.class, "/locationHierarchyLevels");
    }

    @Bean public openhds.membership.Client membershipClient() {
        return feignClientBuilder(openhds.membership.Client.class, "/memberships");
    }

    @Bean public openhds.outmigration.Client outMigrationClient() {
        return feignClientBuilder(openhds.outmigration.Client.class, "/outMigrations");
    }

    @Bean public openhds.pregnancyobservation.Client pregnancyObservationClient() {
        return feignClientBuilder(openhds.pregnancyobservation.Client.class, "/pregnancyObservations");
    }

    @Bean public openhds.pregnancyoutcome.Client pregnancyOutcomeClient() {
        return feignClientBuilder(openhds.pregnancyoutcome.Client.class, "/pregnancyOutcomes");
    }

    @Bean public openhds.pregnancyresult.Client pregnancyResultClient() {
        return feignClientBuilder(openhds.pregnancyresult.Client.class, "/pregnancyReults");
    }

    @Bean public openhds.projectcode.Client projectCodeClient() {
        return feignClientBuilder(openhds.projectcode.Client.class, "/projectCodes");
    }

    @Bean public openhds.relationship.Client relationshipClient() {
        return feignClientBuilder(openhds.relationship.Client.class, "/relationships");
    }

    @Bean public openhds.residency.Client residencyClient() {
        return feignClientBuilder(openhds.residency.Client.class, "/residencies");
    }

    @Bean public openhds.socialgroup.Client socialGroupClient() {
        return feignClientBuilder(openhds.socialgroup.Client.class, "/socialGroups");
    }

    @Bean public UserClient userClient() {
        return feignClientBuilder(UserClient.class, "/users");
    }

    @Bean public Client visitClient() {
        return feignClientBuilder(Client.class, "/visits");
    }
}

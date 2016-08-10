package openhds;

import feign.Feign;
import feign.auth.BasicAuthRequestInterceptor;
import feign.gson.GsonDecoder;
import feign.gson.GsonEncoder;
import openhds.death.DeathClient;
import openhds.errorLog.ErrorLogClient;
import openhds.event.EventClient;
import openhds.individual.IndividualClient;
import openhds.inmigration.InMigrationClient;
import openhds.location.LocationClient;
import openhds.locationhierarchy.LocationHierarchyClient;
import openhds.locationhierarchylevel.LocationHierarchyLevelClient;
import openhds.membership.MembershipClient;
import openhds.outmigration.OutMigrationClient;
import openhds.pregnancyobservation.PregnancyObservationClient;
import openhds.pregnancyoutcome.PregnancyOutcomeClient;
import openhds.pregnancyresult.PregnancyResultClient;
import openhds.projectcode.ProjectCodeClient;
import openhds.relationship.RelationshipClient;
import openhds.residency.ResidencyClient;
import openhds.socialgroup.SocialGroupClient;
import openhds.user.FieldWorkerClient;
import openhds.user.UserClient;
import openhds.visit.VisitClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Value("${openHdsRestUrl}")
    private String baseUrl;

    @Value("${apiUser}")
    private String apiUser;

    @Value("${apiPassword}")
    private String apiPassword;

    private <T> T feignClientBuilder(Class target, String url) {
        //noinspection unchecked
        return (T) Feign.builder()
                .decoder(new GsonDecoder())
                .encoder(new GsonEncoder())
                .requestInterceptor(new BasicAuthRequestInterceptor(apiUser, apiPassword))
                .target(target, baseUrl + url);
    }

    @Bean public DeathClient deathClient() {
        return feignClientBuilder(DeathClient.class, "/death");
    }

    @Bean public ErrorLogClient errorLogClient() {
        return feignClientBuilder(ErrorLogClient.class, "/errors");
    }

    @Bean public EventClient eventClient() {
        return feignClientBuilder(EventClient.class, "/events");
    }

    @Bean public FieldWorkerClient fieldWorkerClient() {
        return feignClientBuilder(FieldWorkerClient.class, "/fieldWorkers");
    }

    @Bean public IndividualClient individualClient() {
        return feignClientBuilder(IndividualClient.class, "/individuals");
    }

    @Bean public InMigrationClient inMigrationClient() {
        return feignClientBuilder(InMigrationClient.class, "/inMigrations");
    }

    @Bean public LocationClient locationClient() {
        return feignClientBuilder(LocationClient.class, "/locations");
    }

    @Bean public LocationHierarchyClient locationHierarchyClient() {
        return feignClientBuilder(LocationHierarchyClient.class, "/locationHierarchies");
    }

    @Bean public LocationHierarchyLevelClient locationHierarchyLevelClient() {
        return feignClientBuilder(LocationHierarchyLevelClient.class, "/locationHierarchyLevels");
    }

    @Bean public MembershipClient membershipClient() {
        return feignClientBuilder(MembershipClient.class, "/memberships");
    }

    @Bean public OutMigrationClient outMigrationClient() {
        return feignClientBuilder(OutMigrationClient.class, "/outMigrations");
    }

    @Bean public PregnancyObservationClient pregnancyObservationClient() {
        return feignClientBuilder(PregnancyObservationClient.class, "/pregnancyObservations");
    }

    @Bean public PregnancyOutcomeClient pregnancyOutcomeClient() {
        return feignClientBuilder(PregnancyOutcomeClient.class, "/pregnancyOutcomes");
    }

    @Bean public PregnancyResultClient pregnancyResultClient() {
        return feignClientBuilder(PregnancyResultClient.class, "/pregnancyResults");
    }

    @Bean public ProjectCodeClient projectCodeClient() {
        return feignClientBuilder(ProjectCodeClient.class, "/projectCodes");
    }

    @Bean public RelationshipClient relationshipClient() {
        return feignClientBuilder(RelationshipClient.class, "/relationships");
    }

    @Bean public ResidencyClient residencyClient() {
        return feignClientBuilder(ResidencyClient.class, "/residencies");
    }

    @Bean public SocialGroupClient socialGroupClient() {
        return feignClientBuilder(SocialGroupClient.class, "/socialGroups");
    }

    @Bean public VisitClient visitClient() {
        return feignClientBuilder(VisitClient.class, "/visits");
    }

    @Bean public UserClient userClient() {
        return feignClientBuilder(UserClient.class, "/users");
    }

}

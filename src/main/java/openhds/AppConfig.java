package openhds;

import feign.Feign;
import feign.auth.BasicAuthRequestInterceptor;
import feign.gson.GsonDecoder;
import feign.gson.GsonEncoder;
import openhds.death.Death;
import openhds.death.DeathClient;
import openhds.death.DeathController;
import openhds.errorLog.ErrorLog;
import openhds.errorLog.ErrorLogClient;
import openhds.errorLog.ErrorLogController;
import openhds.event.Event;
import openhds.event.EventClient;
import openhds.event.EventController;
import openhds.individual.Individual;
import openhds.individual.IndividualClient;
import openhds.individual.IndividualController;
import openhds.inmigration.InMigration;
import openhds.inmigration.InMigrationClient;
import openhds.inmigration.InMigrationController;
import openhds.location.LocationClient;
import openhds.location.Location;
import openhds.location.LocationController;
import openhds.locationhierarchy.LocationHierarchy;
import openhds.locationhierarchy.LocationHierarchyClient;
import openhds.locationhierarchy.LocationHierarchyController;
import openhds.locationhierarchylevel.LocationHierarchyLevel;
import openhds.locationhierarchylevel.LocationHierarchyLevelClient;
import openhds.locationhierarchylevel.LocationHierarchyLevelController;
import openhds.membership.Membership;
import openhds.membership.MembershipClient;
import openhds.membership.MembershipController;
import openhds.outmigration.OutMigration;
import openhds.outmigration.OutMigrationClient;
import openhds.outmigration.OutMigrationController;
import openhds.pregnancyobservation.PregnancyObservation;
import openhds.pregnancyobservation.PregnancyObservationClient;
import openhds.pregnancyobservation.PregnancyObservationController;
import openhds.pregnancyoutcome.PregnancyOutcome;
import openhds.pregnancyoutcome.PregnancyOutcomeClient;
import openhds.pregnancyoutcome.PregnancyOutcomeController;
import openhds.pregnancyresult.PregnancyResult;
import openhds.pregnancyresult.PregnancyResultClient;
import openhds.pregnancyresult.PregnancyResultController;
import openhds.projectcode.ProjectCode;
import openhds.projectcode.ProjectCodeClient;
import openhds.projectcode.ProjectCodeController;
import openhds.relationship.Relationship;
import openhds.relationship.RelationshipClient;
import openhds.relationship.RelationshipController;
import openhds.residency.Residency;
import openhds.residency.ResidencyClient;
import openhds.residency.ResidencyController;
import openhds.socialgroup.SocialGroup;
import openhds.socialgroup.SocialGroupClient;
import openhds.socialgroup.SocialGroupController;
import openhds.user.FieldWorkerClient;
import openhds.user.User;
import openhds.user.UserClient;
import openhds.user.UserController;
import openhds.visit.Visit;
import openhds.visit.VisitClient;
import openhds.visit.VisitController;
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

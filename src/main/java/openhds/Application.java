package openhds;

import openhds.domain.*;
import openhds.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.WebMvcAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.List;

@SpringBootApplication
@RestController
@EnableWebMvc
public class Application extends WebMvcAutoConfiguration {

	@Autowired
	private UserService userService;

    @Autowired
    private FieldworkerService fieldworkerService;

    @Autowired
    private LocationService locationService;

    @Autowired
    private SocialGroupService socialGroupService;

    @Autowired
    private IndividualService individualService;

    @Autowired
    private MembershipService membershipService;

    @Autowired
    private RelationshipService relationshipService;

    @Autowired
    private ResidencyService residencyService;

    @Autowired
    private VisitService visitService;

    @Autowired
    private InMigrationService inMigrationService;

    @Autowired
    private OutMigrationService outMigrationService;

    @Autowired
    private DeathService deathService;

    @Autowired
    private PregnancyObservationService pregnancyObservationService;

    @Autowired
    private PregnancyOutcomeService pregnancyOutcomeService;

    @Autowired
    private PregnancyResultService pregnancyResultService;

    @Autowired
    private LocationHierarchyLevelService locationHierarchyLevelService;

    @Autowired
    private LocationHierarchyService locationHierarchyService;

    @Autowired
    private ProjectCodeService projectCodeService;

    public static String stringify(String result) {
        return "\"" + result + "\"";
    }

    @RequestMapping(value="/individual", method=RequestMethod.POST)
    public ResponseEntity<String> createIndividual(@RequestBody IndividualRequest request) {
        String result = individualService.createEntity(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(stringify(result));
    }

	@RequestMapping(value="/socialGroup", method=RequestMethod.POST)
    public ResponseEntity<String> createSocialGroup(@RequestBody SocialGroupRequest request) {
        String result = socialGroupService.createEntity(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(stringify(result));
    }

	@RequestMapping(value="/location", method=RequestMethod.POST)
    public ResponseEntity<String> createLocation(@RequestBody LocationRequest request) {
        String result = locationService.createEntity(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(stringify(result));
    }

    @RequestMapping(value="/membership", method=RequestMethod.POST)
    public ResponseEntity<String> createMembership(@RequestBody MembershipRequest request) {
        String result = membershipService.createEntity(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(stringify(result));
    }

    @RequestMapping(value="/relationship", method=RequestMethod.POST)
    public ResponseEntity<String> createRelationship(@RequestBody RelationshipRequest request) {
        String result = relationshipService.createEntity(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(stringify(result));
    }

    @RequestMapping(value="/residency", method=RequestMethod.POST)
    public ResponseEntity<String> createResidency(@RequestBody ResidencyRequest request) {
        String result = residencyService.createEntity(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(stringify(result));
    }

    @RequestMapping(value="/visit", method=RequestMethod.POST)
    public ResponseEntity<String> createInMigration(@RequestBody VisitRequest request) {
        String result = visitService.createEntity(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(stringify(result));
    }

    @RequestMapping(value="/inMigration", method=RequestMethod.POST)
    public ResponseEntity<String> createInMigration(@RequestBody InMigrationRequest request) {
        String result = inMigrationService.createEntity(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(stringify(result));
    }

    @RequestMapping(value="/outMigration", method=RequestMethod.POST)
    public ResponseEntity<String> createInMigration(@RequestBody OutMigrationRequest request) {
        String result = outMigrationService.createEntity(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(stringify(result));
    }

    @RequestMapping(value="/death", method=RequestMethod.POST)
    public ResponseEntity<String> createDeath(@RequestBody DeathRequest request) {
        String result = deathService.createEntity(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(stringify(result));
    }

    @RequestMapping(value="/pregnancyObservation", method=RequestMethod.POST)
    public ResponseEntity<String> createInMigration(@RequestBody PregnancyObservationRequest request) {
        String result = pregnancyObservationService.createEntity(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(stringify(result));
    }

    @RequestMapping(value="/pregnancyResult", method=RequestMethod.POST)
    public ResponseEntity<String> createPregnancyResult(@RequestBody PregnancyResultRequest request) {
        String result = pregnancyResultService.createEntity(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(stringify(result));
    }

    @RequestMapping(value="/pregnancyOutcome", method=RequestMethod.POST)
    public ResponseEntity<String> createPregnancyOutcome(@RequestBody PregnancyOutcomeRequest request) {
        String result = pregnancyOutcomeService.createEntity(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(stringify(result));
    }

    @RequestMapping(value="/locationHierarchyLevel", method=RequestMethod.POST)
    public ResponseEntity<String> createLocationHierarchyLevel(@RequestBody LocationHierarchyLevelRequest request) {
        String result = locationHierarchyLevelService.createEntity(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(stringify(result));
    }

    @RequestMapping(value="/locationHierarchy", method=RequestMethod.POST)
    public ResponseEntity<String> createLocationHierarchy(@RequestBody LocationHierarchyRequest request) {
        String result = locationHierarchyService.createEntity(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(stringify(result));
    }

    @RequestMapping(value="/locationHierarchy", method=RequestMethod.GET)
    public ResponseEntity<List<LocationHierarchy>> getLocationHierarchies() {
        List<LocationHierarchy> result = locationHierarchyService.getAll();
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @RequestMapping(value="/projectCode", method=RequestMethod.POST)
    public ResponseEntity<String> createProjectCode(@RequestBody ProjectCodeRequest request) {
        String result = projectCodeService.createEntity(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(stringify(result));
    }

    @RequestMapping(value="/projectCode/{group}", method=RequestMethod.GET)
    public ResponseEntity<List<ProjectCode>> getProjectCodeByGroup(@PathVariable("group") String group) {
        final List<ProjectCode> projectCodes = projectCodeService.getByGroup(group);
        return ResponseEntity.status(HttpStatus.CREATED).body(projectCodes);
    }

    @RequestMapping(value="/login", method=RequestMethod.POST)
	public ResponseEntity<String> login(@RequestBody LoginAttempt loginAttempt) {
		try {
			String result = userService.login(loginAttempt.getUsername(), loginAttempt.getPassword(), loginAttempt.isSupervisor());
			return ResponseEntity.ok(stringify(result));
		} catch (RuntimeException e) {
            System.out.println(e);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}
	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}

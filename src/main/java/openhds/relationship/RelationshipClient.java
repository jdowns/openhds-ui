package openhds.relationship;

import feign.Headers;

@Headers("Content-Type: application/json")
public interface RelationshipClient extends openhds.RestClient<Relationship> {

}
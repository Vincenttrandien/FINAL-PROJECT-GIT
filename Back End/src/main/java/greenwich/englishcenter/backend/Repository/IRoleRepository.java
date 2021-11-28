package greenwich.englishcenter.backend.Repository;

import java.util.Optional;

import greenwich.englishcenter.backend.Entity.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import greenwich.englishcenter.backend.Entity.enumms.ERole;

public interface IRoleRepository extends MongoRepository<Role, String> {
  Optional<Role> findByName(ERole name);
}

package greenwich.englishcenter.backend.Repository;

import java.util.Optional;

import greenwich.englishcenter.backend.Entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface IUserRepository extends MongoRepository<User, String> {
  Optional<User> findByUsername(String username);

  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);
}

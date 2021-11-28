package greenwich.englishcenter.backend.Repository.impl;

import greenwich.englishcenter.backend.Entity.User;
import greenwich.englishcenter.backend.Form.response.PagingResponse;
import greenwich.englishcenter.backend.Repository.IUserInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class UserInformationRepositoryImpl implements IUserInformationRepository {

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public PagingResponse<User> findAllUser(int pageNumber, int pageSize, String year) {
        Query query = new Query(Criteria.where("year").is(year)).with(PageRequest.of(pageNumber - 1,pageSize));
        List<User> content = mongoTemplate.find(query, User.class);
        long totalElements = mongoTemplate.count(new Query(), User.class);
        return new PagingResponse<>(content,totalElements);
    }

    @Override
    public PagingResponse<User> searchByKey(int pageNumber, int pageSize, String year, String searchKey) {
        Criteria name = Criteria.where("username").regex(searchKey,"i");
        Criteria codeClass = Criteria.where("codeClass").regex(searchKey,"i");

        Criteria summary = new Criteria().orOperator(name , codeClass);

        Query pagingQuery = new Query(summary).with(PageRequest.of(pageNumber - 1, pageSize));
        Query countQuery = new Query(summary);

        List<User> content = mongoTemplate.find(countQuery, User.class);
        long totalElements = mongoTemplate.count(pagingQuery, User.class);

        return new PagingResponse<>(content,totalElements);
    }

    @Override
    public User findById(String id) {
        Query query = new Query().addCriteria(Criteria.where("_id").is(id));
        return mongoTemplate.findOne(query, User.class);
    }

    @Override
    public User edit(User user) {
        return mongoTemplate.save(user);
    }

    @Override
    public boolean delete(User user) {
        return mongoTemplate.remove(user).getDeletedCount() > 0;
    }

    @Override
    public User findByEmailOrUserName(String email, String username) {
        Criteria existEmail = Criteria.where("email").regex("^" + email + "$", "i");
        Criteria existUserName = Criteria.where("username").regex("^" + username + "$", "i");
        Criteria summary = new Criteria().orOperator(existEmail, existUserName);
        Query query = new Query(summary);
        return mongoTemplate.findOne(query, User.class);
    }

    @Override
    public User findByUserName(String username) {
        Query query = new Query().addCriteria(Criteria.where("username").regex("^" + username + "$", "i"));
        return mongoTemplate.findOne(query, User.class);
    }

    @Override
    public User findByClass(String codeClass){
        Query query = new Query().addCriteria(Criteria.where("codeClass").regex("^" + codeClass + "$", "i"));
        return mongoTemplate.findOne(query , User.class);

    }
}

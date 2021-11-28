package greenwich.englishcenter.backend.Repository.impl;

import greenwich.englishcenter.backend.Entity.ContactUsForm;
import greenwich.englishcenter.backend.Form.response.PagingResponse;
import greenwich.englishcenter.backend.Repository.IContactFormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.expression.spel.ast.QualifiedIdentifier;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ContactUsFormRepositoryImpl implements IContactFormRepository {

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public PagingResponse<ContactUsForm> findAllContact(int pageNumber, int pageSize, String year) {
        Query query = new Query(Criteria.where("year").is(year)).with(PageRequest.of(pageNumber-1,pageSize));
        List<ContactUsForm> content = mongoTemplate.find(query, ContactUsForm.class);
        long totalElements = mongoTemplate.count(new Query(), ContactUsForm.class);
        return new PagingResponse<>(content,totalElements);
    }

    @Override
    public PagingResponse<ContactUsForm> searchKey(int pageNumber, int pageSize, String year, String searchKey) {
        Criteria name = Criteria.where("name").regex(searchKey, "i");
        Criteria option = Criteria.where("options").regex(searchKey, "i");

        Criteria summary = new Criteria().orOperator(name , option);

        Query pagingQuery = new Query(summary).with(PageRequest.of(pageNumber - 1, pageSize));
        Query countQuery = new Query(summary);

        List<ContactUsForm> content = mongoTemplate.find(pagingQuery, ContactUsForm.class);
        long totalElements = mongoTemplate.count(countQuery, ContactUsForm.class);
        return new PagingResponse<>(content,totalElements);
    }

    @Override
    public ContactUsForm insert(ContactUsForm contactUsForm) {
        return mongoTemplate.insert(contactUsForm);
    }

    @Override
    public ContactUsForm findById(String id) {
        Query query = new Query().addCriteria(Criteria.where("_id").is(id));
        return mongoTemplate.findOne(query , ContactUsForm.class);
    }

    @Override
    public boolean delete(ContactUsForm contactUsForm) {
        return mongoTemplate.remove(contactUsForm).getDeletedCount() > 0;
    }
}
